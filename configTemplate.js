//MAKE A COPY OF THIS!
const config = {
    // token & secret; you can pass these as command line params too.
    token: "{{PROJECT TOKEN}}",
    secret: "{{PROJECT SECRET}}",
    seed: "hey there!",          //seed the randomness engine to get reproducible results
    
    verbose: false, 			//log lots of messages to the console (SLOW)
    lengthInDays: 7, 			//how many days worth of data
    numberOfEvents: 50000, 		//how many events
    numberOfUsers: 100, 		//how many users
    saveCopyOfData: false, 		//save a local copy of eventData?
    maxConcurrent: 25,         //make this smaller (like 5) if you're on a slow network connection
    
    //events will be chosen at random
    eventNames: [],
    
    eventProperties: {
        /*         
        each key is a property name; the "value" is an array of possible property values
        when run, the script will choose random values for each property
        you can also use [].range as shown below
        you can also reference functions which return custom values
        */
        foo: ['bar', 'baz', 'qux']
    },
    userProperties: {
        /*
		user properties work the same as event properties
		each key should be an array or function reference
    	*/
        randomNumber: [].range(1, 1000)        
    },

    /*
	for group analytics keys, we need an array of arrays [[],[],[]] 
	each pair represents a group_key and the number of profiles for that key
    */
    groupKeys: [
        ['company_id', 100],        
    ],
    groupProperties: {
        company_id: {
            $name: ['company FOO', 'company BAR', 'company BAZ', 'company QUX', 'company DUX'],
            "# of employees": [].range(3, 10000)
        }
    }
}


module.exports = config;