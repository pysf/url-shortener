# Refactored-Happiness

With Refactored-Happiness, urls are guaranteed to be unique.

## Technical Details

-   Redis is used to store ShortURLs, LongURLs, and VisitCounts.
-   The global counter is kept by Etcd. In order to get the last counter value, different services query and modify the counter atomically and each short-url has a unique id created by incrementing the counter.
-   This service's business logic for creating IDs and short URLs has unit tests.

## Cammands

To install dependencies run:

```sh
make setup
```

To execute tests run:

```sh
make tests
```

To start the service run:

```sh
make up
```

To stop the service run:

```sh
make stop
```

To stop the service and remove dockers run:

```sh
make down
```

## API Docs

API documentations are availble online:
https://documenter.getpostman.com/view/14834296/VUqpsHR7
