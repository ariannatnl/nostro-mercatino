import { build } from "./js/Dom.js";
export {};

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
playPauseButton.addEventListener("click", function () {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.innerHTML = "&#10074;&#10074;"; // Simbolo di pausa
  } else {
    audioPlayer.pause();
    playPauseButton.innerHTML = "&#9658;"; // Simbolo di play
  }
});
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
