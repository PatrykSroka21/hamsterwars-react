// Importera de funktioner vi behöver från olika Firebase-moduler
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Require-funktionen finns inte om man använder "import"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
let privateKey;
if( process.env.PRIVATE_KEY ) {
    privateKey = JSON.parse(process.env.PRIVATE_KEY)
} else {
    privateKey = require('./firebaseConfig.json')
}

// Initialize Firebase
const app = initializeApp(privateKey);
const db = getFirestore(app);

export { db };
