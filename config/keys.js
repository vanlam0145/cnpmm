module.exports = {
    facebook: {
        clientID: '928720507464877',
        clientSecret: '2721c3c992e7fa91f4d6dcc42171bab1',
        deploy:function(){
            if(process.env.PORT){
                return "https://cross-app-chat.herokuapp.com/auth/facebook/callback"
            }
            else{
                return "https://localhost:3443/auth/facebook/callback"
            }
        }
    },
    google: {
        clientID: '443028773086-r2s66717t8b0gg6ilmveqsvl8de62bal.apps.googleusercontent.com',
        clientSecret: 'pffo2vvvAGWrPRXu4ZI0ZyKA',
        deploy:function(){
            if(process.env.PORT){
                return "https://cross-app-chat.herokuapp.com/auth/google/callback"
            }
            else{
                return "https://localhost:3443/auth/google/callback"
            }
        }
    },
}