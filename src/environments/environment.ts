// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userChats: "https://localhost:7139/api/Chats/chats/",
  randomUser: "https://localhost:7139/api/Chats/randomUser",
  firstMessages: "https://localhost:7139/api/Chats/messages/",
  sendMessage: "https://localhost:7139/api/Messages/send",
  editMessage : "https://localhost:7139/api/Messages/edit",
  delete:"https://localhost:7139/api/Messages/delete/",
  privateChat: "https://localhost:7139/api/Chats/privateChat/",
  createPrivateChat: "https://localhost:7139/api/Chats/create",
  login: "https://localhost:7139/api/Accounts/login",
  signalR: "https://localhost:7139/chat",

  firebaseConfig: {
    apiKey: "AIzaSyDkQFLRayEFK73XIpEFLvlZbO410yTIAZA",
    authDomain: "reenbitchatauth-725be.firebaseapp.com",
    projectId: "reenbitchatauth-725be",
    storageBucket: "reenbitchatauth-725be.appspot.com",
    messagingSenderId: "789865483754",
    appId: "1:789865483754:web:ef330544a6766af026b693",
    measurementId: "G-MWB3Q6G6JC"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
