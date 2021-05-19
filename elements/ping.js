/**
 * Custom Element
 */
class Ping extends HTMLElement {
    // Lifecycle event: executed when the component is inserted into the DOM
    connectedCallback() {
        let shadow = this.attachShadow({ mode: 'open' })

        const size = this.getAttribute('size') ?? '.75rem';
        const color = this.getAttribute('color') ?? '#000';
        
        shadow.appendChild(this.renderStyle(size, color));
        shadow.appendChild(this.renderElement());
    }

    renderElement() {
        // Create elements for UI
        const ping = document.createElement('span');
        ping.classList.add("x-ping-wrapper");

        const pingSpread = document.createElement('span');
        pingSpread.classList.add("x-ping-spread");
        pingSpread.setAttribute('part', 'spread');

        const pingDot = document.createElement('span');
        pingDot.classList.add("x-ping-dot");
        pingDot.setAttribute('part', 'dot');

        // Construct UI
        ping.appendChild(pingSpread);
        ping.appendChild(pingDot);

        return ping;
    }

    renderStyle(size, color) {
        let style = document.createElement('style');

        style.textContent = `
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
        `;

        return style;
    }
}

// Register Element
customElements.define('x-ping', Ping);