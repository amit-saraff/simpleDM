# Simple Dungeon Master
this is a script in node.js which implements and bundles the [mixpanel node.js  library](https://github.com/mixpanel/mixpanel-node) in order to easily send customized event data to any mixpanel project.

# usage

clone the repo. 
customize the data in `index.js` 
run as:
```
node index.js
```
see the data in mixpanel
there's a local copy of the data (`data.json`) in the same directory.


# customizing the data

at the heart of this script is the config object, which you can customize to suit the data you need:

```const config = {
    token: "{{PROJECT TOKEN}}",
    secret: "{{PROJECT SECRET}}",
    lengthInDays: 100,
    numberOfEvents: 10,
    numberOfUsers: 1,
    eventNames: [],
    properties: { ... }
```
a couple of parameters are required here:
|param|dfn |
|--|--|
|`token`  | your mixpanel project token |
|`secret`  | the API secret for that same project |
| `lengthInDays` | max number of days in the past |
| `numberOfEvents` | how many events to send |
| `numberOfUsers` | how many users to simulate |
| `eventNames` | a list of possible event names to choose |

most interesting is the `properties` object; it is not required but allows for more unique recipies.

the `properties` object will accept keys with a value of an array `[]` or function `()=>{}`

if the value is an array `[]`, each event will have a property with the same key name and a random value:

```
 properties: {       
//one of these values will be chosen at random for each event
        currency: ["BTC", "ETH", "LTC", "XMR", "EOS"], 
}
```

if the value is a function `()=>{}` , the script will call that function as it generates each event. *that* function's `return` value will be placed on each event:

```
 properties: {       
//a random uuid will be creatred for each event
        randomId: uuid, 
}

//function to make a uuid
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
```

function references placed in the `properties` object makes it possible to create more complex, nested property structures for event data. see `makeProducts`  for an example in the code.

# But... Why?
because sometimes you just need fake events in mixpanel, quickly
