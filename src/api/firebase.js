import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const login = () => {
	signInWithPopup(auth, provider).catch(console.error);
}

export const logout = () => {
	signOut(auth).catch(console.error);
}

export const onUserStateChange = (callback) => {
	onAuthStateChanged(auth, (user) => {
		callback(user)
	});
}