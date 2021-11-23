// TODO: Move and craft and test for text packets
// This will involve PlayerAuthInputPacket to move
// Crafting will likely involve using /setblock to place a crafting table, using /give
// to gain items, and then opening the crafting window before performing the craft

import { Test } from "../test";

const test = new Test("net-rawpacket");
// FIXME: Nothing is tested
test.succeed();
