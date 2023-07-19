import { UIDesign } from "./Dom.js";
export class Product {
    constructor(prop) {
        this.value = prop;
    }
    get tree() {
        return Product.createProduct(this.value);
    }
    get element() {
        return Product.createProduct(this.value).element;
    }
}
(function (Product) {
    Product.createProduct = ({ dataTag, tags, title: t, description: d, alt, src, }) => {
        const product_ = new UIDesign({
            tag: "div",
            id: "product",
            className: "b_1-s-rl flex flex-column p_10 bg ai_c mb_10 brad_4",
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
                className: "brad_5 bg_lightGreen p_2 mt_0 mr_3 mb_3 ml_0 c_d",
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
            .addChild(description_container_
            .addChild(details_)
            .addChild(title_.addChild(h2))
            .addChild(description_));
        return tree;
    };
})(Product || (Product = {}));