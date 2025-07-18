import axios from "axios";

export async function getColorPaletteFromText(promptText: string): Promise<string[]> {
  const prompt = `Generate a list of exactly 5 color HEX codes (like "#ff0000") that represent the following theme or mood: "${promptText}". Return only a JSON array of 5 strings.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;

    try {
      // ✅ Remove Markdown-style code block
      const cleaned = content.trim().replace(/^```json|^```|```$/g, "").trim();
      const colors: string[] = JSON.parse(cleaned);
      console.log("Parsed colors:", colors);
      return colors;
    } catch {
      console.warn("AI returned malformed JSON:", content);
      return [];
    }
  } catch (error) {
    console.error("API call failed", error);
    throw error;
  }
}
