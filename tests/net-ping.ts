import { v4 } from 'uuid';
import { client } from "../client";
import { Test } from "../test";

const test = new Test('net-ping');
const uuid = v4();
client.write('command_request', {
    command: 'ping',
    origin: {
        type: 'player',
        uuid,
        request_id: '',
        player_entity_id: 0
    },
    interval: false
});

client.on('command_output', pkt => {
    if(pkt.origin.uuid !== uuid) return;
    test.assert(pkt.output[0].message_id.includes('[EXAMPLE-PING]'), 'Did not receive correct ping response');
    test.succeed();
});
