import { client } from "../client";
import { Test } from "../test";

const test = new Test('net-sendhook');

client.on('start_game', pkt => {
    test.assertEqual(pkt.seed, -123, 'Seed is incorrect');
    // console.log(pkt);
    test.succeed();
});
