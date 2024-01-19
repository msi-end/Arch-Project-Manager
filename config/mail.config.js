require('dotenv').config();

module.exports = {
    email: {
        user: process.env.Email_user,
        clientID: process.env.Email_clientId,
        clientSecret: process.env.Email_clientSecret,
        refreshToken: process.env.Email_refreshToken,
        redirectURI:process.env.Email_redirectURI,
    },
};