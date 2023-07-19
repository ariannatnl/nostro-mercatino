type woo = string &
  ((property: string) => string) &
  ((property: string) => string) &
  ((index: number) => string) &
  ((property: string) => string) &
  ((
    property: string,
    value: string | null,
    priority?: string | undefined
  ) => void);

export namespace Dom {
  export const generateId = () =>
    `9x${(
      BigInt(Math.round(Math.random() * 10 ** 16)) *
      BigInt(Math.round(Math.random() * 10 ** 16))
    )
      .toString(16)
      .slice(0, 16)}`;

  export enum css_attributes_codes {
    position = "pos",
    width = "w",
    height = "h",
    max_height = "mh",
    calculated_height = "ch",

    overflow = "of",
    padding = "p",
    padding_top = "pt",
    padding_right = "pr",
    padding_bottom = "pb",
    padding_left = "pl",

    margin = "m",
    margin_top = "mt",
    margin_right = "mr",
    margin_bottom = "mb",
    margin_left = "ml",

    border = "b",
    border_top = "bt",
    border_right = "br",
    border_bottom = "bb",
    border_left = "bl",

    border_radius = "brad",

    box_sizing = "box",
  }
}

export namespace Mercatino {
  export enum tipiDiProdotto {
    mobili = "mobili",
    vestiti = "vestiti",
    musica = "musica",
    elettronica = "elettronica",
    viaggiare = "viaggiare",
    soundSystem = "sound-system",
    cerco = "cerco",
  }
}

export const appendTheseTo = (node: HTMLElement) => (element: HTMLElement) =>
  node.appendChild(element);
export const setclassName = (name: string) => (e: HTMLElement) => {
  e.className = name;
  return e;
};
export const setInnerText = (text: string) => (e: HTMLElement) => {
  e.innerText = text;
  return e;
};
export const setHtmlAttribute =
  (attribute: string) => (value: string) => (el: HTMLElement) => {
    el.setAttribute(attribute, value);
    return el;
  };
export const setStyleAttribute =
  (attribute: keyof Omit<HTMLElement["style"], "length" | "parentRule">) =>
  (value: woo) =>
  (e: HTMLElement) => {
    e.style[attribute] = value;
    return e;
  };
export const debug =
  (color: woo) => (isDebug: boolean) => (el: HTMLElement) => {
    if (isDebug) setStyleAttribute("backgroundColor")(color)(el);
  };

export const createElementWithId =
  (type: keyof HTMLElementTagNameMap) => (id: string) => {
    const element = document.createElement(type);
    element.id = id;
    return element;
  };

export const createPWithText = (text: string) => {
  return setInnerText(text)(document.createElement("p"));
};
export const createDivWithClassName = (classname: string) => {
  return setclassName(classname)(document.createElement("div"));
};
export const createDivWithClassNameAndId =
  (id: string) => (classname: string) => {
    return setclassName(classname)(createElementWithId("div")(id));
  };

interface Node<T> {
  value: T;
  children?: Node<T>[];
}
export interface iUIDesign {
  tag: keyof HTMLElementTagNameMap;
  id?: string;
  className: string;
}
export interface UIDesign extends Node<iUIDesign> {}
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
export class UIDesign implements Node<iUIDesign> {
  #element;
  uiNode: UINode;
  constructor(prop: iUIDesign) {
    this.value = prop;
    this.#element = document.createElement(this.value.tag);
    this.#element.id = this.value.id ? this.value.id : Dom.generateId();
    this.#element.className = this.value.className;
    this.uiNode = new UINode(this.#element);
  }

  addChild(value: UIDesign) {
    if (!this.children) this.children = [];
    this.children.push(value);
    return this;
  }
  setInnerText(text: string) {
    setInnerText(text)(this.element);
    return this;
  }
  setHtmlAttribute(attribute: string, value: string) {
    setHtmlAttribute(attribute)(value)(this.element);
    return this;
  }
  get element() {
    const cb =
      <T extends UINode>(newNode: T) =>
      (node: UIDesign) => {
        const stack = [node];
        const rootnode = newNode;
        while (stack.length) {
          const current = stack.pop();
          if (current) {
            const children = current.children as UIDesign[];
            if (children) {
              children.forEach((c) => {
                current.uiNode.addChild(c.uiNode);
                stack.push(c as UIDesign);
              });
            }
          }
        }
        return rootnode;
      };

    return build(cb(this.uiNode)(this));
  }
}

export interface iProduct {
  src: string;
  dataTag: string;
  tags: string[];
  title: string;
  description: string;
  alt?: string;
}
export class Product {
  #prop: iProduct;
  constructor(prop: iProduct) {
    this.#prop = prop;
  }
  get tree() {
    return Product.createProduct(this.#prop);
  }
  get element() {
    return Product.createProduct(this.#prop).element;
  }
}
export namespace Product {
  export const createProduct = ({
    dataTag,
    tags,
    title: t,
    description: d,
    alt,
    src,
  }: iProduct) => {
    const product_ = new UIDesign({
      tag: "div",
      id: "product",
      className: "product",
    });

    const image_ = new UIDesign({
      tag: "img",
      className: "product-image",
    }).setHtmlAttribute("src", src);

    const description_container_ = new UIDesign({
      tag: "div",
      className: "description-container",
      id: "description-container",
    });

    const details_ = new UIDesign({
      tag: "div",
      className: "details flex-wrap",
    }).setHtmlAttribute("data-tags", dataTag);

    tags
      .map((t) => {
        const tag = new UIDesign({
          tag: "p",
          className: "brad_5 bg_lightGreen p_2 mt_0 mr_3 mb_3 ml_0",
        }).setInnerText(t);
        return tag;
      })
      .forEach((n) => {
        details_.addChild(n);
      });

    const title_ = new UIDesign({
      tag: "div",
      className: "title",
    });

    const h2 = new UIDesign({
      tag: "h2",
      className: "mt_0 mr_3 mb_0 ml_0",
    }).setInnerText(t);

    const description_ = new UIDesign({
      tag: "div",
      className: "description",
    }).setInnerText(d);

    const tree = product_
      .addChild(image_)
      .addChild(
        description_container_
          .addChild(details_)
          .addChild(title_.addChild(h2))
          .addChild(description_)
      );

    return tree;
  };
}

export interface UINode {
  value: HTMLElement;
  children?: UINode[];
}
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
  constructor(public value: HTMLElement) {
    this.children = undefined;
  }
  addChild(value: UINode) {
    if (!this.children) this.children = [];
    this.children.push(value);
    return this;
  }
}

export const dfs =
  <T extends Node<any>>(cb: (children: T[], current: T, stack: T[]) => void) =>
  (node: T): HTMLElement => {
    let stack = [node];
    let res = [];
    while (stack.length) {
      const current = stack.pop();
      res.push(current);
      if (current) {
        const children = current.children;
        if (children) cb(children as T[], current, stack);
      }
    }
    return node.value;
  };

interface build {
  (node: UINode): HTMLElement;
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
export const build: build = dfs<UINode>((children, current, stack) => {
  children.forEach((c) => {
    current.value.appendChild(c.value);
    stack.push(c);
  });
});
