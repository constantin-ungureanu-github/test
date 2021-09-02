import { doc, initializeFirestore } from 'firebase/firestore';
import { enableIndexedDbPersistence } from 'firebase/firestore';
// import { getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider, FirestoreProvider, useInitFirestore, useFirestore, useFirestoreDocData } from 'reactfire';
import { firebaseConfig } from './firebase';
import './App.scss';

const BurritoTaste = () => {
  const firestore = useFirestore();
  const burritoRef = doc(firestore, 'tryreactfire', 'burrito');
  const { status, data } = useFirestoreDocData(burritoRef);

  if (status === 'loading') {
    return <span>loading...</span>;
  }

  return (
    <main>
      <h1>🌯</h1>
      <p>The burrito is {data.yummy ? 'good' : 'bad'}!</p>
    </main>
  );
}

const AppContent = () => {
  const { status, data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
    // const firestore = getFirestore(firebaseApp);
    const firestore = initializeFirestore(firebaseApp, {});

    await enableIndexedDbPersistence(firestore);

    return firestore;
  });

  if (status === 'loading') {
    return <span>loading...</span>;
  }

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <BurritoTaste />
    </FirestoreProvider>
  )
}

const App = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AppContent />
    </FirebaseAppProvider>
  )
}

export default App;
