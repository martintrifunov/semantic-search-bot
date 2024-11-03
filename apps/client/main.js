const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");
const API_URL = import.meta.env.VITE_API_URL;

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
  const loaderResponse = `<div class="chat response">
    <img src="/chatbot.png" />
    <span class="new">...</span>
  </div>`;

  messageBox.insertAdjacentHTML("beforeEnd", chatMessage);
  messageBox.insertAdjacentHTML("beforeEnd", loaderResponse);

  const chatBotResponse = document.querySelector(".response .new");

  try {
    const responseText = await getChatResponse(typedMessage);
    chatBotResponse.innerHTML = responseText;
  } catch (error) {
    chatBotResponse.innerHTML = "Oops! An error occurred. Please try again.";
    console.error("Fetch error:", error);
  } finally {
    chatBotResponse.classList.remove("new");
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

  if (data[0].similarity >= 0.79) {
    return data[0].text;
  } else {
    return "I'm sorry, but I cannot find the answer to your question.";
  }
};
