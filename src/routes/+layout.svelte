<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { AuthFire } from '$lib/scripts/auth';
	import '../app.css';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
	import Icon from '@iconify/svelte';
	let user = data.data;
	const handleGoogle = async () => {
		try {
			await new AuthFire().continueWithGoogle();
		} catch (error) {
			console.log(error);
		}
	};
	const handleGithub = async () => {
		try {
			await new AuthFire().continueWithGithub();
		} catch (error) {
			console.log(error);
		}
	};
</script>

<main class="max-w-screen-md mx-auto px-4">
	<section
		class="w-full shadow-lg bg-slate-200 flex items-center p-10 h-20 rounded-lg mt-10 gap-10 justify-between "
	>
		{#if $user === undefined}
			<Loading />
		{:else if $user === null}
			<div class="flex gap-10 items-center ">
				<img
					src="/user.jpg"
					alt="anonmous"
					class="justify-self-start aspect-square w-14 h-14 object-cover border-4 border-gray-600 rounded-full"
				/>
				<div class="">
					<p class="text-2xl text-gray-700 font-bold">You are not Authenticated</p>
					<p class="text-sm text-gray-500">Signin to continue</p>
				</div>
			</div>
			<div class="gap-5 hidden  sm:flex">
				<button
				on:click={handleGithub}
					type="button"
					class="inline-block rounded-full bg-black p-2 uppercase leading-normal text-white shadow-xl hover:shadow-2xl"
				>
					<Icon icon="mdi:github" class="scale-150" />
				</button>
				<button
				on:click={handleGoogle}
					type="button"
					class="inline-block rounded-full bg-white p-2 uppercase leading-normal text-white shadow-xl hover:shadow-2xl"
				>
					<Icon icon="devicon:google" class="scale-150" />
				</button>
			</div>
		{:else}
		<div class="flex gap-10 items-center ">
			<img
				src={$user.photoURL || "/user.jpg"}
				alt="user"
				class="justify-self-start aspect-square w-14 h-14 object-cover border-4 border-pink-600 rounded-full"
			/>
			<div class="">
				<p class="text-2xl text-pink-600 font-bold">You are Authenticated</p>
				<p class="text-sm text-gray-500">You are logged in with {$user.providerData[0].providerId.replaceAll(".com","")}</p>
			</div>
		</div>
		<div class="gap-5 hidden  sm:flex">
			<button
				on:click={()=>new AuthFire().signOut()}
					type="button"
					aria-label="signout"
					class="inline-block rounded-full bg-pink-600 p-2 uppercase leading-normal text-white shadow-xl hover:shadow-2xl"
				>
				<Icon icon="ant-design:logout-outlined" class='text-2xl' />
				</button>
		</div>
		{/if}
	</section>
	<slot />
</main>
