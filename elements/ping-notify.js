/**
 * Custom Element
 */
class PingNotify extends HTMLElement {
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

            <slot></slot>
            <span class="x-ping-wrapper">
                <span class="x-ping-spread" part="spread"></span>
                <span class="x-ping-dot" part="dot"></span>
            </span>    
        `;

        return template;
    }

    renderStyle(size, color) {
        return `
            <style>
                .x-ping-wrapper {
                    display: flex;
                    width: ${size};
                    height: ${size};
                    position: relative;
                }

                .x-ping-spread {
                    width: 100%;
                    height: 100%;
                    opacity: .75;
                    position: absolute;
                    border-radius: 9999px;
                    background-color: ${color};
                    animation: ping 1s cubic-bezier(0,0,.2,1) infinite;
                }

                .x-ping-dot {
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

window.PingNotify = PingNotify;

// Register Element
if (!window.customElements.get('ping-notify')) {
    window.customElements.define('ping-notify', PingNotify);
}