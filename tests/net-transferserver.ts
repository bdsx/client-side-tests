import { v4 } from "uuid";
import { client } from "../client";
import { Test } from "../test";

const test = new Test('net-transferserver');
const uuid = v4();

client.write('command_request', {
    command: 'transferserver example.com 12345',
    origin: {
        type: 'player',
        uuid,
        request_id: '',
        player_entity_id: 0
    },
    interval: false
});
client.on('transfer', pkt => {
    test.assertEqual(pkt.server_address, 'example.com', "Incorrect transfer server");
    test.assertEqual(pkt.port, 12345, "Incorrect transfer port");
    test.succeed();
});
