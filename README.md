
# Simple Dungeon Master
this is a script in node.js which implements and bundles the [mixpanel node.js  library](https://github.com/mixpanel/mixpanel-node) in order to easily send customized event data to any mixpanel project.

# usage

 1. clone the repo.  
 2. customize the `config` object in `index.js`  
 3. run as:
```
node index.js
```
4. see data in mixpanel
5. find a local copy of the data (`data.json`) in the same directory as the script


# customizing the data

at the heart of this script is the config object, which you can customize to suit the data you need:

```const config = {
    token: "{{PROJECT TOKEN}}",
    secret: "{{PROJECT SECRET}}",
    lengthInDays: 100,
    numberOfEvents: 10,
    numberOfUsers: 1,
    eventNames: [],
    eventProperties: { ... },
    userProperties: { ... }
```
a couple of parameters are **required**:
|param|dfn |
|--|--|
|`token`  | your mixpanel project token |
|`secret`  | the API secret for that same project |
| `lengthInDays` | max number of days in the past |
| `numberOfEvents` | how many events to send |
| `numberOfUsers` | how many users to simulate |
| `eventNames` | a list of possible event names to choose |

note that you can also pass in your token/secret as command line params:
```
node index.js project_token project_secret
```
# props
the most interesting part of this script are the `properties` objects:
```
eventProperties: {...},
userProperties: {...}
```
they are not required, but they allow for more unique recipes.

these `properties` objects will accept keys with a value of an array `[]` or function `()=>{}`

if the value is an array `[]`, each event will have a property with the same key name and a random value:

```
 eventProperties: {       
//one of these values will be chosen at random for each event
        currency: ["BTC", "ETH", "LTC", "XMR", "EOS"], 
}
```

similarly: 
 ```
 userProperties: {       
//one of these values will be chosen at random for each user profile
        favorite philosopher: ["Plato", "Hume", "Nietzsche", "Socrates"], 
}
```

if the value is a function `()=>{}` , the script will call that function as it generates each event. *that* function's `return` value will be placed on each event:

```
 eventProperties: {       
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

function references placed in either `properties` object makes it possible to create more complex, nested property structures for event data. see `makeProducts`  for an example in the code.

# But... Why?
because sometimes you just need fake events in mixpanel, quickly
