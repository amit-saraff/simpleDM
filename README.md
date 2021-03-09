

# Simple Dungeon Master
this is a script in node.js which implements and bundles the [mixpanel node.js  library](https://github.com/mixpanel/mixpanel-node) in order to easily send customized event data to any mixpanel project.

therefore, you must have [node.js](https://nodejs.org/en/download/) installed on your computer to use this script

# usage

 1. clone the repo.
```
git clone https://github.com/ak--47/simpleDM.git
```  
 2. customize the `config` object in `index.js`  (or use an **[external configuration file](#external-configuration-file)** 👍)
 3. run as:
```
node index.js
```
or
```
node index.js myConfigFile.js
```

4. see data in mixpanel 🙌


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
most parameters are **required**:
|param|dfn |
|--|--|
|`token`  | your mixpanel project token |
|`secret`  | the API secret for that same project |
| `lengthInDays` | max number of days in the past |
| `numberOfEvents` | how many events to send |
| `numberOfUsers` | how many users to simulate |
| `eventNames` | a list of possible event names to choose |
| `eventProperties` | event properties for each event (see [props](#props) below) |
| `userProperties` | user properties for each user (see [props](#props) below) |
| `groupKeys` | keys to use for [group analytics](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics) (see [group profiles](#group-profiles) below) |
| `groupProperties` | profile properties to use for group profiles (see [group profiles](#group-profiles) below) |


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

function references placed in either `properties` object makes it possible to create more complex, nested property structures for event data. 

see [`makeProducts()`](https://github.com/ak--47/simpleDM/blob/main/configExample.js#L85-L123)  for an example in code.

# group profiles
this script can also generate groups + group profiles with little effort. in order for this to work properly, you must first **[create group keys](https://help.mixpanel.com/hc/en-us/articles/360025333632-Group-Analytics#implementation)** in your mixpanel project.

the `groupKeys` config option accepts an array of arrays `[[],[],[]]
` where each child `[]` pair represents a `groupKey` and a number of profiles to create for that group:

```
    groupKeys: [
        ['company_id', 500],
        ['document_id', 3000],
        ['conversation_id', 5000]
    ],
```

would match:

![enter image description here](https://aktunes.neocities.org/screenshots/groupKeys.png)

in the mixpanel UI.

to turn group analytics off, just make `groupKeys` and empty array
```
groupKeys: []
```

group profile properties work similarly to `eventProperties` and `userProperties` and expect arrays `[]` or function reference. Note that the `groupProperties` object should contain keys which match the `groupKeys` defined above:

```
 groupProperties: {
        company_id: {
            $name: ['company FOO', 'company BAR', 'company BAZ'],
            "# of employees": [].range(3, 10000)
        },
        document_id: {
            $name: ['document FOO', 'document BAR', 'document BAZ'],
            "# of collaborators": [].range(1, 50)
        },
        conversation_id: {
            $name: ['conversation FOO', 'conversation BAR', 'conversation BAZ'],
            "# of messages": [].range(300, 500000)
        }
    }
```
# external configuration file
while working within a single file (`index.js`) might be easier for some, it doesn't make it easy to *save* your work and you end up looking at a bunch of code you don't need to worry about.

since using simpleDM is mostly about customizing your own event/property/group definitions, it can be much easier to store your configuration in a separate file. this is supported, provided you pass that configuration file to the node process when you run the script. you can read more about this implementation in `configExample.js` but here's the **tldr;**

given a file `myDungeon.js` that looks like this:

```
const config = {   
    token: "{{PROJECT TOKEN}}",
    secret: "{{PROJECT SECRET}}",    
    verbose: false,             
    lengthInDays: 7,            
    numberOfEvents: 50000,      
    numberOfUsers: 100,         
    saveCopyOfData: false,              
    eventNames: [ ... ],    
    eventProperties: { ... },
    userProperties: { ... },        
    groupKeys: [ ... ],            
    groupProperties: { ... }
}

//important! this file should export it's data!
module.exports = config;
```
you can tell simpleDM to use this configuration for the data like:

```
node index.js myDungeon.js
```

you can also pass in keys and secrets when using an external config like this:

```
node index.js myDungeon.js mixpanelProjectToken mixpanelProjectSecret
```

where `mixpanelProjectToken` and `mixpanelProjectSecret` are [specific to particular mixpanel project](https://help.mixpanel.com/hc/en-us/articles/115004490503-Project-Settings#project-token)

# but... why?
because sometimes you just need fake events in mixpanel, quickly
