// lib/openai.ts
import { Configuration, OpenAIApi } from 'openai';

// Ensure the API key is set in the environment variables
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key in environment variables');
}

// Configure OpenAI with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an instance of OpenAIApi using the configuration
const openai = new OpenAIApi(configuration);

export default openai;
