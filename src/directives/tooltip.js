import { createPopper } from '@popperjs/core';

const CSS = {
    HIDDEN: 'vue-tooltip-hidden',
    VISIBLE: 'vue-tooltip-visible'
};
const BASE_CLASS = `h-tooltip  ${CSS.HIDDEN}`;
const PLACEMENT = ['top', 'left', 'right', 'bottom', 'auto'];
const SUB_PLACEMENT = ['start', 'end'];

const EVENTS = {
    ADD: 1,
    REMOVE: 2
};

const DEFAULT_OPTIONS = {
    container: false,
    delay: 200,
    instance: null, // the popper.js instance
    fixIosSafari: false,
    eventsEnabled: false,
    html: false,
    modifiers: [
        {
            name: 'arrow',
            options: {
                element: '.tooltip-arrow'
            }
        },
        {
            name: 'oldOnUpdate',
            enabled: true,
            phase: 'afterWrite',
            fn () {
                this.content(this.tooltip.options.title);
            }
        }],
    placement: '',
    placementPostfix: null, // start | end
    removeOnDestroy: true,
    title: '',
    class: '', // ex: 'tooltip-custom tooltip-other-custom'
    triggers: ['hover', 'focus'],
    offset: 5
};

const includes = (stack, needle) => {
    return stack.indexOf(needle) > -1;
};

export default class Tooltip {
    constructor (el, options = {}) {
        // Tooltip._defaults = DEFAULT_OPTIONS;
        this._options = {
            ...Tooltip._defaults,
            ...{
                onFirstUpdate: (state) => {
                    this.content(state.options.title);
                    // this._$tt.update();
                }
            },
            ...Tooltip.filterOptions(options)
        };

        this._$el = el;

        this._$tpl = this._createTooltipElement(this.options);
        this._$tt = createPopper(el, this._$tpl, this._options);
        this.setupPopper();
    }

    setupPopper () {
        // this._$el.insertAdjacentElement('afterend', this._$tpl);
        this.disabled = false;
        this._visible = false;
        this._clearDelay = null;

        this._$tt.setOptions(options => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false }
            ]
        }));

        this._setEvents();
    }

    destroy () {
        this._cleanEvents();
        if (this._$tpl && this._$tpl.parentNode) {
            this._$tpl.parentNode.removeChild(this._$tpl);
        }
    }

    get options () {
        return {...this._options};
    }

    get tooltip () {
        return this._$tt;
    }

    get visible () {
        return this._visible;
    }

    set visible (val) {
        if (typeof val === 'boolean') {
            this._visible = val;
        }
    }

    get disabled () {
        return this._disabled;
    }

    set disabled (val) {
        if (typeof val === 'boolean') {
            this._disabled = val;
        }
    }

    show () {
        this.toggle(true);
    }

    hide () {
        this.toggle(false);
    }

    toggle (visible, autoHide = true) {
        let delay = this._options.delay;

        if (this.disabled === true) {
            visible = false;
            delay = 0;
        }

        if (typeof visible !== 'boolean') {
            visible = !this._visible;
        }

        if (visible === true) {
            delay = 0;
        }

        clearTimeout(this._clearDelay);

        if (autoHide === true) {
            this._clearDelay = setTimeout(() => {
                this.visible = visible;
                if (this.visible === true && this.disabled !== true) {
                    // add tooltip node
                    this._$el.insertAdjacentElement('afterend', this._$tpl);

                    // Need the timeout to be sure that the element is inserted in the DOM
                    setTimeout(() => {
                        // enable eventListeners
                        this._$tt.setOptions(options => ({
                            ...options,
                            modifiers: [
                                ...options.modifiers,
                                { name: 'eventListeners', enabled: true }
                            ]
                        }));
                        // only update if the tooltip is visible
                        this._$tt.update();
                        // switch CSS
                        this._$tpl.classList.replace(CSS.HIDDEN, CSS.VISIBLE);
                    }, 60);
                } else {
                    this._$tpl.classList.replace(CSS.VISIBLE, CSS.HIDDEN);
                    // remove tooltip node
                    if (this._$tpl && this._$tpl.parentNode) {
                        this._$tpl.parentNode.removeChild(this._$tpl);
                    }

                    this._$tt.setOptions(options => ({
                        ...options,
                        modifiers: [
                            ...options.modifiers,
                            { name: 'eventListeners', enabled: false }
                        ]
                    }));
                }
            }, delay);
        }
    }

    _createTooltipElement (options) {
        // wrapper
        let $popper = document.createElement('div');
        $popper.setAttribute('id', `tooltip-${randomId()}`);
        $popper.setAttribute('class', `${BASE_CLASS} ${this._options.class}`);

        // make arrow
        let $arrow = document.createElement('div');
        $arrow.setAttribute('class', 'tooltip-arrow');
        $arrow.setAttribute('data-popper-arrow', '');
        $popper.appendChild($arrow);

        // make content container
        let $content = document.createElement('div');
        $content.setAttribute('class', 'tooltip-content');
        $popper.appendChild($content);

        return $popper;
    }

    _events (type = EVENTS.ADD) {
        const evtType = (type === EVENTS.ADD) ? 'addEventListener' : 'removeEventListener';
        if (!Array.isArray(this.options.triggers)) {
            console.error('trigger should be an array', this.options.triggers); // eslint-disable-line
            return;
        }

        let lis = (...params) => this._$el[evtType](...params);

        if (includes(this.options.triggers, 'manual')) {
            lis('click', this._onToggle.bind(this), false);
        } else {
            // For the strange iOS/safari behaviour, we remove any 'hover' and replace it by a 'click' event
            if (this.options.fixIosSafari && Tooltip.isIosSafari() && includes(this.options.triggers, 'hover')) {
                const pos = this.options.triggers.indexOf('hover');
                const click = includes(this.options.triggers, 'click');
                this._options.triggers[pos] = (click !== -1) ? 'click' : null;
            }

            this.options.triggers.map(evt => {
                switch (evt) {
                case 'click':
                    lis('click', (e) => { this._onToggle(e); }, false);
                    // document[evtType]('click', this._onDeactivate.bind(this), false);
                    break;
                case 'hover':
                    lis('mouseenter', this._onActivate.bind(this), false);
                    lis('mouseleave', this._onDeactivate.bind(this), false);
                    break;
                case 'focus':
                    lis('focus', this._onActivate.bind(this), false);
                    lis('blur', this._onDeactivate.bind(this), true);
                    break;
                }
            });

            if (includes(this.options.triggers, 'hover') || includes(this.options.triggers, 'focus')) {
                this._$tpl[evtType]('mouseenter', this._onMouseOverTooltip.bind(this), false);
                this._$tpl[evtType]('mouseleave', this._onMouseOutTooltip.bind(this), false);
            }
        }
    }

    _setEvents () {
        this._events();
    }

    _cleanEvents () {
        this._events(EVENTS.REMOVE);
    }

    _onActivate (e) {
        this.show();
    }

    _onDeactivate (e) {
        this.hide();
    }

    _onToggle (e) {
        e.stopPropagation();
        e.preventDefault();
        this.toggle();
    }

    _onMouseOverTooltip (e) {
        this.toggle(true, false);
    }

    _onMouseOutTooltip (e) {
        this.toggle(false);
    }

    content (content) {
        console.log(this._$tt);
        const wrapper = this._$tt.state.elements.popper.querySelector('.tooltip-content');
        if (typeof content === 'string') {
            this._$tt.state.options.title = content;
            wrapper.textContent = content;
        } else if (isElement(content)) {
            if (content !== wrapper.children[0]) {
                wrapper.innerHTML = '';
                // this.tooltip.htmlContent = content.cloneNode(true);
                wrapper.appendChild(content);
            }
        } else {
            console.error('unsupported content type', content); // eslint-disable-line
        }
    }

    set class (val) {
        if (typeof val === 'string') {
            const classList = this._$tpl.classList.value.replace(this.options.class, val);
            this._options.class = classList;
            this._$tpl.setAttribute('class', classList);
        }
    }

    static filterOptions (options) {
        let opt = {...options};

        opt.modifiers = [];
        let head = null;
        let tail = null;
        if (opt.placement.indexOf('-') > -1) {
            [head, tail] = opt.placement.split('-');
            opt.placement = (includes(PLACEMENT, head) && includes(SUB_PLACEMENT, tail)) ? opt.placement : Tooltip._defaults.placement;
        } else {
            opt.placement = (includes(PLACEMENT, opt.placement)) ? opt.placement : Tooltip._defaults.placement;
        }

        const offset = (window.isNaN(options.offset) || options.offset < 0) ? Tooltip._defaults.offset : options.offset;

        opt.modifiers.push({
            name: 'offset',
            options: {
                offset: [offset, offset],
              },
        });

        return opt;
    }

    static isIosSafari () {
        return includes(navigator.userAgent.toLowerCase(), 'mobile') && includes(navigator.userAgent.toLowerCase(), 'safari') &&
                (navigator.platform.toLowerCase() === 'iphone' || navigator.platform.toLowerCase() === 'ipad');
    }

    static defaults (data) {
        // if (data.placement) {
        //     data.originalPlacement = data.placement;
        // }
        Tooltip._defaults = {...Tooltip._defaults, ...data};
    }
}

Tooltip._defaults = {...DEFAULT_OPTIONS};

function randomId () {
    return `${Date.now()}-${Math.round(Math.random() * 100000000)}`;
}

/**
 * Check if the variable is an html element
 * @param {*} value
 * @return Boolean
 */
function isElement (value) {
    return value instanceof window.Element;
}
