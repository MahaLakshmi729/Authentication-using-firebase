import { app } from '$lib/Firebase/fireConf';
import {
	getAuth,
	setPersistence,
	browserLocalPersistence,
	GoogleAuthProvider,
	getAdditionalUserInfo,
	signOut,
	signInWithPopup,
	GithubAuthProvider,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	type ConfirmationResult
} from 'firebase/auth';
declare global {
	interface Window {
		recaptchaVerifier: RecaptchaVerifier;
	}
  }
export class AuthFire {
	static auth = getAuth(app);

	continueWithGoogle = async () => {
		try {
			await setPersistence(AuthFire.auth, browserLocalPersistence);
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(AuthFire.auth, provider);
			if (result) {
				// This is the signed-in user
				const user = result.user;
				const res = getAdditionalUserInfo(result);
				return { user, newUser: res?.isNewUser };
			}
		} catch (error) {
			console.log(error);
		}
	};

	continueWithGithub = async () => {
		try {
			console.log('start');

			const provider = new GithubAuthProvider();
			const result = await signInWithPopup(AuthFire.auth, provider);
			console.log({ result });

			if (result) {
				// This is the signed-in user
				const user = result.user;
				const res = getAdditionalUserInfo(result);
				return { user, newUser: res?.isNewUser };
			}
		} catch (e) {
			console.log(e);
		}
	};

	getOtp = async (phone: string) => {
		try {
			const auth = getAuth();
			window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
				size: 'invisible'
			});
			const res= await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
			return res
		} catch (error) {
			console.log(error);
		}
	};

	typeOtp =async (res:ConfirmationResult,otp:string) => {
		try {
			const result = await res.confirm(otp)
			if (result) {
				return result.user
			}
		} catch (error) {
			console.log(error);
			
		}
	}

	signOut = async () => {
		try {
			await signOut(AuthFire.auth);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};
}
