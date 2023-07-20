import { UIDesign } from "./Dom.js";
export class PopUpLogIn {
    constructor(value) {
        this.value = value;
    }
    get tree() {
        return PopUpLogIn.createpopupLogIn();
    }
    get element() {
        return PopUpLogIn.createpopupLogIn().element;
    }
}
(function (PopUpLogIn) {
    PopUpLogIn.createpopupLogIn = () => {
        const closeIcon = new UIDesign({
            tag: "div",
            id: "close-icon",
            className: "close-icon",
        }).setInnerText("✖︎");
        const logInWindow = new UIDesign({
            tag: "div",
            id: "chat-window",
            className: "chat-window bg",
        });
        const popUpLogIn = new UIDesign({
            tag: "div",
            id: "pop-up-menu",
            className: "pop-up-menu bg",
        })
            .addChild(closeIcon)
            .addChild(logInWindow);
        return popUpLogIn;
    };
})(PopUpLogIn || (PopUpLogIn = {}));
// Our chat is created on an open protocol, named “Nostr”, a new kind of censorship-resistant social networks.
// Users can identify themselves  on every Nostr apps with their private and public key.
// The Alby Extension  just helps you to conveniently manage your private key and to interact with other users across
// the network instead of handing it over to web apps.
// 	Get now your access to open web =>
