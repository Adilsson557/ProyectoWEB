import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(), 
    provideFirebaseApp(() => 
      initializeApp({
        apiKey: "AIzaSyDN8f6rubtOCumQu_cES2UKAcMN1VP7W_M",
        authDomain: "ayllunet.firebaseapp.com",
        projectId: "ayllunet",
        storageBucket: "ayllunet.firebasestorage.app",
        messagingSenderId: "955278965208",
        appId: "1:955278965208:web:a5d5d5af0e5299fdb55aad",
        measurementId: "G-9FZPXMQYQH"
      })
    ),
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())]
};
