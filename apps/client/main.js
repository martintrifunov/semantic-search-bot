const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");
const API_URL = import.meta.env.VITE_API_URL;
let loadInterval;

const loader = (loaderElement) => {
  let element = "";
  loadInterval = setInterval(() => {
    element += ".";

    if (element === "....") {
      element = "";
    }

    loaderElement.innerHTML = element;
  }, 300);
};

const typeText = (element, text) => {
  element.innerHTML = "";
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
      element.innerHTML = text;
    }
  }, 5);
};

sendBtn.onclick = async (event) => {
  event.preventDefault();

  if (messageBar.value.length <= 0) return;

  const typedMessage = messageBar.value;
  messageBar.value = "";
  sendBtn.disabled = true;

  const chatMessage = `<div class="chat message">
    <img src="/user.png" />
    <span>${typedMessage}</span>
  </div>`;

  const loaderId = `loader-${Date.now()}`;
  const loaderResponse = `<div class="chat response">
    <img src="/chatbot.png" />
    <span id="${loaderId}" class="new">...</span>
  </div>`;

  messageBox.insertAdjacentHTML("beforeEnd", chatMessage);
  messageBox.insertAdjacentHTML("beforeEnd", loaderResponse);

  const chatBotResponse = document.getElementById(loaderId);
  loader(chatBotResponse);

  //Really hacky solution for applying html tags to typing effect -> refactor later
  try {
    const responseText = await getChatResponse(typedMessage);
    clearInterval(loadInterval);
    // Immediately insert the HTML content for display
    chatBotResponse.innerHTML = responseText;
    // Get the plain text to type it
    const plainText = chatBotResponse.innerText; // Get the plain text to type

    typeText(chatBotResponse, plainText);

    // After typing effect, apply the original HTML content
    setTimeout(() => {
      chatBotResponse.innerHTML = responseText;
    }, plainText.length * 5.5); // Timing based on the typing speed
  } catch (error) {
    clearInterval(loadInterval);
    typeText(chatBotResponse, "Oops! An error occurred. Please try again.");
    console.error("Fetch error:", error);
  } finally {
    sendBtn.disabled = false;
  }
};

const getChatResponse = async (query) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ perPage: 1, query }),
  });

  const data = await response.json();

  if (data[0].similarity >= 0.85) {
    return data[0].text;
  } else {
    return "I'm sorry, but I cannot find the answer to your question.";
  }
};
