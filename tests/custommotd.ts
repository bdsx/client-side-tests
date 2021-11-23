import { ping } from "bedrock-protocol";
import { Test } from "../test";

const test = new Test('custommotd');

ping({
    host: "localhost",
    port: 19132,
}).then(value => {
    if(value.motd === "TestMotd") test.succeed();
    test.assertEqual(value.motd.replace(/§./g, ""), "BDSX-Example-Server", "Incorrect motd");
    test.assertEqual(value.motd.length, "BDSX-Example-Server".length * 3 /* §aB */, "Incorrect motd length");
    test.succeed();
}).catch(() => {
    // Error
    console.error("Could not ping the server!");
    process.exit(1);
});
