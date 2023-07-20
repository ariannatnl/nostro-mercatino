import { UIDesign } from "./Dom.js";
export class Content {
    constructor(value) {
        this.value = value;
    }
    get tree() {
        return Content.createContent(this.value.prodotti);
    }
    get element() {
        return Content.createContent(this.value.prodotti).element;
    }
}
(function (Content) {
    Content.createContent = (prodotti) => {
        const makeOption = (value, text) => {
            const option = new UIDesign({
                tag: "option",
                className: "bg",
            })
                .setInnerText(text)
                .setHtmlAttribute("value", value);
            return option;
        };
        const all = makeOption("", "#All-tags");
        const vestiti = makeOption("vestiti", "#vestiti");
        const musica = makeOption("musica", "#musica");
        const elettronica = makeOption("elettronica", "#elettronica");
        const mobili = makeOption("mobili", "#mobili");
        const viaggiare = makeOption("viaggiare", "#viaggiare");
        const soundSys = makeOption("soundsystem", "#soundsystem");
        const select = new UIDesign({
            tag: "select",
            id: "tags-select",
            className: "bg_t",
        });
        const tagsDropdown = new UIDesign({
            tag: "div",
            className: "tags-dropdown",
        });
        const prdScroll = new UIDesign({
            tag: "div",
            id: "product-scroll",
            className: "product-scroll",
        });
        for (let k in prodotti) {
            prdScroll.addChild(prodotti[k].tree);
        }
        const productContainer = new UIDesign({
            tag: "div",
            id: "product-container",
            className: "bg grid p_10 pb_0 pos_f top_100 box_bb ofy_a mh_100% w_100% ch_1",
        })
            .addChild(tagsDropdown.addChild(select
            .addChild(all)
            .addChild(vestiti)
            .addChild(musica)
            .addChild(elettronica)
            .addChild(mobili)
            .addChild(viaggiare)
            .addChild(soundSys)))
            .addChild(prdScroll);
        return productContainer;
    };
})(Content || (Content = {}));
