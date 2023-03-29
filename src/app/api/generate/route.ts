import { OPEN_AI_API_KEY } from "~/config";
import axios from "axios";
import prompt from "../../defaultPrompt.txt";
import frag from "../../defaultFrag.glsl";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const buffer = searchParams.get("buffer") ?? frag;
  const input = searchParams.get("input") ?? "";

  const query = prompt
    .replace(`{{{input}}}`, input)
    .replace(`{{{buffer}}}`, buffer);

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
  };

  const headers = {
    Authorization: `Bearer ${OPEN_AI_API_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const result = (
      await axios.post("https://api.openai.com/v1/chat/completions", data, {
        headers,
      })
    ).data.choices[0].message.content
      .replace("[BEGIN]", "")
      .replace("[END]", "")
      .trim();

    return new Response(result);
  } catch (err: any) {
    return new Response("there was a problem", { status: 500 });
  }
}
