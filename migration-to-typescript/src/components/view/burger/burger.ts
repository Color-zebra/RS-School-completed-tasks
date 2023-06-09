import './burger.css';

class Burger {
    private burger: HTMLElement | null;
    private menu: HTMLElement | null;

    constructor() {
        this.burger = null;
        this.menu = null;
    }

    init() {
        this.getHTMLElements();
        console.log(this.burger);
        console.log(this.menu);
        if (this.burger && this.menu) {
            this.hydrateBurger();
        }
    }

    getHTMLElements() {
        this.burger = document.getElementById('burger');
        this.menu = document.getElementById('menu');
    }

    hydrateBurger() {
        const toggleMenu = (e: Event) => {
            const target = (e.target as HTMLElement).closest('.burger');
            if (target === null) return;
            if ([...target.classList].includes('burger_shown')) {
                console.log('hide');
                this.burger?.classList.remove('burger_shown');
                this.menu?.classList.remove('sources_shown');
                return;
            } else {
                console.log('show');
                this.burger?.classList.add('burger_shown');
                this.menu?.classList.add('sources_shown');
            }
        };

        this.burger?.addEventListener('click', toggleMenu);
    }
}

export default Burger;
