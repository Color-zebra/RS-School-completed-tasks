import { Article } from '../../../interfaces/responceInterfaces';
import './news.css';

class News {
    public draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as HTMLElement;
            if (newsClone === null) return;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const newsPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (newsPhoto) {
                newsPhoto.style.backgroundImage = `url(${item.urlToImage || './assets/placeholder.png'})`;
            }

            const newsAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (newsAuthor) {
                newsAuthor.textContent = item.author || item.source?.name || null;
            }

            const newsDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
            if (newsDate) {
                newsDate.textContent = item.publishedAt?.slice(0, 10).split('-').reverse().join('-') || null;
            }

            const newsTitle = newsClone.querySelector('.news__description-title');
            if (newsTitle) {
                newsTitle.textContent = item.title || null;
            }

            const newsSource = newsClone.querySelector('.news__description-source');
            if (newsSource) {
                newsSource.textContent = item.source?.name || null;
            }

            const newsDesc = newsClone.querySelector('.news__description-content');
            if (newsDesc) {
                newsDesc.textContent = item.description || null;
            }

            const newsMore = newsClone.querySelector('.news__read-more a');
            if (newsMore) {
                newsMore.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsElement = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
