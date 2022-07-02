// // Självständigt skript som hämtar data från databasen
// import { collection, getDocs, doc, getDoc } from "firebase/firestore"

// import { db } from 'hamster-wars-a5cea.firebaseapp.com'


// // Hämta alla dokument
// const colRef = collection(db, "Hamsters");
// let hamsters = [];

// // Man kan använda antingen .then eller async/await
// getDocs(colRef).then((snapshot) => {
// 	snapshot.docs.forEach((docSnapshot) => {
// 		hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id });
// 	});
// 	console.log(hamsters);
// });
