import { client } from "../client";
import { Test } from "../test";

const test = new Test('form');

client.once('modal_form_request', pkt => {
    test.assert(pkt.data, 'Form did not include data');
    test.succeed();
    // close the form
    client.write('modal_form_response', {
        form_id: pkt.form_id,
        data: "null"
    });
});
// debugger;
// console.log("sending");
client.write('command_request', {
    command: 'form',
    internal: false,
    origin: {
        type: 0,
        uuid: '',
        request_id: 'somevalue'
    }
});
test.timeoutCallback = () => "No form received";
