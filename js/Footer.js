import { UIDesign } from "./Dom.js";
export class Footer {
    constructor(value) {
        this.value = value;
    }
    get tree() {
        return Footer.createfooter();
    }
    get element() {
        return Footer.createfooter().element;
    }
}
(function (Footer) {
    Footer.createfooter = () => {
        const setSourceAttributes = (source, src, type, title, artist) => {
            source.setHtmlAttribute("src", src);
            source.setHtmlAttribute("type", type);
            source.setHtmlAttribute("track-title", title);
            source.setHtmlAttribute("track-artist", artist);
            return source;
        };
        const source1 = new UIDesign({ tag: "source", className: "bg" });
        setSourceAttributes(source1, "https://ipfs.io/ipfs/QmVEQavd4Qx31QMRGpWo5bjxFEi27NDs6uWGdNzT27PriR?filename=Gotek%20-%20Tutti%20Fatti.mp3", "audio/mpeg", "Gotek%20-%20Tutti%20Fatti", "Gotek");
        const source2 = new UIDesign({ tag: "source", className: "bg" });
        setSourceAttributes(source2, "https://ipfs.io/ipfs/QmUKNhjXbM2X4h8ZzEq12JFCntKCKYAnk4qfU6NQr2soxG?filename=Hit%20The%20Road%20Jack.mp3", "audio/mpeg", "Hit%20The%20Road%20Jack", "Gotek");
        const source3 = new UIDesign({ tag: "source", className: "bg" });
        setSourceAttributes(source3, "https://ipfs.io/ipfs/QmWXq8zW9XBH8C8VrHQj7zgsd8jUnARqqoE55ytKiKBq8c?filename=Pappa.mp3", "audio/mpeg", "Pappa", "Gotek");
        const audioPlayerDesign = new UIDesign({
            tag: "audio",
            id: "audio-player",
            className: "bg",
        })
            // @ts-expect-error
            .setHtmlAttribute("controls")
            .setInnerText("Your browser does not support the audio tag.");
        const trackTitleDesign = new UIDesign({
            tag: "h2",
            id: "track-title",
            className: "bg",
        });
        const trackArtistDesign = new UIDesign({
            tag: "p",
            id: "track-artist",
            className: "bg",
        });
        const playPauseBtnDesign = new UIDesign({
            tag: "button",
            id: "play-pause-button",
            className: "bg_l c_d",
            // @ariannatnl non so come si usa questa string
        }).setInnerText("▶︎");
        const nextBtnDesign = new UIDesign({
            tag: "button",
            id: "next-button",
            className: "bg_l c_d",
        }).setInnerText("Next");
        const musicplayerDesign = new UIDesign({
            tag: "div",
            className: "music-player",
        })
            .addChild(audioPlayerDesign.addChild(source1).addChild(source2).addChild(source3))
            .addChild(trackTitleDesign)
            .addChild(trackArtistDesign)
            .addChild(playPauseBtnDesign)
            .addChild(nextBtnDesign);
        const groupChatDesign = new UIDesign({
            tag: "button",
            className: "bg_l c_d h_fc as_c",
            id: "group-chat",
        }).setInnerText("chat");
        const footerDesign = new UIDesign({
            tag: "footer",
            className: "footer bg box_bb p_5",
        })
            .addChild(musicplayerDesign)
            .addChild(groupChatDesign);
        return footerDesign;
    };
})(Footer || (Footer = {}));
