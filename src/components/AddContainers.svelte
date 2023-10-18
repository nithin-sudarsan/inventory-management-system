<script>
    import Button from "../shared/Button.svelte";
    import CustomerStores from "../stores/CustomerStores";
    import ContainerStores from "../stores/ContainerStores";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();
    let valid=false;
    let container={
        customerId:'', containerId:'',noUnits:'',description:'',cost:'',paymentMethod:''
    };
    let errors={
        customerId:'', containerId:'',noUnits:'',description:'',cost:'',paymentMethod:''
    };

    let customerIds = [];

    CustomerStores.subscribe(customerData => {
    customerData.forEach(customer => {
        customerIds.push(customer.id);
    });
    });

    const submitHandler=()=>{
        valid = true;
        // Validate ContainerID name
        if (container.containerId.trim().length < 1){
            valid=false;
            errors.containerId = 'Container ID cannot be empty';
        }
        else{
            errors.containerId='';
        }

        // Validate No of units
        if (!container.noUnits || isNaN(container.noUnits) || container.noUnits <= 0) {
            valid = false;
            errors.noUnits = 'No. of Units must be a valid number greater than 0';
        } else {
            errors.noUnits = '';
        }


        //Validate description
        if (container.description.trim().length < 1){
            valid=false;
            errors.description = 'Description cannot be empty';
        }
        else{
            errors.description='';
        }

        //Validate Cost
        if (!container.cost || isNaN(container.cost)) {
            valid = false;
            errors.cost = 'Invalid Cost';
        } else {
            errors.cost = '';
        }

        //Validate CustomerId
        if (container.customerId.trim() === ""){
            valid=false;
            errors.customerId = 'Please choose a customer ID';
        }
        else{
            errors.customerId='';
        }

        // Validate payment method
        if (container.paymentMethod.trim() === ""){
            valid=false;
            errors.paymentMethod = 'Please choose a payment Method';
        }
        else{
            errors.paymentMethod='';
        }

        if(valid){
            let today = new Date();
            let day = today.getDate().toString().padStart(2, '0');
            let month = (today.getMonth() + 1).toString().padStart(2, '0'); // January is 0
            let year = today.getFullYear();
            let formattedDate = `${day}-${month}-${year}`;
            let containerDetails = { ...container,  date: formattedDate};

            //save poll to store
            ContainerStores.update(currentContainers=>{
                console.log([containerDetails, ...currentContainers]);
                return [container, ...currentContainers];
            });
            alert("Container added successfully!");
            dispatch('add');
        }
    };

</script>

<div class="onboard-form">
    <h1>Add Containers</h1>
    <form on:submit|preventDefault={submitHandler}>
        <div class="half-field left">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Customer ID</label>
            <select bind:value={container.customerId}>
                <option value="">Choose Customer ID</option>
                {#each customerIds as ids}
                    <option value={ids}>{ids}</option>
                {/each}
            </select>
            <br><br><br>
            <div class="error">{errors.customerId}</div>
        </div>
        <div class="half-field right">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Container ID</label>
            <input type="text" bind:value={container.containerId}>
            <div class="error">{errors.containerId}</div>
        </div>
        <div class="half-field left">
            <label for="">No. of Units / Space</label>
            <input type="text" bind:value={container.noUnits}>
            <div class="error">{errors.noUnits}</div>
        </div>
        <div class="half-field right">
            <label for="">Description / Remarks</label>
            <input type="text" bind:value={container.description}>
            <div class="error">{errors.description}</div>
        </div>
        <div class="half-field left">
            <label for="">Cost (in $)</label>
            <input type="text" bind:value={container.cost}>
            <div class="error">{errors.cost}</div>
        </div>
        <div class="half-field right">
            <label for="">Payment Method</label>
            <select bind:value={container.paymentMethod}>
                <option value="">Select Payment Method</option>
                <option value="creditCard">Credit Card</option>
                <option value="debitCard">Debit Card</option>
                <option value="bankTransfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
            </select>
            <br><br><br>
            <div class="error">{errors.paymentMethod}</div>
        </div>
        <div class="button">
            <Button flat={true} type="secondary">Add Container</Button>
        </div>
    </form>
</div>

<style>
    form{
        display: flex; justify-content: center; flex-wrap: wrap;
    }
    .onboard-form {
        width: 80%;
        margin: 0 auto;
    }
        .half-field {
            width: 45%;
            float: left;
            box-sizing: border-box;
        }
        input[type="text"], input[type="email"] {
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 10px;
            padding: 5px;
            border-radius: 10px;
            height: 40px;
            padding-left: 10px;
        }
        label {
            font-weight: bold;
            display: block;
            margin-bottom: 15px;
            text-align: left;
        }
        .right{
            float: right;
        }
        .left{
            margin-right: 5%;
        }
        select{
            float:left;
            height: 40px;
        }
        .error{
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
        margin-bottom: 5px;
    }
    .button{
        margin-top: 30px;
    }
</style>