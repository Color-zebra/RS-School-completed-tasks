import { NewsResponse, SourceResponse } from '../../interfaces/responceInterfaces';
import { Langs } from '../../types/types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public lang: null | HTMLInputElement;

    constructor() {
        super();
        this.lang = <HTMLInputElement>document.getElementById('langSwitcher');
    }

    private getLang() {
        const choosenLang = this.lang?.value;
        if (choosenLang && choosenLang in Langs) return choosenLang;
        return 'ru';
    }

    public getSources(callback: (arg0?: SourceResponse) => void) {
        super.getResp(
            {
                endpoint: 'sources',
                options: {
                    language: this.getLang(),
                },
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: (arg0?: NewsResponse) => void) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target && target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer && sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                                language: this.getLang(),
                            },
                        },
                        callback
                    );
                }
                return;
            }
            if (target.parentNode) {
                target = target.parentNode as HTMLElement;
            }
        }
    }
}

export default AppController;
