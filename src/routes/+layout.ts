import { userStore } from '$lib/components/stores';
import { AuthFire } from '$lib/scripts/auth';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	let user = userStore(AuthFire.auth);
	return {
		data:user
	};
};

export const ssr = false