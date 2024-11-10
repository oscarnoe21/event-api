
# eventmanamegent-catcher-api

## Description

Esta API Recepciona los eventos que ingresan al Event Manamegent y los Redirecciona a su cola destiono o cola de enriquecimiento.

## Informacion Tecnica
|  Dato |Valor   |
| ------------ | ------------ |
|Path  |/eventmanagement/v1/api/event/notify/{consumer}   |
|Http Method   |POST   |
| **KONG Path**|/eventmanagement/v1/api/event/notify/{consumer}|
| ***Notas***|consumer es un path param|




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

TOPIC_SERVER=kf-cluster-kafka-bootstrap.msg-prod.svc.cluster.local:9092

TOPIC_NAME_PREFIX=hn-eventmanager-

TOPIC_CLIENT_ID=event-manager-catcher

LIST_EVENTS_ENRICHCEMENT=activation,deactive,venta,CHANGE_SIMCARD,AUTOMATIC_PAYMENT,CHANGE_STATUS

TOPIC_NAME_ENRICH=hn-eventmanager-enrichement

## variables de kafka Logs

MODULE_LOGGING_APPLICATION_ENABLE=true

MODULE_LOGGING_APPLICATION_LEVEL=debug

MODULE_LOGGING_APPLICATION_LOGLEVEL=CONSOLE,EVENT

MODULE_LOGGING_APPLICATION_KAFKA_CLIENTID=logger

MODULE_LOGGING_APPLICATION_KAFKA_SERVER=kf-cluster-kafka-bootstrap.msg-prod.svc.cluster.local:9092

MODULE_LOGGING_APPLICATION_KAFKA_TOPIC=logger
