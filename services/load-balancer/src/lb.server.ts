import express, { Response, Request, NextFunction } from 'express';
import { logger } from '../../common/utils/logger';
import axios, { Method } from 'axios';
import { IAppError } from '../../types/errors';
import { NotFoundError } from '../../common/errors/not-found-error';

const SERVICE_NODE_URLS = JSON.parse(process.env.SERVICE_NODE_URLS || '[]');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Application servers

interface ServerState {
  url: string;
  state: 'healthy' | 'unhealthy';
}

const loadServerInfo = (): ServerState[] => {
  return SERVICE_NODE_URLS.map((url: string) => ({ url, state: 'unhealthy' }));
};

let servers = loadServerInfo();

console.log('Servers: ', servers);

const port = process.env.PORT || 8080;

// Track the current application server to send request
let current = 0;

const findNextHealthyServer = () => {
  current === servers.length - 1 ? (current = 0) : current++;
  // Select the current server to forward the request
  let server = servers[current];

  // check that at least one healthy server exists
  const atleastOneHealthy = servers.reduce((prev: boolean, current) => {
    return prev || current.state === 'healthy';
  }, false);

  // if current server is unhealthy find next healthy server
  while (atleastOneHealthy && servers[current].state === 'unhealthy') {
    console.log(`Server ${server.url} unhealthy - skipping to next server`);
    current === servers.length - 1 ? (current = 0) : current++;
    // skip to next server and try again
    server = servers[current];
  }

  return server;
};

// Receive new request
// Forward to application server
const handler = async (req: Request, res: Response) => {
  // Destructure following properties from request object
  const { method, url, headers, body } = req;

  // Select erver to forward the request
  const server = findNextHealthyServer();
  console.log(`Redirecting request "${method}: ${server.url}${url}"`);

  try {
    // Requesting to underlying application server
    const response = await axios.request({
      method: method as Method,
      url: `${server.url}${url}`,
      headers: {
        'content-type': headers['content-type'] as string
      },
      data: body
    });

    // Send back the response data
    // from application server to client
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

setInterval(async () => {
  const responses = servers.map(async server => {
    try {
      await axios.get(`${server.url}/healthcheck`);
      server.state = 'healthy';
    } catch (err) {
      server.state = 'unhealthy';
    }
  });
  await Promise.all(responses);
  console.log(servers);
}, 5000);

app.get('/reload', (_req, res) => {
  servers = loadServerInfo();
  res.sendStatus(200);
});

app.get('/favicon.ico', (_req, res) => res.status(204));

// When receive new request
// Pass it to handler method
app.use((req, res) => {
  handler(req, res);
});

// Listen on PORT
app.listen(port, () => logger.info(`Load balancer listening on port ${port}!`));

// Catch 404 and forward to error handler
app.use((req, _res, next) => {
  const err = new NotFoundError(`Not Found: ${req.url}`);
  next(err);
});

// Error handlers
app.use((err: IAppError, _req: any, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  logger.error(err.message);

  if (err.status === 404) {
    res.sendStatus(404);
    return;
  }

  res.status(err.status || 500);
});
