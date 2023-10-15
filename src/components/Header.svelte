<script>
    import Tabs from "../shared/Tabs.svelte";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    export let activeItem;
    export let items;
    const tabChange = (e)=>{
        dispatch('tabChange2', e.detail);
		activeItem=e.detail;
		// console.log(activeItem);
	};
</script>

<div class="header">
    <div class="logo">
        <img src="/img/erat-efisien-logo.svg" alt="Logo"/>
        <h1>ERAT EFISIEN (LUMUT) <br>SDN BHD</h1>
    </div>
    <div class="tabs">
        <Tabs {activeItem} {items} on:tabChange={tabChange} />
    </div>
    
</div>

<style>
    .logo {
        color: #0003E9;
        height: 87px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
    }
    .tabs{
        height: 100%;
        margin-top: 2%;
    }
    .header{
            display: flex;
    width: 80%;
    height: 20%;
    padding: 2% 10%;
    justify-content: center;
    align-items: center;
    gap: 169px;
    }
</style>