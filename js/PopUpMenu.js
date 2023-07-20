import { UIDesign } from "./Dom.js";
export class PopUpMenu {
    constructor(value) {
        this.value = value;
    }
    get tree() {
        return PopUpMenu.createpopupmenu();
    }
    get element() {
        return PopUpMenu.createpopupmenu().element;
    }
}
(function (PopUpMenu) {
    PopUpMenu.createpopupmenu = () => {
        const closeIcon = new UIDesign({
            tag: "div",
            id: "close-icon",
            className: "pos_a top_10 r_10 cu_p",
        }).setInnerText("✖︎");
        const chatWindow = new UIDesign({
            tag: "div",
            id: "chat-window",
            className: "bg w_300 h_400 flex-cr of_a b_1-s-rl",
        });
        const input = new UIDesign({
            tag: "input",
            id: "messageInput",
            className: "bg_gl c_l b_n w_240 p_5",
        })
            .setHtmlAttribute("type", "text")
            .setHtmlAttribute("placeholder", "Scrivi un messaggio...");
        const button = new UIDesign({
            tag: "button",
            id: "chat-send",
            className: "bg p_5-10",
        }).setInnerText("Invia");
        const inputContainer = new UIDesign({
            tag: "div",
            className: "mt_10 w_240 p_5-10 flex",
            id: "input-container",
        });
        const popUpMenu = new UIDesign({
            tag: "div",
            id: "pop-up-menu",
            className: "pop-up-menu bg",
        })
            .addChild(closeIcon)
            .addChild(chatWindow)
            .addChild(inputContainer.addChild(input).addChild(button));
        return popUpMenu;
    };
})(PopUpMenu || (PopUpMenu = {}));
