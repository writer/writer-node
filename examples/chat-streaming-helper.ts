#!/usr/bin/env -S npm run tsn -T

// This example demonstrates writer.com chat streaming helper
//
// To run it locally you will need:
// - An API key from writer.com
// - yarn installed
//
// Run the following commands from the root of the repository:
// $ ./scripts/bootstrap
// $ WRITERAI_API_KEY="<your api key>" yarn tsn examples/chat-streaming-helper.ts

import Writer from 'writer-sdk';

const writer = new Writer();

async function main() {
  const runner = writer.chat
    .stream({
      model: 'palmyra-x-004',
      messages: [{ role: 'user', content: 'Hi, today I want to write about' }],
    })
    .on('content.delta', (diff) => process.stdout.write(`chunk — ${JSON.stringify(diff)}` + '\n'))
    .on('content.done', (_data) => {
      process.stdout.write('\nDone!\n');
    });

  const result = await runner.finalChatCompletion();
  console.log({ result });
}

main().catch(console.error);
