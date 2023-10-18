<script>
    import CustomerStores from "../stores/CustomerStores";
    import ContainerStores from "../stores/ContainerStores";
    import CombinedStores  from "../stores/CombinedStores";
    import Button from "../shared/Button.svelte";
    export let selectedCustomerId;

    let selectedCustomer;
    CustomerStores.subscribe(customerData => {
        selectedCustomer = customerData.find(customer => customer.id === selectedCustomerId);
    });

    // console.log(selectedCustomer);

    let selectedData=[];
    CombinedStores.subscribe( combinedData => {
        selectedData.push(combinedData.find(data => data.customerId === selectedCustomerId))
    }
    );

    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    console.log(selectedData[0]);

</script>

<div class="orderdetails">
    <div class="card-heading">
        <h2>{selectedCustomer.companyName}</h2>
        <div class="button">
            <Button flat={true} type="primary">X</Button>
        </div>
    </div>
    <div class="basic-details">
        <div class="customer-name">
            <h3>Customer Name</h3>
            {capitalizeFirstLetter(selectedCustomer.personIncharge)}
        </div>
        <div class="customer-email">
            <h3>Customer Email</h3>
            {selectedCustomer.email}
        </div>
        <div class="customer-number">
            <h3>Phone Number</h3>
            {selectedCustomer.phoneNo}
        </div>
    </div>
    <div class="customer-detail-cards">
        <div class="card">
            <h3>Address</h3>
            <p>{capitalizeFirstLetter(selectedCustomer.address.line1)},<br>
                {capitalizeFirstLetter(selectedCustomer.address.line2)},<br>
                {capitalizeFirstLetter(selectedCustomer.address.city)},<br>
                {capitalizeFirstLetter(selectedCustomer.address.state)},<br>
                {capitalizeFirstLetter(selectedCustomer.address.country)} - {capitalizeFirstLetter(selectedCustomer.address.zipCode)}</p>
        </div>
        <div class="card">
            <h3>Payment Method</h3>
            <p>Credit card <br>
                Card details: <br>
                xxxx xxxx xxxx 0578
            </p>
        </div>
        <div class="card">
            <div class="button">
                <Button flat={true} type="ternary">Download Invoice</Button>
            </div>
            <div class="button">
                <Button flat={true} type="ternary">Send as Email</Button>
            </div>
        </div>
    </div>
    <h3>Container Details</h3>
    <div class="container-details-card">
        {#each selectedData[0].containers as container}
        <div class="line1">
            <div class="cntid">
                <h4>Container ID</h4>
                <p class="val">{container.containerId}</p>
            </div>
            <div class="invoice-id">
                <h4>Invoice ID</h4>
                <p class="val">INVCID123987</p>
            </div>
            <div class="date">
                <h4>Date of Booking</h4>
                <p class="val">{container.date}</p>
            </div>
        </div>
        <div class="line2">
            <div class="units">
                <h4>No. Of Units</h4>
                <p class="val">{container.noUnits}</p>
            </div>
            <div class="description">
                <h4>Description / Remarks</h4>
                <p class="val">{container.description}</p>
            </div>
            <div class="cost">
                <h4>Cost</h4>
                <p class="val">${container.cost}</p>
            </div>
        </div>  
        <div class="line3">
            <div class="button">
                <Button flat={true} type="primary">Delete Container</Button>
            </div>
        </div>     
        {/each}
    </div>
        
</div>

<style>

</style>