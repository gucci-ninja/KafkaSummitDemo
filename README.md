# KafkaSummitDemo

This is a demo for blockchain and kafka. I've created a simple application to add patents to the blockchain. There is a UI folder (`patentrail-fe`) and 2 backend folders, one using kafka and one without. The UI can be used for either since they both have the same interfacing API endpoints.

# What you will need
0. yarn
1. truffle
2. ganache
3. docker-compose

# Get started
1. Start up local blockchain by running ganache either through the UI or CLI
2. Go into `patentrail-be` and run `truffle compile && truffle migrate`
3. Go into the frontend folder and run `yarn install` and then `yarn start`
4. Depeding on which backend you want to use, do either of the following.
- To use the non-kafka backend, go into `patentrail-be` and run `yarn start`
- To use the kafka backend, make sure the other backend is not running. Go into the `kafka-blockchain-be` folder and run `docker-compose up` in one terminal. Then run `yarn start` in another terminal



