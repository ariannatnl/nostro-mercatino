import { UIDesign, Node } from "./Dom.js";

export interface iPopUpMenu {}
export class PopUpMenu implements Node<iPopUpMenu> {
  constructor(public value: iPopUpMenu) {}

  get tree() {
    return PopUpMenu.createpopupmenu();
  }
  get element() {
    return PopUpMenu.createpopupmenu().element;
  }
}
export namespace PopUpMenu {
  export const createpopupmenu = () => {
    const closeIcon = new UIDesign({
      tag: "div",
      id: "close-icon",
      className: "close-icon",
    }).setInnerText("✖︎");
    const chatWindow = new UIDesign({
      tag: "div",
      id: "chat-window",
      className: "chat-window bg",
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
}
