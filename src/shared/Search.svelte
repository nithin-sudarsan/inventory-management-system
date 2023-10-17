<!-- <script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import CustomerStores from '../stores/CustomerStores.js';
    import CustomerDetails from '../components/CustomerDetails.svelte';
  
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
   -->
  <!-- <div>
    <input type="text" bind:value={searchQuery} placeholder="Search..." on:input={search} />
    {#if $searchResults.length > 0 && searchQuery!=''}
      <ul>
        {#each $searchResults as customer}

        {/each}
      </ul>
    {:else if $searchResults.length === 0}
      <p>No results found.</p>
    {/if}
  </div> -->
  