var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Product_prop;
export const appendTheseTo = (node) => (element) => node.appendChild(element);
export const setclassName = (name) => (e) => {
    e.className = name;
    return e;
};
export const setInnerText = (text) => (e) => {
    e.innerText = text;
    return e;
};
export const setAttribute = (attribute) => (value) => (e) => {
    e.style[attribute] = value;
    return e;
};
export const debug = (color) => (isDebug) => (el) => {
    if (isDebug)
        setAttribute("backgroundColor")(color)(el);
};
export const createElementWIthId = (type) => (id) => {
    const element = document.createElement(type);
    element.id = id;
    return element;
};
export const createPWithText = (text) => {
    return setInnerText(text)(document.createElement("p"));
};
export const createDivWithClassName = (classname) => {
    return setclassName(classname)(document.createElement("div"));
};
const createProduct = ({ dataTag, tags, title: t, description: d, alt, src, }) => {
    const product = new UINode(createDivWithClassName("product"));
    const image = new UINode(createElementWIthId("img")("product-image"));
    image.value.setAttribute("src", src);
    const description_container = new UINode(createDivWithClassName("description-container"));
    const details = new UINode(createDivWithClassName("details"));
    details.value.innerHTML = tags.join(` `);
    details.value.setAttribute("data-tags", dataTag);
    const title = new UINode(createDivWithClassName("title"));
    title.value.innerText = t;
    const description = new UINode(createDivWithClassName("description"));
    setInnerText(d)(description.value);
    return build(product
        .addChild(image)
        .addChild(description_container
        .addChild(details)
        .addChild(title)
        .addChild(description)));
};
export class Product {
    constructor(prop) {
        _Product_prop.set(this, void 0);
        __classPrivateFieldSet(this, _Product_prop, prop, "f");
    }
    get element() {
        return createProduct(__classPrivateFieldGet(this, _Product_prop, "f"));
    }
}
_Product_prop = new WeakMap();
/**
 *
 * ```
 * const testdiv = document.createElement("div");
 * const testsubdiv1 = document.createElement("div");
 * const testsubdiv2 = document.createElement("div");
 * const testsubdiv3 = document.createElement("div");
 * const node1 = new UINode(testdiv);
 * const node2 = new UINode(testsubdiv1);
 * const node3 = new UINode(testsubdiv2);
 * const node4 = new UINode(testsubdiv3);
 * node1
 *  .addChild(node2)
 *  .addChild(
 *     node3.addChild(node4)
 *   );
 * ```
globalThis.node = build(node1);
 */
export class UINode {
    constructor(value) {
        this.value = value;
        this.children = undefined;
    }
    addChild(value) {
        if (!this.children)
            this.children = [];
        this.children.push(value);
        return this;
    }
}
/**
 *
 *
 * @param node Accetta il nodo root della sezione da creare
 * @returns {HTMLElement}
 *
 * @example
 * ```
 * const mydiv = createElementWIthId("div")("my-div");
 * const mysubdiv = createElementWIthId("div")("my-sub-div");
 * const myP1 = createElementWIthId("p")("my-p1");
 * const myP2 = createElementWIthId("p")("my-p2");
 *
 * const divpadre = {
 *   value: mydiv,
 *   children: [
 *     {
 *       value: mysubdiv,
 *       children: [{ value: myP1 }, { value: myP2 }],
 *     },
 *   ],
 * };
 * build(divpadre)
 * ```
 */
export const build = (node) => {
    let stack = [node];
    let res = [];
    while (stack.length) {
        const current = stack.pop();
        res.push(current);
        if (current) {
            const children = current.children;
            if (children)
                children.forEach((c) => {
                    current.value.appendChild(c.value);
                    stack.push(c);
                });
        }
    }
    return node.value;
};
