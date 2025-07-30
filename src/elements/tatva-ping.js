/**
 * Custom Element
 */
class tatvaPing extends HTMLElement {
    // Lifecycle event: executed when the component is inserted into the DOM
    connectedCallback() {
        const template = this.renderElement();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    renderElement() {
        const size = this.getAttribute('size') ?? '.75rem';
        const color = this.getAttribute('color') ?? '#000';

        const template = document.createElement('template');
        template.innerHTML = `
            ${this.renderStyle(size, color)}

            <div class="tatva-ping">
                <div part="content">
                    <slot></slot>
                </div>
                <span class="wrapper" part="wrapper">
                    <span class="spread" part="spread"></span>
                    <span class="dot" part="dot"></span>
                </span>
            </div>
        `;

        return template;
    }

    renderStyle(size, color) {
        return `
            <style>
                .tatva-ping {
                    display: inline-flex;
                    align-items: center;
                    flex-direction: row-reverse;
                    gap: 10px;
                }

                .wrapper {
                    display: flex;
                    margin-left: 4px;
                    width: ${size};
                    height: ${size};
                    position: relative;
                }

                .spread {
                    width: 100%;
                    height: 100%;
                    opacity: .75;
                    position: absolute;
                    border-radius: 9999px;
                    background-color: ${color};
                    animation: ping 1s cubic-bezier(0,0,.2,1) infinite;
                }

                .dot {
                    width: ${size};
                    height: ${size};
                    position: relative;
                    display: inline-flex;
                    border-radius: 9999px;
                    background-color: ${color};
                }

                @keyframes ping {
                    75%, 100% {
                    transform: scale(2);
                    opacity: 0;
                    }
                }
            </style>
        `;
    }
}

window.tatvaPing = tatvaPing;

// Register Element
if (!window.customElements.get('tatva-ping')) {
    window.customElements.define('tatva-ping', tatvaPing);
}