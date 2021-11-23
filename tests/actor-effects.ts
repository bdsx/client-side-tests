import { client } from "../client";
import { Test } from "../test";

const test = new Test('actor-effects');
let strength = false;
let regen = false;
client.on('mob_effect', handler);

function handler(data: {
    runtime_entity_id: BigInt;
    effect_id: number;
    duration: number;
    amplifier: number;
    particles: boolean;
}): void {
    if(data.runtime_entity_id !== client.entityId) {
        test.fail('Wrong entity id (not self) Given: ' + data.runtime_entity_id + ' Expected: ' + client.entityId);
        client.removeListener('mob_effect', handler);
    }
    if(data.effect_id === 5 && data.duration === 20 && data.amplifier === 1 && data.particles === false) strength = true;
    if(data.effect_id === 10 && data.duration === 20 && data.amplifier === 1 && data.particles === true) regen = true;
    if(regen && strength) {
        test.succeed();
        client.removeListener('mob_effect', handler);
    }
}
