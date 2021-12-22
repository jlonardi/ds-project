# Distrubuted System Course Project

## Development

The following are the instrocution to make the run the appication on your local machine.

Prequisite is that you have docker and docker-compose installed on your system

For a quick start simply run

```
sh scripts/setup-project.sh
```

By default this will start 3 instance replicas from each service so in total 12 server should be going up.

1 Gateway
2 Load balancers
9 Service servers
3 Databases

### Database

To start the databases run

```
sh scripts/start-db.sh
```

After the databses are up you need to run the migrations with

```
sh scripts/run-migrations.sh
```

### Application

To run all the applications in watch-mode for development

```
sh scripts/watch-services.sh
```

and go to http://localhost:3000
