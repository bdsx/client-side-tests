// TODO: fix deprecated things

import { v4 } from "uuid";
import { client } from "../client";
import { Test } from "../test";
const uuid = v4();

const test = new Test('test', 15000); // Higher timeout because it starts before connection and ends late

const tests = {
    registertest: false,
    teleportMissing: false,
    chatcancelcounter: false
};

client.on('available_commands', pkt => {
    if(pkt.command_data.find((command: { name: string }) => command.name === 'teleport')) {
        test.fail('teleport command not missing');
    } else {
        tests.teleportMissing = true;
        checkFinished();
    }
});

client.on('spawn', () => {
    // After connection tests
    client.write('command_request', {
        command: 'registertest',
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
        test.assertEqual(pkt.output[0].message_id, 'passed', 'Incorrect registertest result');
        tests.registertest = true;
        checkFinished();
    });

    client.write('text', {
        type: 'chat',
        needs_translation: false,
        source_name: (client as any).username,
        xuid: '',
        platform_chat_id: '',
        message: 'test'
    });
    client.write('text', {
        type: 'chat',
        needs_translation: false,
        source_name: (client as any).username,
        xuid: '',
        platform_chat_id: '',
        message: 'test'
    });
    client.on('text', pkt => {
        if(pkt.source_name !== (client as any).username) return;
        if(pkt.message === 'TEST YEY!' && !tests.chatcancelcounter) tests.chatcancelcounter = true;
        else if(pkt.message === 'TEST YEY!' && tests.chatcancelcounter) test.fail('Got two "TEST YEY!" messages');
        // tests.chatcancelcounter = true;
        checkFinished();
    });
});

function checkFinished(): void {
    for(const key in tests) {
        if(!tests[key as keyof typeof tests]) return;
    }
    test.succeed();
}
test.timeoutCallback = () => {
    const remainingTasks = Object.keys(tests).filter(key => !tests[key as keyof typeof tests]);
    let ret = "Timeout, remaining tasks: " + remainingTasks.join(', ');
    if(remainingTasks.length === 1 && remainingTasks[0] === 'chatcancelcounter') ret += "; this is probably because the server is not freshly started.";
    return ret;
};
