<!-- <script>
    import { fade,scale } from "svelte/transition";
    import { flip } from "svelte/animate";
    import CustomerDetails from "./CustomerDetails.svelte";
    import CustomerStores from "../stores/CustomerStores";
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';


    let searchQuery = '';
    let searchResults = writable([]);

    const search = () =>
    {
        CustomerStores.subscribe(customer => {
            searchResults.set(
                customer.filter(item => 
        item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.personIncharge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phoneNo.toLowerCase().includes(searchQuery.toLowerCase())) 
            );
        })
    }
    onMount(() => {
      search(); // Initial search to display all results
    });
</script>

<div class="poll-list">
    <div class="searchbox">
        <input type="text" bind:value={searchQuery} placeholder="Search..." on:input={search}/>
    </div>
    
    {#if $searchResults.length > 0 }
      <ul>
        {#each $searchResults as customer (customer.id)}
            <div in:fade out:scale|local animate:flip={{duration: 500}} class="customer">
                <CustomerDetails {customer} />
            </div>
        {/each}
      </ul>
    {:else if $searchResults.length === 0}
      <p>No results found.</p>
    {/if}
</div> -->


<script>
    import { fade, scale } from "svelte/transition";
    import { flip } from "svelte/animate";
    import CustomerDetails from "./CustomerDetails.svelte";
    import OrderDetails from "./OrderDetails.svelte"; // Assuming you have an OrderDetails component
    import CustomerStores from "../stores/CustomerStores";
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    let searchQuery = '';
    let searchResults = writable([]);
    let selectedCustomerId = null;

    const dispatch = createEventDispatcher();

    const search = () => {
        CustomerStores.subscribe(customer => {
            searchResults.set(
                customer.filter(item =>
                    item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.personIncharge.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.phoneNo.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        });
    };

    const showOrderDetails = (customerId) => {
        selectedCustomerId = customerId;
    };

    onMount(() => {
        search(); 
    });
</script>

<div class="poll-list">
    <div class="searchbox">
        <input type="text" bind:value={searchQuery} placeholder="Search..." on:input={search}/>
    </div>

    {#if $searchResults.length > 0 }
        <ul>
            {#each $searchResults as customer (customer.id)}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div in:fade out:scale|local animate:flip={{duration: 500}}  on:click={() => showOrderDetails(customer.id)}>
                    {#if selectedCustomerId !== null && selectedCustomerId === customer.id}
                        <OrderDetails {selectedCustomerId}/>
                    {:else if selectedCustomerId === null}
                    <div class="customer">
                        <CustomerDetails {customer} />
                    </div>
                    {/if}
                </div>
            {/each}
            
        </ul>
    {:else if $searchResults.length === 0}
        <p>No results found.</p>
    {/if}
</div>




<style>
    .poll-list{
        padding: 0px 15%;
    }
    .customer{
        margin-top: 20px;
        transition: transform 0.3s ease;
    }
    .searchbox{
        text-align: right;
    }
    input{
        border-radius: 15px;
    }
    a{
        text-decoration: none;
    }
    .customer:hover {
        transform: scale(1.03);
        cursor: pointer;
    }
</style>