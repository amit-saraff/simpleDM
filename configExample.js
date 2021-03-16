/*
    example of an external configuration file
    this is useful for "saving you work" without polluting the original script

    to use an external config file for defining data, run the process as:
        node index.js yourConfigFile.js

    you may also pass keys and secrets as params to avoid writing them in this file:
        node index.js youConfigFile.js mixpanelToken mixpanelSecret

    happy dungeoneering!

*/
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
        cart_id: uuid
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
        ['company_id', 100],
        ['document_id', 100],
        ['conversation_id', 100]
    ],
    groupProperties: {
        /*
    	group profile properties work the same way as userProps and eventProps
		make sure the keys in this object match the groupKeys specified above
    	*/
        company_id: {
            $name: ['company FOO', 'company BAR', 'company BAZ', 'company QUX', 'company DUX'],
            "# of employees": [].range(3, 10000)
        },

        document_id: {
            $name: ['document FOO', 'document BAR', 'document BAZ', 'document QUX', 'document DUX'],
            "# of collaborators": [].range(1, 50)
        },

        conversation_id: {
            $name: ['conversation FOO', 'conversation BAR', 'conversation BAZ', 'conversation QUX', 'conversation DUX'],
            "# of messages": [].range(300, 500000)
        }
    }
}

/* example of using function to generate event props
makeProducts() returns an array of nested objects of random size [{},{},{}]
it gets called each time an event is created for the fake dataset
you can delete this method; it's used for 'cart' in the example config
*/
function makeProducts() {
    let categories = ["Device Accessories", "eBooks", "Automotive & Powersports", "Baby Products (excluding apparel)", "Beauty", "Books", "Camera & Photo", "Cell Phones & Accessories", "Collectible Coins", "Consumer Electronics", "Entertainment Collectibles", "Fine Art", "Grocery & Gourmet Food", "Health & Personal Care", "Home & Garden", "Independent Design", "Industrial & Scientific", "Accessories", "Major Appliances", "Music", "Musical Instruments", "Office Products", "Outdoors", "Personal Computers", "Pet Supplies", "Software", "Sports", "Sports Collectibles", "Tools & Home Improvement", "Toys & Games", "Video, DVD & Blu-ray", "Video Games", "Watches"]
    let slugs = ['/sale/', '/featured/', '/home/', '/search/', '/wishlist/', '/']
    let assetExtention = ['.png', '.jpg', '.jpeg', '.heic', '.mp4', '.mov', '.avi']
    let data = []
    let numOfItems = randomNum(1, 12);

    for (var i = 0; i < numOfItems; i++) {

        let category = categories.pickOne()
        let slug = slugs.pickOne()
        let asset = assetExtention.pickOne()
        let product_id = uuid()
        let price = randomNum(1, 300)
        let quantity = randomNum(1, 5)

        let item = {
            product_id: product_id,
            sku: randomNum(11111, 99999),
            price: price,
            quantity: quantity,
            value: price * quantity,
            featured: [true, false].pickOne(),
            released: 1613875656128,
            category: category,
            urlSlug: slug + category,
            asset: `${category}-${randomNum(1,20)}${asset}`
        }

        data.push(item)
    }

    return data
}


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//don't touch this
module.exports = config;