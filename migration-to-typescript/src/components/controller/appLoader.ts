import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/' /* 'https://newsapi.org/v2/' */ /* 'http://127.0.0.1:8075/' */, {
            apiKey: '82717d1318ca471497c48dcbbe84a120',
        });
    }
}

export default AppLoader;
