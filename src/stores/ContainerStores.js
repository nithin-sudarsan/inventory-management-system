import { writable } from "svelte/store";

const ContainerStores = writable([
    {
        "customerId":"GOO9961234",
        "containerId":"CNTID0001",
        "noUnits":"5",
        "description":"Export Goods",
        "cost":"100",
        "paymentMethod":"creditCard",
        "date":"18-10-2023"
    },
    {
        "customerId":"GOO9961234",
        "containerId":"CNTID0002",
        "noUnits":"10",
        "description":"New Export",
        "cost":"200",
        "paymentMethod":"debitCard",
        "date":"18-10-2023"
    }
]);

export default ContainerStores;

// import { writable } from "svelte/store";

// const CombinedStores = writable([
//     {
//         "customerId":"GOO9961234",
//         "containers":[
//             {
//                 "containerId":"CNTID0001",
//                 "noUnits":"5",
//                 "description":"Export Goods",
//                 "cost":"100",
//                 "paymentMethod":"creditCard",
//                 "date":"18-10-2023"
//             },
//             {
//                 "containerId":"CNTID0002",
//                 "noUnits":"10",
//                 "description":"New Export",
//                 "cost":"200",
//                 "paymentMethod":"debitCard",
//                 "date":"18-10-2023"
//             }
//         ],
//     },
// ]);

// export default CombinedStores;