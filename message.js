const puppeteer = require("puppeteer");

async function fetchLoveMessage(url) {
  const browser = puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto(url);
  const [el] = await page.$x('//*[@id="random"]');
  const textContent = await el.getProperty("textContent");
  const loveMessage = await textContent.jsonValue();
  browser.close();
  return Promise.resolve(loveMessage);
  // return loveMessage;
}
async function generateMessage() {
  let message = await fetchLoveMessage(
    "https://www.romanticlovemessages.com/random/"
  );
  while (message.includes("guy") || message.includes("man")) {
    message = await fetchLoveMessage(
      "https://www.romanticlovemessages.com/random/"
    );
  }
  const index = message.lastIndexOf("Category");
  const suffix = [
    "LOYL 🌚",
    "Your chargie 🧡",
    "Baby Boy ❤️",
    "Your King 👑",
    "Your Honey Bunny 🍫",
    "Baby Boo ❤️",
    "❤️❤️❤️",
    "Your Sunshine ☀️",
    "Your Man 💕",
    "Your Starboy 💥"
  ];
  const filteredMessage = `${message.slice(0, index)} - ${
    suffix[Math.floor(Math.random() * suffix.length)]
  }`;
  return Promise.resolve(filteredMessage);
}

module.exports = generateMessage;
