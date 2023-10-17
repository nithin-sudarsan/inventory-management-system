import { writable } from "svelte/store";

const CustomerStores = writable([
    {
        "id":"GOO9961234",
        "companyName":"Google",
        "personIncharge":"alex",
        "email":"nithinsudarsan740@gmail.com",
        "phoneNo":"1234567890",
        "address":{
            "line1": "Maurishka Park, Kodialbail",
            "line2": "PVS",
            "city" : "Mangalore",
            "state" : "karnataka",
            "zipCode": "95231",
            "country" : "India"
        }
    },
]);

export default CustomerStores;