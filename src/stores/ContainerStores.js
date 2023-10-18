import { writable } from "svelte/store";

const ContainerStores = writable([
    {
        "customerId":"GOO9961234",
        "containerId":"CNTID0001",
        "noUnits":"5",
        "description":"Export Goods",
        "cost":"100",
        "paymentMethod":"Credit card",
        "date":"18-10-2023"
    },
]);

export default ContainerStores;