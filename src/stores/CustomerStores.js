import { writable } from "svelte/store";

const CustomerStores = writable([
    {
        "company-name":"Google",
        "person-inchanrge":"Alex",
        "email":"alex@google.com",
        "phone-no":"1234567890",
        "Address":{
            "line1": "776 Dennison Street",
            "line2": " French Camp",
            "city" : "San Diego",
            "state" : "california",
            "zip-code": "95231",
            "country" : "United States"
        }
    },
]);

export default CustomerStores;