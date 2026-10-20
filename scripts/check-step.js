const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/PREDATOR/.gemini/antigravity/brain/1b0726f1-d3b5-45c0-ab8a-bfd0d9fb4df3/.system_generated/logs/transcript.jsonl')
});
rl.on('line', (line) => {
  if (line.includes('"step_index":6071') || line.includes('"step_index":6075') || line.includes('"step_index":6079')) {
    const obj = JSON.parse(line);
    console.log(obj.step_index, JSON.stringify(obj.tool_calls || obj.content));
  }
});
