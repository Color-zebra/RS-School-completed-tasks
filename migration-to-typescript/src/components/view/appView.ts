import { NewsResponse, SourceResponse } from '../../interfaces/responceInterfaces';
import News from './news/news';
import Sources from './sources/sources';
import Burger from './burger/burger';
import Theme from './theme/theme';

export class AppView {
    private news: News;
    private sources: Sources;
    private burger: Burger;
    private theme: Theme;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.burger = new Burger();
        this.burger.init();
        this.theme = new Theme();
        this.theme.init();
    }

    drawNews(data: NewsResponse) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourceResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    closeMenu() {
        this.burger.closeMenu();
    }
}

export default AppView;
