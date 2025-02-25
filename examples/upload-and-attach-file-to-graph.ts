#!/usr/bin/env -S npm run tsn -T

import Writer from 'writer-sdk';
import fs from 'fs';

async function main() {
  const client = new Writer();

  const graph = await client.graphs.create({
    name: 'My Graph',
    description: 'This is a graph created from the SDK',
  });

  let file = await client.files.upload({
    'Content-Type': 'text/plain',
    'Content-Disposition': 'attachment; filename="example.txt"',
    content: fs.createReadStream('examples/example.txt'),
  });

  console.log(file.id);

  console.log('✅ File uploaded:', JSON.stringify(file, null, 2));

  // wait for file status to be 'processed'
  while (file.status == 'in_progress') {
    console.log('⏱️ File processing in progress...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    file = await client.files.retrieve(file.id);
  }

  console.log('✅ File finished processing: ', file.status);

  if (file.status == 'completed') {
    await client.graphs.addFileToGraph(graph.id, {
      file_id: file.id,
    });

    console.log('✅ File attached to graph');
  } else {
    console.log('⚠️ File processing did not complete. Status:', file.status);
    console.log(file);
    return;
  }
}

main().catch(console.error);
