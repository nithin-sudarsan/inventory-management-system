<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
    import Dashboard from "./components/Dashboard.svelte";
	import OnboardCustomer from "./components/OnboardCustomer.svelte";
	import AddContainers from "./components/AddContainers.svelte";


	let items=["Dashboard", "Onboard Customer","Add Containers"];
	let activeItem="Dashboard";

	console.log(activeItem);
	
	const tabChange=(e)=>{
		activeItem=e.detail;
	}
	const handleAdd=(e)=>{
		activeItem="Dashboard";
	};
</script>

<Header {activeItem} {items} on:tabChange2={tabChange}/>
<main>
	{#if activeItem==="Dashboard"}
		<Dashboard/>
	{:else if activeItem === "Onboard Customer"}
		<OnboardCustomer on:add={handleAdd}/>
	{:else if activeItem === "Add Containers"}
		<AddContainers />
	{/if}
</main>
<Footer/>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>