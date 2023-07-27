<script lang="ts">
	import { AuthFire } from '$lib/scripts/auth';
	import Icon from '@iconify/svelte';
	import type { ConfirmationResult } from 'firebase/auth';
	import { scale } from 'svelte/transition';
	let showOTP = false;
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
	const handleOTPStart = async () => {
		try {
			// console.log(`${code}${number}`);
			result = await new AuthFire().getOtp(`${code}${number}`);
			showOTP = true;
		} catch (error) {
			console.log(error);
		}
	};
	const handleOTPEnd = async () => {
		try {
			if (result) {
				await new AuthFire().typeOtp(result, otp);
			}
		} catch (error) {
			console.log(error);
		}
	};
	let result: ConfirmationResult | undefined;
	let number: string = '';
	let otp: string = '';
	let code: string = '';
</script>

<div class="block rounded-lg max-w-xl mx-auto bg-zinc-100 mt-10 p-6 shadow-xl mb-20">
	<h5 class="mb-2 text-center pt-2 pb-6 font-bold text-3xl leading-tight text-neutral-800">
		Authenticate Yourself
	</h5>
	<hr />

	<p class="mb-4 text-base text-neutral-600 text-center p-5">Choose Your Provider</p>

	<button
		on:click={handleGoogle}
		class="w-full mx-auto max-w-xs font-bold shadow-lg mb-10 rounded-lg py-3 bg-gray-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline svelte-5h007k"
		><div class="bg-white dark:bg-gray-300 p-2 rounded-full">
			<Icon icon="devicon:google" class="" />
		</div>
		<span class="ml-4">Continue with Google</span></button
	>
	<button
		on:click={handleGithub}
		class="w-full mx-auto max-w-xs font-bold shadow-lg mb-10 rounded-lg py-3 bg-gray-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline svelte-5h007k"
		><div class="bg-white dark:bg-gray-300 p-2 rounded-full">
			<Icon icon="mdi:github" class="scale-150" />
		</div>
		<span class="ml-4">Continue with Github</span></button
	>
	<hr />
	<div>
		<p class="mb-4 text-base text-neutral-600 text-center p-5">Authenticate with Phone Number</p>
		<div class="flex gap-10 max-w-xs justify-center mx-auto">
			<div class="relative h-11 w-14">
				<input
					bind:value={code}
					maxlength="3"
					class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
					placeholder=""
				/>
				<label
					class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
				>
					Code
				</label>
			</div>
			<div class="relative h-11 w-full">
				<input
					bind:value={number}
					maxlength="10"
					class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
					placeholder=""
				/>
				<label
					class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
				>
					Mobile
				</label>
			</div>
		</div>

		<button
			on:click={handleOTPStart}
			id="sign-in-button"
			class="flex my-4 mx-auto select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
			type="button"
		>
			Verify Mobile
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				aria-hidden="true"
				class="h-5 w-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
				/>
			</svg>
		</button>
		{#if showOTP}
			<div transition:scale>
				<hr />

				<div class="w-72 mx-auto">
					<p class="mb-4 text-base text-neutral-600 text-center p-5">Verification</p>
					<div class="relative h-10 w-full min-w-[200px]">
						<input
						bind:value={otp}
							class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
							placeholder=" "
						/>
						<label
							class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
						>
							OTP
						</label>
					</div>
				</div>
				<div class="flex justify-center py-4">
					<button
						on:click={handleOTPEnd}
						class="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						data-ripple-light="true"
					>
						Verify OTP
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>