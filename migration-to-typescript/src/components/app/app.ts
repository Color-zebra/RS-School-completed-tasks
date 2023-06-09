import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
    private changeSources: () => void;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.changeSources = this.onLanguageChange.bind(this);
    }

    onLanguageChange() {
        this.controller.getSources((data) => {
            data && this.view.drawSources(data);
            this.view.closeMenu();
        });
    }

    start() {
        const src = document.querySelector('.sources');
        if (src) {
            src.addEventListener('click', (e) =>
                this.controller.getNews(e as MouseEvent, (data) => {
                    data && this.view.drawNews(data);
                    this.view.closeMenu();
                })
            );
        }
        this.controller.getSources((data) => {
            data && this.view.drawSources(data);
            this.view.closeMenu();
        });
        this.controller.lang?.addEventListener('input', this.changeSources);
    }
}

export default App;
