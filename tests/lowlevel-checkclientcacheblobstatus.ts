import { client } from "../client";
import { Test } from "../test";

const test = new Test('lowlevel-checkclientcacheblobstatus');

client.write('client_cache_blob_status', {
    misses: 0xfff,
    haves: 0xfff,
    missing: [],
    have: []
});

client.on('text', (pkt) => {
    if(pkt.message === 'DOS (ClientCacheBlobStatus) detected') test.succeed();
});
