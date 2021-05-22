/**
 * Custom Element
 */
class TattvaPing extends HTMLElement {
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
        template.innerHTML =  `
            ${this.renderStyle(size, color)}

            <div part="content">
                <slot></slot>
            </div>
            <span class="wrapper" part="wrapper">
                <span class="spread" part="spread"></span>
                <span class="dot" part="dot"></span>
            </span>    
        `;

        return template;
    }

    renderStyle(size, color) {
        return `
            <style>
                .wrapper {
                    display: flex;
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

window.TattvaPing = TattvaPing;

// Register Element
if (!window.customElements.get('tattva-ping')) {
    window.customElements.define('tattva-ping', TattvaPing);
}