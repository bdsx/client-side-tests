import { client } from "../client";
import { Test } from "../test";

const test = new Test('bedrockapi-executecommand');

client.on('set_title', handler);

let count = 0;

function handler({ text, type }: { text: string; type: string}): void {
    if(text === '§2Remove the import line in index.ts to disable the examples' && type === 'action_bar_message') count++;
    if(count >= 3) {
        test.succeed();
        client.removeListener('set_title', handler);
    }
}
