import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const src = document.querySelector('.sources');
        if (src) {
            src.addEventListener('click', (e) =>
                this.controller.getNews(e as MouseEvent, (data) => {
                    data && this.view.drawNews(data);
                })
            );
        }
        this.controller.getSources((data) => {
            data && this.view.drawSources(data);
        });
    }
}

export default App;
