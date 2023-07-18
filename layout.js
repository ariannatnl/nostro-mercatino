import {
  build,
  UINode,
  createDivWithClassName,
  createElementWithId,
  Product,
  UIDesign,
} from "./js/Dom.js";
export {};

const p1 = new UIDesign({ tag: "p", id: "my-p1", className: "flex rythm" });
const p2 = new UIDesign({ tag: "p", id: "my-p1", className: "flex rythm" });
const div2 = new UIDesign({ tag: "div", id: "my-div", className: "flex cont" });
const div3 = new UIDesign({ tag: "div", id: "my-div", className: "flex cont" });
const p4 = new UIDesign({ tag: "p", id: "my-p1", className: "flex rythm" });
const code = new UIDesign({ tag: "code", id: "", className: "asds" });
const design = new UIDesign({
  tag: "div",
  className: "some",
  id: "myid",
});
design.addChild(
  div2.addChild(p1).addChild(p2).addChild(code).addChild(div3.addChild(p4))
);
console.log(design.element);

const makeTestata = () => {
  const header = new UIDesign({
    tag: "header",
    className: "flex",
  });
  const subheader = new UIDesign({
    tag: "div",
    className: "sub-header",
  });
  const testata = new UIDesign({
    tag: "div",
    className: "testata",
  })
    .addChild(header)
    .addChild(subheader);
  return testata.element;
};

const makeProductScroll = () => {
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
  return prdScroll.element;
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
    className: "bg",
    // @ariannatnl non so come si usa questa string
  }).setInnerText("▶︎");
  const nextBtnDesign = new UIDesign({
    tag: "button",
    id: "next-button",
    className: "bg",
  }).setInnerText("Next");
  const musicplayerDesign = new UIDesign({
    tag: "div",
    className: "music-player",
  });
  const groupChatDesign = new UIDesign({
    tag: "button",
    className: "group-chat",
    id: "group-chat",
  });
  const footerDesign = new UIDesign({
    tag: "footer",
    className: "footer",
  })
    .addChild(
      musicplayerDesign
        .addChild(
          audioPlayerDesign
            .addChild(source1)
            .addChild(source2)
            .addChild(source3)
        )
        .addChild(trackTitleDesign)
        .addChild(trackArtistDesign)
        .addChild(playPauseBtnDesign)
        .addChild(nextBtnDesign)
    )
    .addChild(groupChatDesign);
  return footerDesign.element;
};
const layout = document.getElementById("layout");
const productContainer = document.getElementById("product-container");
const testataDesign = makeTestata();
const productScrollDesign = makeProductScroll();
console.log(productScrollDesign);
const footerDesign = makefooter();
// productContainer.appendChild(productScrollDesign);
layout.appendChild(footerDesign);
// layout.appendChild(testata.element);
const productScroll = document.getElementById("product-scroll");
const closeIcon = document.getElementById("close-icon");
const groupChat = document.getElementById("group-chat");
const chatSend = document.getElementById("chat-send");
const tagsSelect = document.getElementById("tags-select");

closeIcon.addEventListener("click", closeChat);
groupChat.addEventListener("click", showChat);
chatSend.addEventListener("click", sendMessage);
tagsSelect.addEventListener("change", filterProducts);

const soundSys = new Product({
  dataTag: "soundsystem",
  src: ``,
  title: "SOUNDSYSTEM",
  description: `Vendo causa trasloco sedia Vintage super ricercata, usata
  pochissimo. Paglia non rovinata, puzza un pò perchè era in
  cantina, c'è un po di umidità. Spedizione esclusa.`,
  tags: [`#comodissima`, `#poco-usata`, `#1970`, `#ottime-rifiniture`],
});
const viaggi = new Product({
  dataTag: "viaggiare",
  src: ``,
  title: "Viaggi a piu non posso  ",
  description: `Vendo causa trasloco sedia Vintage super ricercata, usata
  pochissimo. Paglia non rovinata, puzza un pò perchè era in
  cantina, c'è un po di umidità. Spedizione esclusa.`,
  tags: [`#comodissima`, `#poco-usata`, `#1970`, `#ottime-rifiniture`],
});
const viniliUsati = new Product({
  dataTag: "musica",
  src: ``,
  title: "Vinili Usati x dj ",
  description: `Vendo causa trasloco sedia Vintage super ricercata, usata
  pochissimo. Paglia non rovinata, puzza un pò perchè era in
  cantina, c'è un po di umidità. Spedizione esclusa.`,
  tags: [`#comodissima`, `#poco-usata`, `#1970`, `#ottime-rifiniture`],
});
const volanteGaming = new Product({
  dataTag: "elettronica",
  src: `https://ipfs.io/ipfs/QmRiFrbk2FZU1Gd6pE949NkzX5bjeWtrgQKaJHh3xaEeUn?filename=WhatsApp%20Image%202023-07-16%20at%2015.59.25.jpeg`,
  title: "Volante Gaming ",
  description: `Vendo causa trasloco sedia Vintage super ricercata, usata
  pochissimo. Paglia non rovinata, puzza un pò perchè era in
  cantina, c'è un po di umidità. Spedizione esclusa.`,
  tags: [`#comodissima`, `#poco-usata`, `#1970`, `#ottime-rifiniture`],
});
const sedia = new Product({
  dataTag: "mobili",
  src: `https://ipfs.io/ipfs/QmVtvHzsdXbsKCaXGP7WkUj9b5XYDdg5K4LWjhyaZa4Jyx?filename=graffiti-chair.jpg`,
  title: "Sedia Vintage",
  description: `Vendo causa trasloco sedia Vintage super ricercata, usata
  pochissimo. Paglia non rovinata, puzza un pò perchè era in
  cantina, c'è un po di umidità. Spedizione esclusa.`,
  tags: [`#comodissima`, `#poco-usata`, `#1970`, `#ottime-rifiniture`],
});
const foto = new Product({
  dataTag: "mobili",
  src: `https://ipfs.io/ipfs/QmaHmnyKGenoP3HtY37hfCxzS6awqMzAjGtAv5HTx3jdvS?filename=Group-1601.jpg`,
  title: "Foto Vintage",
  description: ` Vendo causa trasloco foto Vintage super ricercata, usata
  pochissimo. Non rovinata, molto interessante, puzza un pò perchè
  era in cantina, c'è un po di umidità. Spedizione esclusa.`,
  tags: [`#bellisma`, `#molto-vecchi`, `#1901`, `#ottimo-quadretto`],
});

const createProduct = () => {
  const product = new UINode(createDivWithClassName("product"));
  const image = new UINode(createElementWithId("img")("product-image"));
  const description_container = new UINode(
    createDivWithClassName("description-container")
  );
  const details = new UINode(createDivWithClassName("details"));
  details.value.setAttribute("data-tags", "mobili");
  const title = new UINode(createDivWithClassName("title"));
  const description = new UINode(createDivWithClassName("description"));
  return build(
    product
      .addChild(image)
      .addChild(
        description_container
          .addChild(details)
          .addChild(title)
          .addChild(description)
      )
  );
};

productScroll.appendChild(soundSys.element);
productScroll.appendChild(viaggi.element);
productScroll.appendChild(viniliUsati.element);
productScroll.appendChild(volanteGaming.element);
productScroll.appendChild(foto.element);
productScroll.appendChild(sedia.element);
productScroll.appendChild(createProduct());

var chatSection = document.getElementById("chatsection");
chatSection.style.display = "none";
function showChat() {
  console.log("ci sono");
  var chatSection = document.getElementById("chatsection");
  chatSection.style.display = "flex";

  var layout = document.getElementsByClassName("layout")[0];
  if (window.innerWidth <= 768) {
    layout.style.filter = "blur(5px)";
  }

  var footer = document.getElementsByClassName("footer")[0];
  footer.style.pointerEvents = "none";
}
function closeChat() {
  var chatSection = document.getElementById("chatsection");
  chatSection.style.display = "none";

  var layout = document.getElementsByClassName("layout")[0];
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
relay.on(createTextElement);
function createTextElement(messageText, messageInput) {
  var chatWindow = document.getElementById("chatWindow");
  var messageContainer = document.createElement("div");
  messageContainer.className = "message user-message";
  messageContainer.textContent = messageText;

  chatWindow.insertBefore(messageContainer, chatWindow.firstChild);

  messageInput.value = "";
}

function sendMessage() {
  var messageInput = document.getElementById("messageInput");
  var messageText = messageInput.value.trim();
  if (messageText !== "") {
    relay.messageInput = messageInput;
    relay.sendToRelay(undefined, messageText);
  }
}
// Aggiunto event listener una volta che la pagina è completamente caricata
window.addEventListener("load", function () {
  var messageInput = document.getElementById("messageInput");
  // closeIcon.onclick(() => {});
  // Aggiunta event listener per l'evento keydown
  messageInput.addEventListener("keydown", function (event) {
    // Controllo se il tasto premuto è il tasto Invio (codice 13)
    if (event.keyCode === 13) {
      // Chiamata alla funzione sendMessage() per inviare il messaggio
      sendMessage();
    }
  });
});
// MUSIC PLAYER
const audioPlayer = document.getElementById("audio-player");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const playPauseButton = document.getElementById("play-pause-button");
const nextButton = document.getElementById("next-button");

// Aggiungi l'evento click al pulsante play/pausa

const togglePlay = () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.innerHTML = "&#10074;&#10074;"; // Simbolo di pausa
  } else {
    audioPlayer.pause();
    playPauseButton.innerHTML = "&#9658;"; // Simbolo di play
  }
};

playPauseButton.addEventListener("click", togglePlay);
// MENU TENDINA
function filterProducts() {
  var selectElement = document.getElementById("tags-select");
  var selectedTag = selectElement.value;

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
// Aggiungi l'evento click al pulsante successivo
nextButton.addEventListener("click", function () {
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
});
