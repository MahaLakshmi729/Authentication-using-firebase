<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
import NotSignedIn from '$lib/components/NotSignedIn.svelte';
	import SignedIn from '$lib/components/SignedIn.svelte';
	
	import type { LayoutData } from './$types';
	export let data:LayoutData
	let user = data.data
	$:console.log($user);
	
</script>

{#if $user === undefined}
<div class="w-full flex justify-center pt-32">
	<Loading />
</div>
{:else if $user === null}

<NotSignedIn />
{:else}
	<SignedIn user={$user} />
{/if}
	

