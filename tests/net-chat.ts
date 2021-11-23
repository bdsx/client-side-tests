import { client } from "../client";
import { Test } from "../test";

const test = new Test('net-chat');

client.write('text', {
    type: 'chat',
    needs_translation: false,
    source_name: (client as any).username,
    xuid: '',
    platform_chat_id: '',
    message: 'nochat'
});
client.write('text', {
    type: 'chat',
    needs_translation: false,
    source_name: (client as any).username,
    xuid: '',
    platform_chat_id: '',
    message: 'test message'
});

client.on('text', pkt => {
    if(pkt.message === 'nochat' || pkt.message === 'NOCHAT YEY!') test.fail('message "nochat" should be cancelled');
    if(pkt.message === 'test message') test.fail('message "test message" was not modified');
    if(pkt.message === 'TEST MESSAGE YEY!') setTimeout(() => test.succeed(), 500); // Wait for potential nochat message
});
