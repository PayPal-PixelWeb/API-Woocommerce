module.exports = {
    agleather: {
        url: 'https://agleather.us',
        consumerKey: process.env.CONSUMER_KEY_AGLEATHER,
        consumerSecret: process.env.CONSUMER_SECRET_AGLEATHER,
        wpAPI: true,
        version: 'wc/v2',
        query_string_auth: true
    },
    takum: {
        url: 'https://takum.mx',
        consumerKey: process.env.CONSUMER_KEY_TAKUM,
        consumerSecret: process.env.CONSUMER_SECRET_TAKUM,
        wpAPI: true,
        version: 'wc/v2',
        query_string_auth: true
    },
    woge: {
        url: 'https://woge.us',
        consumerKey: process.env.CONSUMER_KEY_WOGE,
        consumerSecret: process.env.CONSUMER_SECRET_WOGE,
        wpAPI: true,
        version: 'wc/v2',
        query_string_auth: true
    }
}