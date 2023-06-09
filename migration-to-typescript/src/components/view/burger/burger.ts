import './burger.css';

class Burger {
    private burger: HTMLElement | null;
    private menu: HTMLElement | null;
    public closeMenu: () => void;
    private openMenu: () => void;

    constructor() {
        this.burger = null;
        this.menu = null;
        this.closeMenu = this.close.bind(this);
        this.openMenu = this.open.bind(this);
    }

    init() {
        this.getHTMLElements();
        if (this.burger && this.menu) {
            this.hydrateBurger();
        }
    }

    getHTMLElements() {
        this.burger = document.getElementById('burger');
        this.menu = document.getElementById('menu');
    }

    close() {
        this.burger?.classList.remove('burger_shown');
        this.menu?.classList.remove('sources_shown');
    }

    open() {
        this.burger?.classList.add('burger_shown');
        this.menu?.classList.add('sources_shown');
    }

    hydrateBurger() {
        const toggleMenu = (e: Event) => {
            const target = (e.target as HTMLElement).closest('.burger');
            if (target === null) return;
            if ([...target.classList].includes('burger_shown')) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        };
        this.burger?.addEventListener('click', toggleMenu);
    }
}

export default Burger;
