<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch=createEventDispatcher();

    export let items;
    export let activeItem;
</script>

<div class="tabs">
    <ul>
        {#each items as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={()=>{dispatch('tabChange',item)}}>
            <div class="centered">
                <div class:active={item === activeItem} >{item}</div>
            </div>  
        </li>
        {/each}
    </ul>
</div>

<style>
    .active{
        color: #0004E9;
        background: #D9D9D9;
        padding: 10px 20px;
        border-radius: 20px;
        transition: all 0.3s ease;
    }
    .tabs{
        margin-bottom: 40px;
    }
    ul{
        display: flex;
        justify-content: center;
        padding: 0px;
        list-style-type: none;
    }
    li{
        margin: 0px 16px;
        color: #555;
        cursor: pointer;
        padding: 10px 20px;
        border-radius: 20px;
        padding: 10px 20px;
        border-radius: 20px;
        transition: all 0.3s ease;
    }
</style>
