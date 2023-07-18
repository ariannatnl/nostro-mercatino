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
export var Dom;
(function (Dom) {
    Dom.generateId = () => `9x${(BigInt(Math.round(Math.random() * 10 ** 16)) *
        BigInt(Math.round(Math.random() * 10 ** 16)))
        .toString(16)
        .slice(0, 16)}`;
})(Dom || (Dom = {}));
export var Mercatino;
(function (Mercatino) {
    let tipiDiProdotto;
    (function (tipiDiProdotto) {
        tipiDiProdotto["mobili"] = "mobili";
        tipiDiProdotto["vestiti"] = "vestiti";
        tipiDiProdotto["musica"] = "musica";
        tipiDiProdotto["elettronica"] = "elettronica";
        tipiDiProdotto["viaggiare"] = "viaggiare";
        tipiDiProdotto["soundSystem"] = "sound-system";
        tipiDiProdotto["cerco"] = "cerco";
    })(tipiDiProdotto = Mercatino.tipiDiProdotto || (Mercatino.tipiDiProdotto = {}));
})(Mercatino || (Mercatino = {}));
export const appendTheseTo = (node) => (element) => node.appendChild(element);
export const setclassName = (name) => (e) => {
    e.className = name;
    return e;
};
export const setInnerText = (text) => (e) => {
    e.innerText = text;
    return e;
};
export const setStyleAttribute = (attribute) => (value) => (e) => {
    e.style[attribute] = value;
    return e;
};
export const debug = (color) => (isDebug) => (el) => {
    if (isDebug)
        setStyleAttribute("backgroundColor")(color)(el);
};
export const createElementWithId = (type) => (id) => {
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
export const createDivWithClassNameAndId = (id) => (classname) => {
    return setclassName(classname)(createElementWithId("div")(id));
};
/**
 * ```
 * const p1 = new UIDesign({ tag: "p", id: "my-p1", className: "flex rythm" });
 * const p2 = new UIDesign({ tag: "p", id: "my-p1", className: "flex rythm" });
 * const div2 = new UIDesign({ tag: "div", id: "my-div", className: "flex cont" });
 * const code = new UIDesign({ tag: "code", id: "", className: "asds" });
 *
 * const design = new UIDesign({
 *   tag: "div",
 *   className: "some",
 *   id: "myid",
 * });
 *
 * design.addChild(div2.addChild(p1).addChild(p2).addChild(code));
 * ```
 */
export class UIDesign {
    constructor(prop) {
        this.value = prop;
    }
    get uiNode() {
        const element = document.createElement(this.value.tag);
        element.id = this.value.id ? this.value.id : Dom.generateId();
        element.className = this.value.className;
        return new UINode(element);
    }
    addChild(value) {
        if (!this.children)
            this.children = [];
        this.children.push(value);
        return this;
    }
    get element() {
        const cb = (newNode) => (node) => {
            const stack = [node];
            const rootnode = newNode;
            while (stack.length) {
                const current = stack.pop();
                if (current) {
                    const children = current.children;
                    if (children) {
                        children.forEach((c) => {
                            rootnode.addChild(c.uiNode);
                            stack.push(c);
                        });
                    }
                }
            }
            return rootnode;
        };
        return build(cb(this.uiNode)(this));
    }
}
export class Product {
    constructor(prop) {
        _Product_prop.set(this, void 0);
        __classPrivateFieldSet(this, _Product_prop, prop, "f");
    }
    get element() {
        return Product.createProduct(__classPrivateFieldGet(this, _Product_prop, "f"));
    }
}
_Product_prop = new WeakMap();
(function (Product) {
    Product.createProduct = ({ dataTag, tags, title: t, description: d, alt, src, }) => {
        const product_ = new UIDesign({
            tag: "div",
            id: "product",
            className: "product",
        });
        const product = new UINode(createDivWithClassNameAndId("product")(`product`));
        const image = new UINode(createElementWithId("img")("product-image"));
        image.value.setAttribute("src", src);
        const description_container = new UINode(createDivWithClassNameAndId("description-container")(`description-container`));
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
})(Product || (Product = {}));
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
export const dfs = (cb) => (node) => {
    let stack = [node];
    let res = [];
    while (stack.length) {
        const current = stack.pop();
        res.push(current);
        if (current) {
            const children = current.children;
            if (children)
                cb(children, current, stack);
        }
    }
    return node.value;
};
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
export const build = dfs((children, current, stack) => {
    children.forEach((c) => {
        current.value.appendChild(c.value);
        stack.push(c);
    });
});
