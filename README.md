
# eventmanamegent-gateway-api

## Description

Esta API Recepciona los eventos y los redirecciona a un topico kafka dependiendo el evento para su procesamiento

## Installation

```bash
# install
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

## Direccion de documentacion Swagger

/eventmanagement/resources/swagger.yaml

## variables Api

TOPIC_SERVER=127.0.0.1:9092

TOPIC_NAME_PREFIX=hn-eventmanager-

TOPIC_CLIENT_ID=event-manager-gateway

LIST_EVENTS_ENRICHCEMENT=event

TOPIC_NAME_ENRICH=hn-eventmanager-enrichement

## variables de kafka Logs

MODULE_LOGGING_APPLICATION_ENABLE=true

MODULE_LOGGING_APPLICATION_LEVEL=debug

MODULE_LOGGING_APPLICATION_LOGLEVEL=CONSOLE,EVENT

MODULE_LOGGING_APPLICATION_KAFKA_CLIENTID=logger

MODULE_LOGGING_APPLICATION_KAFKA_SERVER=127.0.0.1:9092

MODULE_LOGGING_APPLICATION_KAFKA_TOPIC=logger
