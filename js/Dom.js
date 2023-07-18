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
