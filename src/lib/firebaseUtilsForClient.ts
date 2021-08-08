import firebase from 'firebase'
import { getFuturePath } from './realtimedatabasePath'

export function initializeFirebase (callback: (initialized: boolean) => void) {
    fetch('/__/firebase/init.json').then(async response => {
        if (await firebase.initializeApp(await response.json())){
            firebase.auth().onAuthStateChanged(user => {
                const initialized = user instanceof Object
                callback(initialized)
            })
        }
    })
}

export function loginFirebase () {
    if (!firebase.auth().currentUser){
        firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
}

export function getFutures(cb: (res: any[]) => void) {
    firebase.database()
    .ref(getFuturePath(Date.now()))
    .on("value", (snapshot) => {
        const res = snapshot.val()
        cb(res)
        }
    )
}