/**
 * Custom Element: Image Compare
 */
class TatvaImageCompare extends HTMLElement {
    static get observedAttributes() {
        return [
            'handle',
            'hover',
            'before',
            'after',
            'arrowLeft',
            'arrowRight'
        ];
    }

    // Lifecycle event: executed when component attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (!oldValue) return;
        this.init();
    }

    // Lifecycle event: executed when the component is inserted into the DOM
    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.init();
    }

    renderElement() {
        const handleType = this.getAttribute('handle') ?? 'line'; // handle types: line, circle, rectangle, arrow
        const onHover = this.getAttribute('hover') ?? "false";
        const before = this.getAttribute('before') ?? 'assets/before.png';
        const after = this.getAttribute('after') ?? 'assets/after.png';
        const arrowLeft = this.getAttribute('arrowLeft') ?? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="move_left">
            <path fill-rule="evenodd"
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                clip-rule="evenodd" />
        </svg>`;

        const arrowRight = this.getAttribute('arrowRight') ?? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="move_right">
            <path fill-rule="evenodd"
                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                clip-rule="evenodd" />
        </svg>`;

        const template = document.createElement('template');
        template.innerHTML = `
            ${this.renderStyle()}

            <div class="image-compare">
                <div class="image-container" handle_type="${handleType}" hover=${onHover}>
                    <img id="before_img"
                        src="${before}" />

                    <div class="slider_overlay">
                        <div class="slider_handle">
                            <div class="slide_mover">
                                ${arrowLeft}
                                ${arrowRight}
                            </div>
                        </div>
                    </div>

                    <img id="after_img"
                        src="${after}" />
                </div>
        `;

        return template;
    }

    renderStyle() {
        return `
            <style>
                .image-compare {
                    width: 100%;
                    height: 100%;
                }
                
                .image-container {
                    position: relative;
                    overflow: hidden;
                }
                
                .image-container img {
                    width: 100%;
                    background-color: #94a3b8;
                }
                
                .image-container img:nth-child(1) {
                    position: absolute;
                }
                
                .slider_overlay {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    z-index: 12;
                }
                
                .slider_handle {
                    cursor: pointer;
                    width: 4px;
                    height: 100%;
                    background: white;
                    position: absolute;
                    top: 0;
                    left: 50%;
                }
                
                .slider_handle.line:before {
                    content: '';
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    left: -8px;
                    top: -10px;
                }
                .slider_handle.line:after {
                    content: '';
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    left: -8px;
                    bottom: -10px;
                }
                
                .slide_mover {
                    display: none;
                    width: 45px;
                    height: 45px;
                    border: 5px solid white;
                    color: white;
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                
                .circle .slide_mover {
                    border-radius: 50%;
                }
                
                .arrow .slide_mover {
                    border: none;
                }
            </style>
        `;
    }

    init() {
        const template = this.renderElement();
        this.shadowRoot.replaceChildren(template.content.cloneNode(true));

        // Get elements and attributes
        this.imageContainer = this.shadowRoot.querySelector('.image-container');
        this.sliderOverlay = this.shadowRoot.querySelector('.slider_overlay');
        this.sliderHandle = this.shadowRoot.querySelector('.slider_handle');
        this.slideMover = this.shadowRoot.querySelector('.slide_mover');
        this.beforeImg = this.shadowRoot.querySelector('#before_img');
        this.handleType = this.imageContainer.getAttribute('handle_type');
        this.onHover = this.imageContainer.getAttribute('hover');
        this.isDragging = false;

        // Bind functions
        this.updateSliderPosition = this.updateSliderPosition.bind(this);
        this.calculateSliderPosition = this.calculateSliderPosition.bind(this);
        this.moveSlider = this.moveSlider.bind(this);

        // Calculate and clip image in half for initial render
        const handleTypes = ["circle", "rectangle", "arrow"];
        
        // Wait for the image to load before getting its width
        this.beforeImg.onload = () => {
            const width = this.beforeImg.getBoundingClientRect().width / 2;
            this.beforeImg.style.clip = `rect(0px, ${width}px, auto, 0px)`;
        };
       
        // If the image is already loaded (from cache), trigger onload manually
        if (this.beforeImg.complete) {
            this.beforeImg.onload();
        }

        // Displaying handle based on type
        this.slideMover.style.display = handleTypes.includes(this.handleType) ? "flex" : "";
        this.handleType ? this.sliderHandle.classList.add(this.handleType) : "";

        // Eventlistners
        this.sliderHandle.addEventListener('mousedown', () => {
            this.isDragging = true;
            this.addEventListener('mousemove', this.moveSlider);
            this.addEventListener('mouseup', () => this.isDragging = false);
        });

        this.sliderOverlay.addEventListener('click', this.calculateSliderPosition);

        // Adding mousemove event listener to slider overlay if hover attribute is present
        if (this.onHover == 'true') {
            this.sliderOverlay.addEventListener('mousemove', this.calculateSliderPosition);
        }
    }

    updateSliderPosition(offsetX) {
        const max = Math.max(0, (Math.min(this.sliderOverlay.clientWidth, offsetX))); // Limiting slider movement within overlay
        this.sliderHandle.style.left = `${max}px`; // Updating slider handle position
        this.beforeImg.style.clip = `rect(0px, ${max}px, auto, 0px)`; // Clipping the before image based on slider position
    }

    calculateSliderPosition(e) {
        if (this.sliderOverlay) {
            this.updateSliderPosition(e.clientX - this.sliderOverlay.getBoundingClientRect().left);
        }
    }

    moveSlider(e) {
        this.isDragging && this.calculateSliderPosition(e);
    }
}

window.TatvaImageCompare = TatvaImageCompare;

// Register Element
if (!window.customElements.get('tatva-image-compare')) {
    window.customElements.define('tatva-image-compare', TatvaImageCompare);
}