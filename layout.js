import { App } from "./js/App.js";
import { UIDesign } from "./js/Dom.js";
import { prodotti } from "./db/prodotti.js";

const app = new App(window);
app.themeHandler = () => console.log("color theme changed");
app.orientationHandler = () => console.log("orientation changed");
console.log(app.requestProvider);

const makeTestata = () => {
  const header = new UIDesign({
    tag: "header",
    className: "bg flex",
  });
  const button = new UIDesign({
    tag: "button",
    className: "bg",
  }).setInnerText("WebLN");
  const subheader = new UIDesign({
    tag: "div",
    className: "bg sub-header",
  });
  const testata = new UIDesign({
    tag: "div",
    className: "bg testata",
  })
    .addChild(header)
    .addChild(subheader.addChild(button));
  return testata;
};

const makeProductContainer = () => {
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
    className: "bg",
  });
  const tagsDropdown = new UIDesign({
    tag: "div",
    className: "tags-dropdown",
  });

  const prdScroll = new UIDesign({
    tag: "div",
    id: "product-scroll",
    className: "product-scroll",
  }).addChild(
    tagsDropdown.addChild(
      select
        .addChild(all)
        .addChild(vestiti)
        .addChild(musica)
        .addChild(elettronica)
        .addChild(mobili)
        .addChild(viaggiare)
        .addChild(soundSys)
    )
  );
  for (let k in prodotti) {
    prdScroll.addChild(prodotti[k].tree);
  }
  const productContainer = new UIDesign({
    tag: "div",
    id: "product-container",
    className:
      "bg grid p_10 pb_0 pos_f top_100 box_bb ofy_a mh_100% w_100% b_1-s-rl ch_1",
  }).addChild(prdScroll);
  return productContainer;
};

const makefooter = () => {
  const setSourceAttributes = (source, src, type, title, artist) => {
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
    className: "bg",
  })
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
  const footerDesign = new UIDesign({
    tag: "footer",
    className: "footer bg box_bb p_5",
  })
    .addChild(musicplayerDesign)
    .addChild(groupChatDesign);
  return footerDesign;
};

const makechat = () => {
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
    className: "bg w_240 p_5",
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
    className: "mt_10 w_240 p_5 flex",
    id: "input-container p_5-10",
  });
  const chat = new UIDesign({
    tag: "div",
    id: "chatsection",
    className: "chatsection bg",
  })
    .addChild(closeIcon)
    .addChild(chatWindow)
    .addChild(inputContainer.addChild(input).addChild(button));
  return chat;
};

const body = document.getElementsByTagName("body").item(0);
const layout = document.getElementById("layout");
const bg_color = new UIDesign({ tag: "div", className: "color" });
layout.appendChild(bg_color.element);
const testataDesign = makeTestata();
const [header, subheader] = testataDesign.children;
const [weblnButton] = subheader.children;
weblnButton.element.addEventListener("click", app.requestProvider);
layout.appendChild(testataDesign.element);
const productContainer = makeProductContainer();
const [productScrollDesing] = productContainer.children;
const [tagsDropdown] = productScrollDesing.children;
const [selectDesign] = tagsDropdown.children;
layout.appendChild(productContainer.element);
const footerDesign = makefooter();
const [musicPlayer, groupChatDesign] = footerDesign.children;
const [musicPlayerDesign] = footerDesign.children;
const [
  audioPlayerDesing,
  trackTitleDesign,
  trackArtistDesign,
  playPauseBtnDesign,
  nextBtnDesign,
] = musicPlayerDesign.children;
layout.appendChild(footerDesign.element);
const chatDesing = makechat();
const [closeIconDesign, chatWindowDesign, inputContainerDesign] =
  chatDesing.children;
const [inputDesign, buttonsDesign] = inputContainerDesign.children;
body.appendChild(chatDesing.element);

const closeIcon = closeIconDesign.element;
const chatWindow = chatWindowDesign.element;
const messageInput = inputDesign.element;
const groupChat = groupChatDesign.element;
const chatSend = buttonsDesign.element;
const tagsSelect = selectDesign.element;

const chatSection = chatDesing.element;
// MUSIC PLAYER
const audioPlayer = audioPlayerDesing.element;
const trackTitle = trackTitleDesign.element;
const trackArtist = trackArtistDesign.element;
const playPauseButton = playPauseBtnDesign.element;
const nextButton = nextBtnDesign.element;
// styling
chatSection.style.display = "none";
body.className = "m_0 w_100vw h_100vh";

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

function closeChat() {
  chatSection.style.display = "none";
  layout.style.filter = "none";
  var footer = document.getElementsByClassName("footer")[0];
  footer.style.pointerEvents = "auto";
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

function createTextElement(messageText, messageInput) {
  var messageContainer = document.createElement("div");
  messageContainer.className = "bg_r_l p_10 mb_5";
  messageContainer.textContent = messageText;
  chatWindow.insertBefore(messageContainer, chatWindow.firstChild);
  messageInput.value = "";
}

function sendMessage() {
  var messageText = messageInput.value.trim();
  if (messageText !== "") {
    relay.messageInput = messageInput;
    relay.sendToRelay(undefined, messageText);
  }
}

function filterProducts() {
  var selectedTag = tagsSelect.value;
  var products = document.getElementsByClassName("product");
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var detailsElement = product.querySelector(".details");
    var tags = detailsElement.getAttribute("data-tags");

    if (selectedTag === "" || tags.includes(selectedTag)) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
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

async function handleOnLoad() {
  // closeIcon.onclick(() => {});
  console.log("loaded");

  // try {
  //   const webln = await globalThis.WebLN.requestProvider();

  //   console.log(webln);
  // } catch (err) {
  //   // Handle users without WebLN
  //   console.log(err);
  // }
  // Aggiunta event listener per l'evento keydown
  messageInput.addEventListener("keydown", function (event) {
    // Controllo se il tasto premuto è il tasto Invio (codice 13)
    if (event.keyCode === 13) sendMessage();
  });
}

relay.on(createTextElement);
app.onLoadHander = handleOnLoad;

closeIcon.addEventListener("click", closeChat);
groupChat.addEventListener("click", showChat);
chatSend.addEventListener("click", sendMessage);
tagsSelect.addEventListener("change", filterProducts);
playPauseButton.addEventListener("click", togglePlay);
nextButton.addEventListener("click", handleNextButtonClick);
