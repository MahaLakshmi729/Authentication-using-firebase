<script lang="ts">
	import type { User } from 'firebase/auth';
	export let user: User;
</script>

<div class="block rounded-lg max-w-xl mx-auto bg-zinc-100 mt-10 p-6 shadow-xl mb-20">
	<h5 class="mb-2 text-center font-bold text-3xl leading-tight text-neutral-800">
		🥳 You are Authenticated 🥳
	</h5>
	<p class="mb-4 text-base text-neutral-600 text-center p-5">
		You are Authenticated with <span class="capitalize">{user.providerData[0].providerId.replace(".com","")}</span>
	</p>
	<p class="mb-4  text-neutral-800 font-semibold text-2xl text-center p-5">
		🎀Welcome <span class="capitalize">{user.displayName || user.email || user.phoneNumber} 🎀</span>
	</p>
</div>
