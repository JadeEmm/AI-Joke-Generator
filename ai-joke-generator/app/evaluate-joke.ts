import { NextApiRequest, NextApiResponse } from 'next';
import openai from '../../lib/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { joke } = req.body;

    const prompt = `Evaluate this joke: "${joke}". Is it funny, appropriate, or offensive? Provide a brief summary.`;

    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 60,
        temperature: 0.5,
      });

      const evaluation = response.data.choices[0].text.trim();
      res.status(200).json({ evaluation });
    } catch (error) {
      res.status(500).json({ error: 'Error evaluating joke' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
