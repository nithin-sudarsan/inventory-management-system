<script>
    import Card from "../shared/Card.svelte";
    import CustomerStores from "../stores/CustomerStores";
    import Button from "../shared/Button.svelte";
    // import { createEventDispatcher } from "svelte";

    export let customer;

    const handleDelete=(id)=>{
        CustomerStores.update(currentPolls =>{
            return currentPolls.filter(poll=> poll.id!=id);
        })
    }

    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };
</script>

<Card>
<div class="customer">
    <div class="nameAndEmail"> 
        <h2>{customer.companyName}</h2>
        <p class="email"><a href="mailto:{customer.email}">{capitalizeFirstLetter(customer.personIncharge)}</a></p>
    </div>


    <div class="address">
        <h3>Address</h3>
        <a href="https://maps.google.com/?q={customer.address.line1},{customer.address.line2},{customer.address.city},{customer.address.state},{customer.address.country}" class="href">
        {capitalizeFirstLetter(customer.address.line1)},<br>
        {capitalizeFirstLetter(customer.address.line2)},<br>
        {capitalizeFirstLetter(customer.address.city)},<br>
        {capitalizeFirstLetter(customer.address.state)},<br>
        {capitalizeFirstLetter(customer.address.country)} - {capitalizeFirstLetter(customer.address.zipCode)}
        </a>

    </div>
    
    <div class="buttons">
        <Button flat={true} on:click={()=>handleDelete(customer.id)}>Delete</Button>
        <Button type="secondary">Edit Details</Button>
    </div>
</div>
</Card>

<style>
    h2{
        margin: 0 auto;
        color: #555;
        text-align: left;
        padding: 0px 10px;
    }
    p{
        margin-top: 6px;
        font-size: 14px;
        text-align: left;
        padding: 0px 10px;
    }
    .buttons{
        margin-top: 30px;
        padding: 0px 10px;
    }

    .nameAndEmail{
        text-align: left;
        padding: 12% 10% 0px;
        justify-content: center;
    }

    .address{
        text-align: left;
        padding: 0px 10px;
        margin-top: 10px;

    }
    h3{
        margin-top: 0px;
        margin-bottom: 7px;
    }
    .customer{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 40px;
    }
</style>