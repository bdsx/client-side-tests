import { client } from "../client";
import { Test } from "../test";

const test = new Test('attribute');

let health: number;
client.once('update_attributes', pkt => health = pkt.attributes[0].current - 1);
client.on('update_attributes', handler);
let startedCycle = false;

function handler(pkt: {
    runtime_entity_id: BigInt;
    attributes: {
        name: string;
        current: number;
    }[];
}): void {
    test.assertEqual(pkt.runtime_entity_id, client.entityId, 'Wrong entity id (not self)');
    for(const attr of pkt.attributes) {
        if (attr.name === 'minecraft:health') {
            if(health === 20) {
                test.assertEqual(attr.current, 5, 'health did not wrap correctly');
                if(startedCycle) {
                    test.succeed();
                    client.removeListener('update_attributes', handler);
                } else {
                    startedCycle = true;
                }
            } else {
                test.assertEqual(attr.current, health + 1, 'health did not update correctly');
            }
            health = attr.current;
        }
    }
}
