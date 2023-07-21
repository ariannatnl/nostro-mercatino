import { UIDesign, Node } from "./Dom.js";

export interface iFooter {}
export class Footer implements Node<iFooter> {
  constructor(public value: iFooter) {}

  get tree() {
    return Footer.createfooter();
  }
  get element() {
    return Footer.createfooter().element;
  }
}
export namespace Footer {
  export const createfooter = () => {
    const setSourceAttributes = (
      source: UIDesign,
      src: string,
      type: string,
      title: string,
      artist: string
    ) => {
      source.setHtmlAttribute("src", src);
      source.setHtmlAttribute("type", type);
      source.setHtmlAttribute("track-title", title);
      source.setHtmlAttribute("track-artist", artist);
      return source;
    };
    const source1 = new UIDesign({ tag: "source", className: "bg" });
    setSourceAttributes(
      source1,
      "https://ipfs.io/ipfs/QmVEQavd4Qx31QMRGpWo5bjxFEi27NDs6uWGdNzT27PriR?filename=Gotek%20-%20Tutti%20Fatti.mp3",
      "audio/mpeg",
      "Gotek%20-%20Tutti%20Fatti",
      "Gotek"
    );
    const source2 = new UIDesign({ tag: "source", className: "bg" });
    setSourceAttributes(
      source2,
      "https://ipfs.io/ipfs/QmUKNhjXbM2X4h8ZzEq12JFCntKCKYAnk4qfU6NQr2soxG?filename=Hit%20The%20Road%20Jack.mp3",
      "audio/mpeg",
      "Hit%20The%20Road%20Jack",
      "Gotek"
    );
    const source3 = new UIDesign({ tag: "source", className: "bg" });
    setSourceAttributes(
      source3,
      "https://ipfs.io/ipfs/QmWXq8zW9XBH8C8VrHQj7zgsd8jUnARqqoE55ytKiKBq8c?filename=Pappa.mp3",
      "audio/mpeg",
      "Pappa",
      "Gotek"
    );
    const audioPlayerDesign = new UIDesign({
      tag: "audio",
      id: "audio-player",
      className: "bg l_-9999 pos_a",
    })
      // @ts-expect-error
      .setHtmlAttribute("controls")
      .setInnerText("Your browser does not support the audio tag.");
    const trackTitleDesign = new UIDesign({
      tag: "h2",
      id: "track-title",
      className: "bg m_10-0",
    });
    const trackArtistDesign = new UIDesign({
      tag: "p",
      id: "track-artist",
      className: "bg m_10-0",
    });
    const playPauseBtnDesign = new UIDesign({
      tag: "button",
      id: "play-pause-button",
      className: "bg_l c_d m_10-0",
      // @ariannatnl non so come si usa questa string
    }).setInnerText("▶︎");
    const nextBtnDesign = new UIDesign({
      tag: "button",
      id: "next-button",
      className: "bg_l c_d",
    }).setInnerText("Next");
    const musicplayerDesign = new UIDesign({
      tag: "div",
      className:
        "l_-9999 flex flex-row w_wkfa ai_c jc_sb p_0-20 b_1-s-rl brad_4",
    })
      .addChild(
        audioPlayerDesign.addChild(source1).addChild(source2).addChild(source3)
      )
      .addChild(trackTitleDesign)
      .addChild(trackArtistDesign)
      .addChild(playPauseBtnDesign)
      .addChild(nextBtnDesign);
    const groupChatDesign = new UIDesign({
      tag: "button",
      className: "bg_l c_d h_fc as_c",
      id: "group-chat",
    }).setInnerText("chat");
    const buttonContainer = new UIDesign({
      tag: "div",
      id: "buttonContainer",
      className: "bg p_0-20 flex",
    });
    const footerDesign = new UIDesign({
      tag: "footer",
      className: "footer h_footer bg box_bb p_0-20",
    })
      .addChild(musicplayerDesign)
      .addChild(buttonContainer.addChild(groupChatDesign));
    return footerDesign;
  };
}
