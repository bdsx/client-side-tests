// TODO: Destroy block, check that it is destroyed every other time
// Expect text packets too

import { client } from "../client";
import { parse } from 'prismarine-nbt';
import { position } from '../commondata';
import { Test } from "../test";

// May need to load chunks to do that (so we know where to break blocks)
// client.on('level_event', async pkt => {
//     console.log(pkt);
//     // const coords = { x: pkt.x, y: pkt.z };
//     // const payload: Buffer = pkt.payload;
//     // let index = 0;
//     // console.log(payload.readInt8(2));
//     // while (payload.readInt8(index) !== 0) {
//     //     index++;
//     // }
//     // console.log(index);
//     // debugger;
//     // const nbtdata = await parse(payload.slice(3), 'littleVarint');
//     // console.log(nbtdata);
// });


// FIXME: This whole test doesn't work, it needs to be remade for server-auth
// Hints: Everything is done through PlayerAuthInputPacket, format is largely unknown. 
// Feel free to try to make it

client.on('text', pkt => {
    // console.log(pkt);
    if(pkt.message === 'STOP YEY!' || pkt.message === 'stop') client.close();
});


client.write('player_action', {
    runtime_entity_id: client.entityId,
    action: 'start_break',
    position: {
        x: position.x,
        y: 4,
        z: position.z + 1
    },
    face: 1
});

const int = setInterval(() => {
    client.write('player_action', {
        runtime_entity_id: client.entityId,
        action: 'crack_break',
        position: {
            x: position.x,
            y: 4,
            z: position.z + 1
        },
        face: 1
    });
}, 50);

setTimeout(() => {
    // setTimeout(() => {
        //     client.write('player_action', {
            //         runtime_entity_id: client.entityId,
            //         action: 'abort_break',
            //         position: {
                //             x: position.x,
                //             y: 4,
                //             z: position.z + 1
                //         },
                //         face: 0
                //     });
                // }, 50);
    clearInterval(int);
    client.write('player_action', {
        runtime_entity_id: client.entityId,
        action: 'abort_break',
        position: {
            x: position.x,
            y: 4,
            z: position.z + 1
        },
        face: 0
    });
    client.write('inventory_transaction', {
        transaction: {
            transaction_type: 'item_use',
            actions: {
                source_type: 'world_interaction',
                flags: 0,
                slot: 0,
                old_item: {
                    network_id: 0
                },
                new_item: {
                    network_id: 0
                }
            },
            legacy: {
                legacy_request_id: 0
            },
            transaction_data: {
                action_type: 'break_block',
                block_position: {
                    x: position.x,
                    y: 2,
                    z: position.z + 1
                },
                face: 2,
                hotbar_slot: 0,
                held_item: {
                    network_id: 0
                },
                player_pos: position,
                click_pos: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                block_runtime_id: 0
            }
        },
    });
}, 1200);


const test = new Test('lowlevel-apihooking');
// FIXME: Nothing is tested
test.succeed();
