import { v4 } from "uuid";
import { client } from "../client";
import { Test } from "../test";

const test = new Test('net-scorepacket');
const uuid = v4();

client.write('command_request', {
    command: 'example_score',
    origin: {
        type: 'player',
        uuid,
        request_id: '',
        player_entity_id: 0
    },
    interval: false
});
let gotSetDisplay = false;
client.on('set_display_objective', pkt => {
    test.assertDeepEqual(pkt, {
        display_slot: 'sidebar',
        objective_name: 'objective',
        display_name: 'name',
        criteria_name: 'dummy',
        sort_order: 0
    }, "Incorrect set_display_objective packet");
    gotSetDisplay = true;
});
client.on('set_score', pkt => {
    test.assertEqual(pkt.action, 'change', "Incorrect set_score packet");
    test.assertEqual(pkt.entries.length, 1, "Incorrect set_score packet");
    test.assertEqual(pkt.entries[0].objective_name, 'objective', "Incorrect set_score packet");
    test.assertEqual(pkt.entries[0].score, 1000, "Incorrect set_score packet");
    test.assertEqual(pkt.entries[0].entry_type, 'player', "Incorrect set_score packet");
    // console.log(pkt);
    test.assert(gotSetDisplay, "Didn't get set_display_objective packet");
    test.succeed();
});
