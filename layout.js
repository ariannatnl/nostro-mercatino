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
  console.log("ci sono");
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
    Array.from(sources).findIndex((source) => source.src === currentSource) + 1;
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
  playPauseButton.innerHTML = "&#10074;&#10074;"; // Simbolo di pausa
}

class RelayMock {
  subscribers = [];
  message;
  messageInput;
  sendToRelay(pubKey, message, signature) {
    this.message = message;
    this.emit();
  }
  emit() {
    this.subscribers.forEach((e) => {
      e(this.message, this.messageInput);
    });
  }
  on(subscriber) {
    this.subscribers.push(subscriber);
  }
}
const relay = new RelayMock();

let pubkey;
const getkey = async () => {
  setTimeout(async () => {
    pubkey = await window.nostr.getPublicKey();
    console.log(pubkey);
    App.Relay.Socket.startSocket({
      open: App.Relay.openHandler,
      message: App.Relay.messageHandler((prop) => {
        console.log(prop);
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
    const className = "flex bg_bl c_d p_10 mb_5 ml_80 brad_5-5-0-5 jc_e";
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
  chatWindow.insertBefore(newmessageContainer.element, chatWindow.firstChild);
  messageInput.value = "";
}

const app = new App({ window: window });
app.on("themeChange", () => console.log("color theme changed"));
app.on("orientationChange", () => console.log("orientation changed"));
app.on("requestedProvider", () => console.log("provider requested"));

app.on("load", (app) => {
  console.log("loaded");
  const iffee = (condition, cb) => {
    if (condition) cb();
  };
  app.requestProvider();
  const keydownHandler = (event) => iffee(event.keyCode === 13, sendMessage);
  messageInput.addEventListener("keydown", keydownHandler);
});

app.on("no-provider", (app) => {
  console.log(app);
});

const bg_color = new UIDesign({
  tag: "div",
  className: "pos_a top_0 w_100% h_100% bg_prim",
});
app.appendTo("layout", bg_color.element);

// testata
const testataDesign = new Testata().tree;
if (!testataDesign.children) throw new Error("no header");
const [header, subheader] = testataDesign.children;
if (!subheader.children) throw new Error("no header");
const [weblnButton] = subheader.children;
app.on("got-provider", () => {
  console.log("got provider");
  weblnButton.setInnerText("yeeeee");
});
weblnButton.element.addEventListener("click", app.requestProvider);
app.appendTo("layout", testataDesign.element);

// prodcontainer
const productContainer = new Content({ prodotti }).tree;
if (!productContainer.children) throw new Error("no header");
const [tagsDropdown, productScrollDesing] = productContainer.children;
if (!tagsDropdown.children) throw new Error("no header");
const [selectDesign] = tagsDropdown.children;
const productScroll = productScrollDesing.element;
app.appendTo("layout", productContainer.element);

//
const footerDesign = new Footer().tree;
if (!footerDesign.children) throw new Error("no header");
const [musicPlayerDesign, buttonContainer] = footerDesign.children;
if (!buttonContainer.children) throw new Error("no buttoncontainer");
const [groupChatDesign] = buttonContainer.children;
if (!musicPlayerDesign.children) throw new Error("no header");
const [
  audioPlayerDesing,
  trackTitleDesign,
  trackArtistDesign,
  playPauseBtnDesign,
  nextBtnDesign,
] = musicPlayerDesign.children;
app.appendTo("layout", footerDesign.element);
const popUpMenuDesign = new PopUpMenu().tree;
if (!popUpMenuDesign.children) throw new Error("no header");
const [closeIconDesign, chatWindowDesign, inputContainerDesign] =
  popUpMenuDesign.children;
if (!inputContainerDesign.children) throw new Error("no header");
const [inputDesign, buttonsDesign] = inputContainerDesign.children;
app.appendTo("body", popUpMenuDesign.element);
app.setBodyClassName("m_0 w_100vw h_100vh");

const closeIcon = closeIconDesign.element;
const chatWindow = chatWindowDesign.element;
const messageInput = inputDesign.element;
const groupChat = groupChatDesign.element;
const chatSend = buttonsDesign.element;
const tagsSelect = selectDesign.element;

const chatSection = popUpMenuDesign.element;
// MUSIC PLAYER
const audioPlayer = audioPlayerDesing.element;
const trackTitle = trackTitleDesign.element;
const trackArtist = trackArtistDesign.element;
const playPauseButton = playPauseBtnDesign.element;
const nextButton = nextBtnDesign.element;
// styling
chatSection.style.display = "none";

relay.on(createTextElement);
// app.onLoadHander = handleOnLoad;

const minWidth768Handler = (_, data) => {
  const DEF_CLASS = "flex flex-column flex-wrap ac_c";
  const LARGE_CLASS = "flex flex-row flex-nowrap of_xa";
  if (data.matches) productScroll.className = LARGE_CLASS;
  else productScroll.className = DEF_CLASS;
  console.log(productScroll.className);
};
app.on("minWidth768Change", minWidth768Handler);
minWidth768Handler(undefined, app.minWidth768Query);

closeIcon.addEventListener("click", closeChat);
groupChat.addEventListener("click", showChat);
chatSend.addEventListener("click", sendMessage);
tagsSelect.addEventListener("change", filterProducts);
playPauseButton.addEventListener("click", togglePlay);
nextButton.addEventListener("click", handleNextButtonClick);
