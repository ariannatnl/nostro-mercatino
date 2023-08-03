import { UIDesign } from "./js/Dom.js";
import { Testata } from "./js/Testata.js";
import { Content } from "./js/Content.js";
import { Footer } from "./js/Footer.js";
import { PopUpMenu } from "./js/PopUpMenu.js";
import { App } from "./js/App.js";
import { prodotti } from "./db/prodotti.js";

function closeChat() {
  chatSection.style.display = "none";
  layout.style.filter = "none";
  var footer = document.getElementsByClassName("footer")[0];
  footer.style.pointerEvents = "auto";
}

function showChat() {
  chatSection.style.display = "flex";

  var layout = document.getElementsByClassName("layout")[0];
  if (window.innerWidth <= 768) {
    layout.style.filter = "blur(5px)";
  }
  var footer = document.getElementsByClassName("footer")[0];
  footer.style.pointerEvents = "none";
}

function sendMessage(props) {
  if (props) {
  } else {
    var messageText = messageInput.value.trim();
    if (messageText !== "") {
      relay.messageInput = messageInput;
      relay.sendToRelay(undefined, messageText);
    }
  }
}

function filterProducts() {
  console.log("changed");
  var selectedTag = tagsSelect.value;
  var products = document.querySelectorAll("#product");
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var detailsElement = product.querySelector("#details");
    var tags = detailsElement.getAttribute("data-tags");

    if (!tags.includes(selectedTag)) {
      product.style.display = "none";
    } else {
      product.style.display = "flex";
    }
  }
}

const togglePlay = () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.innerHTML = "&#10074;&#10074;"; // Simbolo di pausa
  } else {
    audioPlayer.pause();
    playPauseButton.innerHTML = "&#9658;"; // Simbolo di play
  }
};

function handleNextButtonClick() {
  const currentSource = audioPlayer.currentSrc;
  const sources = audioPlayer.getElementsByTagName("source");
  let nextIndex =
    Array.from(sources).findIndex(
      (source) => source.src === currentSource
    ) + 1;
  if (nextIndex >= sources.length) {
    nextIndex = 0;
  }
  const nextSource = sources[nextIndex];
  audioPlayer.src = nextSource.src;
  trackTitle.textContent = decodeURIComponent(
    nextSource.getAttribute("track-title")
  );
  trackArtist.textContent = decodeURIComponent(
    nextSource.getAttribute("track-artist")
  );
  audioPlayer.play();
  playPauseButton.innerHTML = "&#10074;&#10074;";
}

let pubkey;
const getkey = async () => {
  setTimeout(async () => {
    pubkey = await window.nostr.getPublicKey();
    console.log(`user connected: ${pubkey.slice(0, 8)}..`);
    App.Relay.Socket.startSocket({
      open: App.Relay.openHandler,
      message: App.Relay.messageHandler((prop) => {
        prop.forEach((e) => {
          createTextElement(e.content, e.type);
        });
      })(pubkey),
    });
  }, 1000);
};
if (window.nostr) {
  getkey();
} else {
  console.log("no nostr");
}

function createTextElement(messageText, usertype) {
  var usericon = new UIDesign({
    tag: "div",
    id: "user-icon",
  });
  usericon.setClassName("bg mw_1.rem h_1.5rem brad_100% m_02rem");
  var text = new UIDesign({
    tag: "p",
    id: "message-text",
    className: "m_0 c_d",
  }).setInnerText(messageText);
  const newmessageContainer = new UIDesign({
    tag: "div",
    id: "message-container",
  });
  var messageContainer = document.createElement("div");
  if (usertype === "user") {
    const className =
      "flex bg_bl c_d p_10 mb_5 ml_80 brad_5-5-0-5 jc_e";
    messageContainer.className = className;
    newmessageContainer.addChild(text).setClassName(className);
  } else {
    const className = "flex bg_vl c_d p_10 mb_5 mr_80 brad_0-5-5-5";
    messageContainer.className = className;
    newmessageContainer
      .addChild(usericon)
      .addChild(text)
      .setClassName(className);
  }
  messageContainer.textContent = messageText;
  chatWindow.insertBefore(
    newmessageContainer.element,
    chatWindow.firstChild
  );
  messageInput.value = "";
}

const app = new App({
  window: window,
  nodeslist: UIDesign.nodeslist,
});
console.log(UIDesign.nodeslist);

const bg_color = new UIDesign({
  tag: "div",
  id: "color",
  className: "pos_a top_0 w_100% h_100% bg_prim",
});
app.appendTo("layout", bg_color.element);
app.setBodyClassName("m_0 w_100vw h_100vh");

app.on("themeChange", () => console.log("color theme changed"));
app.on("orientationChange", () =>
  console.log("orientation changed")
);
app.on("requestedProvider", () =>
  console.log("provider requested")
);
app.get();
app.on("load", (app) => {
  console.log("loaded");
  const iffee = (condition, cb) => {
    if (condition) cb();
  };
  app.requestProvider();
  const keydownHandler = (event) =>
    iffee(event.keyCode === 13, sendMessage);
  messageInput.addEventListener("keydown", keydownHandler);
});

app.on("no-provider", () => {
  const closeIcon = new UIDesign({
    tag: "div",
    id: "close-icon",
    className: "pos_a top_10 r_10 cu_p",
  }).setInnerText("✖︎");
  const logInWindow = new UIDesign({
    tag: "div",
    id: "chat-window",
    className: "chat-window bg",
  });
  const textLogIn = new UIDesign({
    tag: "div",
    id: "text-login",
    className: "text-login",
  }).setInnerText(
    "Our chat is created on an open protocol, named “Nostr”, a new kind of censorship-resistant social networksUsers can identify themselves  on every Nostr apps with their private and public key. The Alby Extension  just helps you to conveniently manage your private key and to interact with other users acrossthe network instead of handing it over to web apps. Get now your access to open web =>"
  );

  closeIcon.element.addEventListener("click", closeChat);
  popUpMenuDesign.children.forEach((e) => e.element.remove());
  popUpMenuDesign.children = [];
  popUpMenuDesign.uiNode.children = [];
  popUpMenuDesign.addChild(closeIcon);
  // popUpMenu.addChild();
});
// testata
const testataDesign = new Testata().tree;

const weblnButton = app.get("testata/sub-header/webln-btn");
app.on("got-provider", () => {
  console.log("got provider");
  weblnButton.setInnerText("yeeeee");
});
weblnButton.element.addEventListener("click", app.requestProvider);
app.appendTo("layout", testataDesign.element);

// prodcontainer
const productContainer = new Content({ prodotti }).tree;
const productScroll = app.get(
  "product-container/product-scroll"
).element;
app.appendTo("layout", productContainer.element);

//
new Footer().tree;
const footerDesign = app.get("footer");
app.appendTo("layout", footerDesign.element);

new PopUpMenu().tree;
const popUpMenuDesign = app.get("pop-up-menu");
app.appendTo("body", popUpMenuDesign.element);

const closeIconPath = "pop-up-menu/close-icon";
const closeIcon = app.get(closeIconPath).element;
const chatWindowPath = "pop-up-menu/chat-window";
const chatWindow = app.get(chatWindowPath).element;
const inputDesignPath = "pop-up-menu/input-container";
const messageInput = app.get(inputDesignPath).element;
const groupChatDesignPath = "footer/button-container";
const groupChat = app.get(groupChatDesignPath).element;
const buttonsDesignPath = "pop-up-menu/input-container/chat-send";
const chatSend = app.get(buttonsDesignPath).element;
const selectDesignPath =
  "product-container/tags-dropdown/tags-select";
const tagsSelect = app.get(selectDesignPath).element;

const chatSection = popUpMenuDesign.element;
// MUSIC PLAYER
const audioPlayerPath = "footer/music-player/audio-player";
const audioPlayer = app.get(audioPlayerPath).element;
const trackTitleDesignPath = "footer/music-player/track-title";
const trackTitle = app.get(trackTitleDesignPath).element;
const trackArtistDesignPath = "footer/music-player/track-artist";
const trackArtist = app.get(trackArtistDesignPath).element;
const playPauseBtnDesignPath =
  "footer/music-player/play-pause-button";
const playPauseButton = app.get(playPauseBtnDesignPath).element;
const nextBtnDesignPath = "footer/music-player/next-button";
const nextButton = app.get(nextBtnDesignPath).element;
// styling

const minWidth768Handler = (_, data) => {
  const LARGE_CLASS = "flex flex-row flex-nowrap of_xa";
  const DEF_CLASS = "flex flex-column flex-wrap ac_c";
  if (data.matches) productScroll.className = LARGE_CLASS;
  else productScroll.className = DEF_CLASS;
  //
  setTimeout(() => {
    const popUpMenuClassBig =
      "flex flex-column bg w_100% h_100% pos_a top_0 p_20 bkdf_blur-5 box_bb jc_c ai_c";
    const popUpMenuClassSmall =
      "flex flex-column bg w_100% h_100% pos_a top_0 p_20 jc_c ai_c bottom_20 r_20 z_9999 bkdf_blur-5";
    if (data.matches)
      popUpMenuDesign.element.className = popUpMenuClassBig;
    else popUpMenuDesign.element.className = popUpMenuClassBig;
  }, 200);
};
app.on("minWidth768Change", minWidth768Handler);
minWidth768Handler(undefined, app.minWidth768Query);

closeIcon.addEventListener("click", closeChat);
groupChat.addEventListener("click", showChat);
chatSend.addEventListener("click", sendMessage);
tagsSelect.addEventListener("change", filterProducts);
playPauseButton.addEventListener("click", togglePlay);
nextButton.addEventListener("click", handleNextButtonClick);
