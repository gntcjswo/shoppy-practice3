import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { v4 as uuid } from "uuid";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);

export const login = () => {
	signInWithPopup(auth, provider).catch(console.error);
}

export const logout = () => {
	signOut(auth).catch(console.error);
}

export const onUserStateChange = (callback) => {
	onAuthStateChanged(auth, async (user) => {
		const updateUser = user ? await adminUser(user) : null;
		callback(updateUser)
	});
}

async function adminUser(user) {
	return get(ref(database, 'admins'))
		.then(snapshot => {
			if (snapshot.exists()) {
				const admins = snapshot.val();
				const isAdmin = admins.includes(user.uid);
				return { ...user, isAdmin }
			}

			return user;
		})
}

export async function addNewPortfolio(portfolio, image) {
	const id = uuid();
	return set(ref(database, `portfolio/${id}`), {
		...portfolio,
		id,
		image
	})
}

export async function getPortfolio() {
	return get(ref(database, 'portfolio')).then(snapshot => {
		if (snapshot.exists()) {
			return Object.values(snapshot.val())
		}
		return [];
	})
}