import { NewsResponse, SourceResponse } from '../../interfaces/responceInterfaces';
import News from './news/news';
import Sources from './sources/sources';
import Burger from './burger/burger';

export class AppView {
    private news: News;
    private sources: Sources;
    private burger: Burger;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.burger = new Burger();
        this.burger.init();
    }

    drawNews(data: NewsResponse) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourceResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
