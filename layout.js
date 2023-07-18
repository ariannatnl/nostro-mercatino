import {
  build,
  UINode,
  createDivWithClassName,
  createElementWIthId,
  setStyleAttribute,
  Product,
} from "./js/Dom.js";
export {};

const layout = document.getElementById("layout");
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
  const image = new UINode(createElementWIthId("img")("product-image"));
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
