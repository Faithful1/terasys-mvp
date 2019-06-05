module.exports = {

    env: '',
    secret: '',
    port: '',
    defaults: {
        limit: 10,
        filter: 'timestamp'
    },
    mongodb: {
        host: ''
    },
    sendgrid: {
        user: '',
        pass: ''
    },
    tokenExpiry: 3000,
    adminKey: ''
    //adminExpiry:3600*24*365*10

};