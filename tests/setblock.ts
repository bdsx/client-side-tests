import { client } from "../client";
import { Test } from "../test";
const test = new Test('setblock');

let last: number;
const all: number[] = [];
let total = 5;

client.on('update_block', prepHandler);

function prepHandler(pkt: {
    block_runtime_id: number;
}): void {
    all.push(pkt.block_runtime_id);
    if(all.length > 1) {
        client.removeListener('update_block', prepHandler);
        client.on('update_block', handler);
    }
    last = all.indexOf(pkt.block_runtime_id);
}
function handler(pkt: {
    block_runtime_id: number;
}): void {
    if(!all.includes(pkt.block_runtime_id)) return;
    if (pkt.block_runtime_id === all[last]) {
        test.fail('The same block was placed twice');
    } else {
        last = all.indexOf(pkt.block_runtime_id);
        total++;
        if(total > 6) test.succeed();
    }
}
