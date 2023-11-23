module.exports = {
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'false',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
};