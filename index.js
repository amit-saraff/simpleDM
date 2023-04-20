/*
make fake mixpanel data easily!
with no dependencies!
by AK 
ak@mixpanel.com
*/

/* beautify ignore:start */

//the mixpanel node.js sdk; bundled in ONE line
const constants = require('./constants');
const Chance = constants.requireChance('Chance');

//other dependencies 
const util = require('util');
const fs = require('fs');
const path = require('path')
const args = process.argv.slice(2);
const readline = require('readline');

//give every Array a range() and random() method
Array.prototype.range = rangeArray
Array.prototype.pickOne = randomArray
/* beautify ignore:end */

console.log(`Simulation Started\n`)

//if the user specifics an separate config file
//TODO support dragged in paths
const suppliedConfig = args[0];
let externalConfig = null
if (suppliedConfig) {
    console.log(`using ${suppliedConfig} for data\n`)
    externalConfig = require(path.resolve(suppliedConfig));
    externalConfig.token = Boolean(args[1]) ? args[1] : externalConfig.token;
    externalConfig.secret = Boolean(args[2]) ? args[2] : externalConfig.secret;
} else {
    console.log(`using index.js for config`)
}


/*

config
THIS IS WHAT YOU EDIT
note, you can ALSO write this configuration in another file and run as:
	
	node index.js myConfigFile.js

see configExample.js for... an example :)

*/
const config = {
    // token & secret; you can pass these as command line params too.
    token: "4c7174372e1c0fba43e49a9a1227be9e",
    secret: "5ba9232313bbc3ba148d1a5894b9d290",
    seed: "foo bar baz fum 3",
    verbose: false, //log lots of messages to the console (SLOW)
    lengthInDays: 1, //how many days worth of data
    numberOfEvents: 50000, //how many events
    numberOfUsers: 1, //how many users
    saveCopyOfData: false, //save a local copy of eventData?
    maxConcurrent: 25,         //make this smaller (like 5) if you're on a slow network connection

    //events will be chosen at random
    eventNames: ["checkout", "add to cart", "view item", "add to favorites"],

    eventProperties: {
        /*         
        each key is a property name; the "value" is an array of possible property values
        when run, the script will choose random values for each property
        you can also use [].range as shown below
        you can also reference functions which return custom values
        */
        affiliate: ["Amazon", "Target", "Wayfair", "Alibaba", "eBay", "Flipkart", "Walmart", "BestBuy", "Costco", "Target"],
        coupon: [false, "couponFoo", false, "couponBar", false, "couponBaz", false, "couponQux", false, "couponMux"],
        currency: ["USD", "CAD", "EUR", "BTC", "ETH", "JPY"],
        isFeaturedItem: [true, false],
        value: [].range(2, 1000),
        revenue: [].range(5, 500),
        cart_id: [].range(1, 999999)
    },
    userProperties: {
        /*
		user properties work the same as event properties
		each key should be an array or function reference
    	*/
        foo: ["foo A", "foo B", "foo C", "foo D", "foo E"],
        bar: ["bar A", "bar B", "bar C", "bar D", "bar E"],
        baz: ["baz A", "baz B", "baz C", "baz D", "baz E"],
        qux: [].range(1, 1000),
    },

    /*
	for group analytics keys, we need an array of arrays [[],[],[]] 
	each pair represents a group_key and the number of profiles for that key
    */
    groupKeys: [
        // ['company_id', 1000],
        // ['document_id', 1000],
        // ['conversation_id', 1000]
    ],
    groupProperties: {
        /*
    	group profile properties work the same way as userProps and eventProps
		make sure the keys in this object match the groupKeys specified above
    	*/
        // company_id: {
        //     $name: ['company FOO', 'company BAR', 'company BAZ', 'company QUX', 'company DUX'],
        //     "# of employees": [].range(3, 10000)
        // },

        // document_id: {
        //     $name: ['document FOO', 'document BAR', 'document BAZ', 'document QUX', 'document DUX'],
        //     "# of collaborators": [].range(1, 50)
        // },

        // conversation_id: {
        //     $name: ['conversation FOO', 'conversation BAR', 'conversation BAZ', 'conversation QUX', 'conversation DUX'],
        //     "# of messages": [].range(300, 500000)
        // }
    }
}



//built-in helpers
//don't touch these
const dayInMs = 8.64e+7;

function rangeArray(a, b, step = 1) {
    step = !step ? 1 : step;
    b = b / step;
    for (var i = a; i <= b; i++) {
        this.push(i * step);
    }
    return this;
};

function randomArray() {
    let choice = chance.pickone(this);
    return choice
}


function fakeIp() {
    var ip = chance.ip();
    return ip
}

function randomNum(min, max) {
    return chance.integer({
        min: min,
        max: max
    });
}

function makeEvent(eventNames, currentUser, earliestTime, latestTime, customProps, groupKeys) {
    let event = {
        event: eventNames.pickOne(),
        properties: {
            distinct_id: currentUser,
            time: randomNum(earliestTime, latestTime,),
            ip: fakeIp(),
            "$source": "simpleDM (by AK)"
        }
    }

    //iterate through custom properties
    for (const key in customProps) {
        let choice;
        if (Array.isArray(customProps[key])) {
            choice = customProps[key].pickOne()

        } else if (typeof(customProps[key]) === "function") {
            choice = customProps[key]()

        } else {
            throw new Error(`your config contains a key:\n${key}\nwhich is not an array [] or function`)
        }


        event.properties[key] = choice
    }

    //iterate through groups
    for (const groupPair of groupKeys) {
        let groupKey = groupPair[0];
        let totalProfiles = groupPair[1];
        event.properties[groupKey] = [].range(1, totalProfiles).pickOne()
    }

    //console.log(event)

    return event
}

function makeUserProfileProps(userProps) {
    let month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].pickOne();
    let day = randomNum(1, 31);
    let year = randomNum(2018, 2020)
    let gender = ['men', 'women'].pickOne();
    let first = chance.first({
        gender: gender === "men" ? "male" : "female"
    });
    let last = chance.last();
    let domain = ['gmail', 'yahoo', 'hotmail', 'aol'].pickOne();

    //build the spec
    let profileProps = {
        $first_name: first,
        $last_name: last,
        $email: `${first}.${last}@${domain}.com`,
        $avatar: `https://randomuser.me/api/portraits/${gender}/${randomNum(1,99)}.jpg`,
        $created: (new Date(`${month} ${day} ${year}`)).toISOString(),
        gender: gender === "men" ? "man" : "woman"
    };

    for (const key in userProps) {
        let choice;
        if (Array.isArray(userProps[key])) {
            choice = userProps[key].pickOne()

        } else if (typeof(userProps[key]) === "function") {
            choice = userProps[key]()

        } else {
            throw new Error(`your config contains a key:\n${key}\nwhich is not an array [] or function`)
        }


        profileProps[key] = choice
    }

    return profileProps;
}

function makeGroupProfileProps(groupProps) {
    let groupProfile = {}

    for (const key in groupProps) {
        let choice;
        if (Array.isArray(groupProps[key])) {
            choice = groupProps[key].pickOne()

        } else if (typeof(groupProps[key]) === "function") {
            choice = groupProps[key]()

        } else {
            throw new Error(`your config contains a key:\n${key}\nwhich is not an array [] or function`)
        }


        groupProfile[key] = choice
    }

    return groupProfile
}



function showProgress(id) {
    //readline.clearLine(process.stdout);
    // readline.cursorTo(process.stdout, 0);
    // process.stdout.write(`${thing} processed ... ${p}`);
    console.log(`User ${id} created`)
}


//our main program
async function main(config) {
    const mixpanel = constants.MixpanelLib.init(config.token, {
        secret: config.secret
    });

    mixpanel.set_config({
        debug: config.verbose
    });

    let {
        seed
    } = config;

    if (!seed) {
        seed = `foo bar baz`
    }

    const chance = new Chance(seed);
    const userIdChance = new Chance(seed);
    global.chance = chance;
    
    //the function which generates $distinct_id
    function uuid() {
        return userIdChance.guid();
    }

    let maxConcurrentRequets = config.maxConcurrent || 5;

    //promisfying people.set()
    function peoplePropPromise(uuid, props, config = null) {
        return new Promise(function(resolve, reject) {
            mixpanel.people.set(uuid, props, config, resolve)
        })
    }

    //promisfying groups.set()
    function groupPropPromise(groupKey, groupValue, props, config = null) {
        return new Promise(function(resolve, reject) {
            mixpanel.groups.set(groupKey, groupValue, props, config, resolve)
        })
    }

    let {
        lengthInDays,
        numberOfEvents,
        numberOfUsers,
        eventNames,
        eventProperties,
        userProperties,
        groupKeys,
        groupProperties
    } = config

    //make sure we have more events than users
    if (numberOfUsers > numberOfEvents) {
        throw new Error(`you specified ${numberOfEvents} over ${numberOfUsers}...\nthis is impossible; please make sure numberOfEvents is greater than numberOfUsers`)
    }

    let finalEventsData = []

    let eventsPerUser = Math.floor(numberOfEvents / numberOfUsers);
    // let earliestTime = now - (lengthInDays * dayInMs);
    let startOfToday = new Date(new Date().setHours(0, 0, 0, 0))
    let earliestTime = startOfToday.valueOf()
    let latestTime = Date.now()
    console.log(`Building ${numberOfUsers} unique user profiles\n`)

    for (let i = 1; i < numberOfUsers + 1; i++) {
        let currentUser = uuid();
        let userProps = makeUserProfileProps(userProperties);
        showProgress(currentUser)

        try {

            // mixpanel.people.set(currentUser, userProps, {
            //     $ignore_time: true,
            //     $ip: fakeIp()
            // })

            await peoplePropPromise(currentUser, userProps, {
                $ignore_time: true,
                $ip: fakeIp()
            })
        } catch (e) {
            console.log('profiles fail!\n')
            console.log(e)
        }

        for (let j = 0; j < eventsPerUser; j++) {
            finalEventsData.push(makeEvent(eventNames, currentUser, earliestTime, latestTime, eventProperties, groupKeys));
        }
    }

    console.log('\n')

    //GROUP PROFILES

    /* beautify ignore:start */
    let totalNumberGroups = groupKeys.reduce((acc, current) => { return acc += current[1]}, 0)
    /* beautify ignore:end */
    if (groupKeys.length > 0) {
        console.log(`Building ${groupKeys.length} groups for ${totalNumberGroups} profiles\n`)

        //for each group key
        for (let group of groupKeys) {
            let groupKey = group[0]
            let numOfProfiles = group[1]
                //for each profile
            for (let i = 1; i < numOfProfiles + 1; i++) {

                try {
                    let groupProfile = makeGroupProfileProps(groupProperties[groupKey])

                    // mixpanel.groups.set(groupKey, i, groupProfile, {
                    //     $ignore_time: true
                    // })

                    await groupPropPromise(groupKey, i, groupProfile, {
                        $ignore_time: true
                    })

                } catch (e) {
                    console.log('groups fail!\n')
                    console.log(e)
                }
            }
        }
    }

    //prefer promise method
    //mixpanel.import_batch(finalEventsData) 
    const importerEvents = util.promisify(mixpanel.import_batch);
    mixpanel.set_config({ debug: true });
    importerEvents(finalEventsData, {max_concurrent_requests: maxConcurrentRequets}).then(() => {
        console.log('\nevent data set!\n')
    }).then(() => {
        if (config.saveCopyOfData) {
            console.log('\nwriting a copy of the data to file: eventData.json\n')
            fs.writeFile('eventData.json', JSON.stringify(finalEventsData, null, 2), function(err) {
                if (err) return console.log(err);

            })
        }

    }).then(() => {
        console.log('\nall data sent\nNOTE: it may take up to 10 minutes for the data to appear in mixpanel\n\n')
    })

    return finalEventsData

}

//that's all folks :)
main(externalConfig || config)