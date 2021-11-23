import { client } from "../client";
import { Test } from "../test";

const test = new Test('net-login', 11000); // Sent after 10 seconds, give an extra second to wait

client.on('text', pkt => {
    if(pkt.message === '[message packet from bdsx]') test.succeed();
});
