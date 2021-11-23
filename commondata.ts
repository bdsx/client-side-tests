import { client } from "./client";

export let position: {
    x: number;
    y: number;
    z: number;
};
client.on('respawn', pkt => {
    position = pkt.position;
});
