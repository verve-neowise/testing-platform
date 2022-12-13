<script lang="ts">
	import { Router, Route, Link } from "svelte-navigator";
    import AuthProtector from "./components/AuthProtector.svelte";
    import Home from "./pages/Home.svelte";

	import Login from "./pages/Login.svelte";
    import Register from "./pages/Register.svelte";
	import { authStore } from "./stores/auth.store";
</script>

<main>
	<Router>
		<Route>
			<AuthProtector>
				<Home/>
			</AuthProtector>
		</Route>
		<Route path="login">
			<Login/>
		</Route>
		<Route path="register">
			<Register/>			
		</Route>
	</Router>
</main>

<style>
</style>