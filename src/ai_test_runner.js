const { GoogleGenAI } = require("@google/genai");
const axios = require("axios");
const { BASE_URL } = require("./config");

async function test() {
  try {
    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Aplikacija je pokrenuta na ${BASE_URL}. Odgovori iskljucivo u formatu SVE OK ili PROBLEM: [opis].`
    });

    const resultText = response.candidates[0].content.parts[0].text;

    const isProblem = resultText.includes("PROBLEM");
    const statusHeader = isProblem ? "GRESKA U APLIKACIJI!" : "SVE OK";

    console.log(resultText);

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `${statusHeader}\n\n${resultText}`
      }
    );

    process.exit(isProblem ? 1 : 0);

  } catch (error) {
    console.error(error);

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: "GRESKA U TESTU: " + error.message
      }
    ).catch(() => {});

    process.exit(1);
  }
}

test();