// app/api/generate-joke/route.ts
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

// Ensure the API key is set in the environment variables
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is missing');
}

// Initialize OpenAI client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  try {
    const { topic, tone, type, temperature } = await request.json();

    // Construct prompt based on parameters
    const prompt = `Generate a ${tone} ${type} about ${topic}.`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature,
      max_tokens: 150,
    });

    const joke = response.data.choices[0].text.trim();

    return NextResponse.json({ joke });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate joke' }, { status: 500 });
  }
}
