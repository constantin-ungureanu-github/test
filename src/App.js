import { doc, getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider, FirestoreProvider, useFirestore, useFirebaseApp, useFirestoreDocData } from 'reactfire';
import { firebaseConfig } from './firebase';
import './App.scss';

function BurritoTaste() {
  const firestore = useFirestore();
  const burritoRef = doc(firestore, 'tryreactfire', 'burrito');
  const { status, data } = useFirestoreDocData(burritoRef);

  if (status === 'loading') {
    return <p>Fetching burrito flavor...</p>;
  }

  return <p>The burrito is {data.yummy ? 'good' : 'bad'}!</p>;
}

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirestoreProvider sdk={getFirestore(useFirebaseApp())}>
        <h1>🌯</h1>
        <BurritoTaste />
      </FirestoreProvider>
    </FirebaseAppProvider>
  )
}

export default App;
