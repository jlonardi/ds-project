# Distrubuted System Course Project

## Development

The following are the instrocution to make the run the appication on your local machine.

Prequisite is that you have docker and docker-compose installed on your system

### Database

To start the databases run

```
sh scripts/start-db.sh
```

After the databses are up you need to run the migrations with

```
sh scripts/migrate.sh
```

### Application

To run all the applications in watch-mode for development

```
sh scripts/watch-services.sh
```

and go to http://localhost:3000
