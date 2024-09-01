// app/api/evaluate-joke/route.ts
import { NextRequest, NextResponse } from 'next/server';
import openai from '../../../lib/openai';

export async function POST(req: NextRequest) {
  const { joke } = await req.json();

  const prompt = `Evaluate this joke: "${joke}". Is it funny, appropriate, or offensive? Provide a brief summary.`;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 60,
      temperature: 0.5,
    });

    const evaluation = response.data.choices[0].text.trim();
    return NextResponse.json({ evaluation });
  } catch (error) {
    return NextResponse.json({ error: 'Error evaluating joke' }, { status: 500 });
  }
}
