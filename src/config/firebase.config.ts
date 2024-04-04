// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD88Qf-SUQ7qNOH92BK4x9bkhXVZADtY3U',
  authDomain: 'club-ecommerce-7c17c.firebaseapp.com',
  projectId: 'club-ecommerce-7c17c',
  storageBucket: 'club-ecommerce-7c17c.appspot.com',
  messagingSenderId: '602380056511',
  appId: '1:602380056511:web:0bb047db17ec1f96acd30a'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
