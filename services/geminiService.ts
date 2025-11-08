
import { GoogleGenAI, Type } from "@google/genai";
import { Vitals, AnalysisResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    stressPercentage: {
      type: Type.INTEGER,
      description: "A numerical percentage from 0 to 100 representing the estimated physiological stress.",
    },
    analysis: {
      type: Type.STRING,
      description: "A brief, easy-to-understand analysis of the vitals and a simple wellness tip. Must include a disclaimer to consult a professional.",
    },
  },
  required: ['stressPercentage', 'analysis'],
};

export const getStressAnalysis = async (vitals: Vitals): Promise<AnalysisResponse> => {
  const prompt = `
    You are an expert health and wellness AI assistant. Based on the following user-provided vital signs, calculate a stress percentage and provide a brief analysis.
    - Resting Heart Rate: ${vitals.heartRate} BPM
    - Pulse Rate: ${vitals.pulseRate} BPM
    - Blood Oxygen (SpO2): ${vitals.oxygenLevel}%

    Guidelines for your analysis:
    1.  **Stress Percentage:** Calculate a single percentage value (0-100) representing the estimated physiological stress level.
        -   Consider a resting heart/pulse rate of 60-100 BPM as normal. Values above 100 suggest higher stress.
        -   Consider a blood oxygen level of 95-100% as normal. Levels below 95% can indicate respiratory issues which can be linked to stress.
        -   Note that Heart Rate and Pulse Rate should ideally be identical. If they differ significantly (more than 5 BPM), mention this possibility gently in your analysis without diagnosing.
    2.  **Analysis Text:** Provide a concise, easy-to-understand explanation for the calculated stress level. Include one simple, actionable wellness tip (e.g., "try a 2-minute deep breathing exercise"). Do not provide medical advice, and explicitly state that the user should consult a healthcare professional for health concerns.

    Return ONLY a valid JSON object matching the provided schema. Do not include any introductory text or markdown formatting like \`\`\`json.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2
      }
    });

    const parsedResponse = JSON.parse(response.text);
    return parsedResponse as AnalysisResponse;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
