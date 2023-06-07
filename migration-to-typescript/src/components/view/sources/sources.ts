import { Source } from '../../../interfaces/responceInterfaces';
import './sources.css';

class Sources {
    public draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as HTMLElement;

            if (!sourceClone) return;

            const sourceName = sourceClone.querySelector('.source__item-name');
            if (sourceName) {
                sourceName.textContent = item.name;
            }

            const sourceItem = sourceClone.querySelector('.source__item');
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
