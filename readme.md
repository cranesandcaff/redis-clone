This is a demo implementation of redis. It uses Vantage to create a CLI app that accepts multiple connection.

`npm install`

`npm install -g vantage`

`node index.js`

In new terminal:

`vantage 6379`


----

Instructions were to implement a subset of Redis commands.

- GET
- SET
- GETSET
- HGET
- HGETALL
- ZADD
- ZRANGE
- ZCARD
- ZRANK

It needs to support multiple connections.

It needs to allow connections and commands to be sent over telnet.

This requires using the Vantage npm packagebut otherwise meets the requirements.
