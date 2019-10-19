firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log('a');
    } else {
        // No user is signed in.
        console.log('b');
    }
});
function login() {
    const email = $('#email').val();
    const pass = $('#password').val();
    console.log(email + pass);
    firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('error' + errorMessage);
            // ...
        });
}
