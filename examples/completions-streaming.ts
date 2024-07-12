// This example demonstrates writer.com completions streaming
//
// To run it locally you will need:
// - An API key from writer.com
// - Yarn installed, see https://classic.yarnpkg.com/en/docs
//
// Run the following commands from the root of the repository:
// $ yarn
// $ WRITERAI_API_KEY="<your api key>" yarn tsn examples/completions_streaming.py

import { WriterAI } from '../src';

async function main() {
  const client = new WriterAI();

  console.log('Supported models:');
  const { models } = await client.models.list();
  for (const model of models) {
    console.log(model.id);
  }

  console.log();
  console.log("Let's complete a prompt:");
  const prompt = 'Hi, today I want to write about';
  console.log(`> ${prompt}`);
  try {
    const stream_res = await client.completions.create({
      model: randomChoice(models).id,
      prompt,
      stream: true,
      max_tokens: 64,
    });
    for await (const response of stream_res) {
      console.log(`< ${response.value}`);
    }
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}

const randomChoice = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

if (require.main === module) {
  main().catch(console.error);
}
