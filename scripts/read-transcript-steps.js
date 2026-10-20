const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/PREDATOR/.gemini/antigravity/brain/1b0726f1-d3b5-45c0-ab8a-bfd0d9fb4df3/.system_generated/logs/transcript_full.jsonl')
});
rl.on('line', (line) => {
  try {
    const obj = JSON.parse(line);
    if (obj.step_index >= 6070 && obj.step_index <= 6090) {
      console.log('--- Step', obj.step_index, obj.source, obj.type, '---');
      if (obj.tool_calls) console.log('Tool calls:', JSON.stringify(obj.tool_calls, null, 2));
      if (obj.content) console.log('Content:', typeof obj.content === 'string' ? obj.content.slice(0, 500) : obj.content);
    }
  } catch(e) {}
});
