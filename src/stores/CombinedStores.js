// CombinedStores.js
import { derived } from 'svelte/store';
import CustomerStores from './CustomerStores';
import ContainerStores from './ContainerStores';

const CombinedStores = derived(
    [CustomerStores, ContainerStores],
    ([$CustomerStores, $ContainerStores]) => {
        const combinedData = [];

        $CustomerStores.forEach(customer => {
            const containers = $ContainerStores.filter(
                container => container.customerId === customer.id
            );

            combinedData.push({
                customerId: customer.id,
                containers: containers.map(container => ({
                    containerId: container.containerId,
                    noUnits: container.noUnits,
                    description: container.description,
                    cost: container.cost,
                    paymentMethod: container.paymentMethod,
                    date: container.date
                }))
            });
        });

        return combinedData;
    }
);

export default CombinedStores;
