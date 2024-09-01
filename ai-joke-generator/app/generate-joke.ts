import { NextApiRequest, NextApiResponse } from 'next';
import openai from '../../lib/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { topic, tone, type, temperature } = req.body;

    const prompt = `Generate a ${tone} ${type} joke about ${topic}.`;

    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 60,
        temperature: temperature,
      });

      const joke = response.data.choices[0].text.trim();
      res.status(200).json({ joke });
    } catch (error) {
      res.status(500).json({ error: 'Error generating joke' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
