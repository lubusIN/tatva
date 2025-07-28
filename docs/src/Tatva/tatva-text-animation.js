/**
 * tatva: Text Animation
 */
class tatvaTextAnimation extends HTMLElement {
    static get observedAttributes() {
        return [
            'animation-type',
            'words',
            'speed',
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!oldValue) return;
        this.init();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.init();
    }

    renderElement() {
        const animationType = this.getAttribute('animation-type') || 'typing';
        const words = this.getAttribute('words') || '["Hello Lubus"]';
        const speed = this.getAttribute('speed') || '150';
        const template = document.createElement('template');
        template.innerHTML = `
            ${this.renderStyle()}
            <div class="textcontainer" animation-type="${animationType}" words='${words}' speed="${speed}"></div>
        `;
        return template;
    }

    renderStyle() {
        return `
            <style>
                .textcontainer {
                    margin: auto;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    font-size: 1.5em;
                    font-weight: 600;
                    line-height: initial;
                    color: black;
                    padding: 0px 5px;
                }
                
                .textcontainer .char {
                    white-space: pre;
                    transform: scale(5);
                    opacity: 0;
                    transition: transform 0.5s ease, opacity 1s ease;
                }

                .textcontainer.visible {
                    border-right: 6px solid black;
                }
            </style>
        `;
    }

    getElementAttributes() {
        this.element = this.shadowRoot.querySelector('.textcontainer');
        this.speed = parseInt(this.element.getAttribute('speed'), 10);
    }

    initTyping() {
        this.getElementAttributes();
        this.words = JSON.parse(this.element.getAttribute('words'));
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isForward = true;
        this.skipCharDelay = 15;

        setInterval(() => {
            if (this.isForward) {
                this.charIndex++;
            } else {
                this.charIndex--;
            }

            if (this.charIndex >= this.words[this.wordIndex].length + this.skipCharDelay) {
                this.isForward = false;
            } else if (this.charIndex <= 0) {
                this.isForward = true;
                this.wordIndex = (this.wordIndex + 1) % this.words.length;
            }

            this.element.textContent = this.words[this.wordIndex].substr(0, this.charIndex);
        }, this.speed);

        setInterval(() => {
            this.element.classList.toggle('visible');
        }, 550);
    }

    initFlyin() {
        this.getElementAttributes();
        this.words = this.element.getAttribute('words');
        this.chars = this.words.split('');
        this.index = 0;

        this.element.innerHTML = '';

        this.chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'char';

            setTimeout(() => {
                span.style.transform = "scale(1)";
                span.style.opacity = 1;
            }, index * this.speed);

            this.element.appendChild(span);
        });
    }

    init() {
        const template = this.renderElement();
        this.shadowRoot.replaceChildren(template.content.cloneNode(true));
        const animationType = this.getAttribute('animation-type') || 'typing';
        if (animationType === 'typing') {
            this.initTyping();
        } else if (animationType === 'flyin') {
            this.initFlyin();
        }
    }
}

window.tatvaTextAnimation = tatvaTextAnimation;

if (!window.customElements.get('tatva-text-animation')) {
    window.customElements.define('tatva-text-animation', tatvaTextAnimation);
}
