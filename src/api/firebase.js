import firebase from 'firebase';

    let config = {
        apiKey: "AIzaSyDVqjPkYevJGej1-YyDycIGKIWWUp_9uRg",
        authDomain: "shop-7827a.firebaseapp.com",
        databaseURL: "https://shop-7827a.firebaseio.com",
        projectId: "shop-7827a",
        storageBucket: "shop-7827a.appspot.com",
        messagingSenderId: "845095506207"
    };

    firebase.initializeApp(config);

export default {
    database : firebase.database()
}