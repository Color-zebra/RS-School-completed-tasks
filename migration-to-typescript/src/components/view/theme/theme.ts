import './theme.css';

class Theme {
    private body: HTMLElement;
    private themeSwitcher: HTMLElement | null;
    private toggleTheme: () => void;

    constructor() {
        this.body = document.body;
        this.themeSwitcher = document.getElementById('themeSwitcher');
        this.toggleTheme = this.toggle.bind(this);
    }

    toggle() {
        if (this.body.dataset.theme === 'dark') {
            this.body.dataset.theme = 'light';
        } else {
            this.body.dataset.theme = 'dark';
        }
    }

    init() {
        this.themeSwitcher?.addEventListener('click', this.toggleTheme);
    }
}

export default Theme;
