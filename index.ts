// Fix TS not finding EventEmitter
import { EventEmitter } from 'events';
declare module 'bedrock-protocol' {
    interface Connection extends EventEmitter {
    }
}

import './commondata';
import { runTests } from './test';

// Map<testName, runBeforeConnection>
runTests(new Map([
    ['custommotd', true],
    ['customcommand', true],
    ['net-sendhook', true],
    ['test', true],
    ['actor-effects', false],
    ['attribute', false],
    ['bedrockapi-executecommand', false],
    ['form', false],
    ['lowlevel-apihooking', false],
    ['net-chat', false],
    ['net-login', false],
    ['net-ping', false],
    ['net-scorepacket', false],
    ['net-transferserver', false],
    ['setblock', false],
    ['net-rawpacket', false],
    ['lowlevel-checkclientcacheblobstatus', false]
]));

import { client } from './client';
import 'colors';
console.log("Running pre-connection tests...".yellow);
client.on('spawn', () => {
    console.log("Spawned! Running in-game tests...".yellow);
    // setRunning();
    // require('./tests/after-connection');
});


