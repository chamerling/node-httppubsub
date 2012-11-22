# node-httppubsub

This is a simple JSON HTTP PubSub engine running on express.js. One can publish/subscribe to a REST resource and send/receive notifications.
The runtime uses backend to persist subscriptions. Currently supported backends are redis, mongodb and some in-memory stuff.

## Examples

Check the *examples* folder for node examples or use your favorite HTTP Client to send the following messages to the PubSub engine:

### Publish

- POST your JSON message (no schema restrcition, post anything but JSON) to the resource of your choice at http://host:port/notify/resourceId

### Subscribe

- POST a subscribe message to the resource you want to subscribe at http://host:port/subscribe with the following JSON payload:

```
{
  resource : "resourceId"
  subscriber : "http://whereyouwanttoreceivenotifications"
}
```

## Running

You can embed the pubsub stuff in your code, of use the pubsubserver binary:

```
./pubsubserver -c config.json
```

**Note** : If not config file is given, default in memory store will be used.

## Configuration

Check config.json for fresh updates on how to configure the server

```
{
  "port" : 3000,
  "prefix" : "",
  "backend" : {
    "type" : "redis",
    "host" : "localhost",
    "port" : 6379
  },
  "debug" : true
}
```

## Coming next

- Auth
- Subscriptions IDs
- Pubsubhubub support
- System ENV for some configuration tuning
- ...

## License 

(The MIT License)

Copyright (c) 2012 Christophe Hamerling &lt;christophe.hamerling@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
