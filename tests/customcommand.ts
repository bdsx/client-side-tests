import { client } from "../client";
import { Test } from "../test";

const test = new Test('customcommand', 20000);

client.on('available_commands', handler);

let aaa = false;
let bbb = false;
let ccc = false;
let ddd = false;
let eee = false;
let fff = false;
let ggg = false;
let hhh = false;
type Overload = {
    parameter_name: string;
    value_type: keyof Enums;
    enum_type: string;
    optional: boolean;
    options: {
        as_chained_command: number;
        collapse_enum: number;
        has_semantic_constraint: number;
        unused: number;
    };
};
type Enums = {
    [key: string]: {
        values: Value[];
        name: string;
    };
};
type Value = string;

function handler(pkt: {
    command_data: {
        name: string;
        description: string;
        flags: number;
        permission_level: number;
        overloads: Overload[][];
    }[];
    enums: Enums;
    enum_values: {
        [key: Value]: string[];
    };
}): void {
    for(const command of pkt.command_data){
        switch(command.name) {
        case 'aaa':
            test.assertEqual(command.description, 'bdsx command example', 'Wrong command description for command aaa');
            test.assertEqual(command.flags, 192, 'Wrong command flags for command aaa');
            test.assertEqual(command.permission_level, 0, 'Wrong command permission level for command aaa');
            test.assertDeepEqual(command.overloads, [[{
                parameter_name: 'rawtext',
                value_type: 'raw_text',
                enum_type: 'valid',
                optional: false,
                options: {
                    as_chained_command: 0,
                    collapse_enum: 0,
                    has_semantic_constraint: 0,
                    unused: 0
                }}]], 'Wrong command overloads for command aaa');
            aaa = true;
            break;
        case 'bbb':
            test.assertEqual(command.description, 'optional param example', 'Wrong command description for command bbb');
            test.assertEqual(command.flags, 192, 'Wrong command flags for command bbb');
            test.assertEqual(command.permission_level, 0, 'Wrong command permission level for command bbb');
            test.assert(command.overloads.length === 1, 'Wrong command overloads length for command bbb');
            test.assert(command.overloads[0].length === 2, 'Not enough overload arguments for command bbb');
            bbb = true;
            break;
        case 'ccc':
            test.assertEqual(command.description, 'empty params example', 'Wrong command description for command ccc');
            test.assertEqual(command.flags, 192, 'Wrong command flags for command ccc');
            test.assertEqual(command.permission_level, 0, 'Wrong command permission level for command ccc');
            test.assert(command.overloads.length === 1, 'Wrong command overloads length for command ccc');
            test.assert(command.overloads[0].length === 0, 'Incorrect overload arguments for command ccc');
            ccc = true;
            break;
        case 'ddd':
            test.assertEqual(command.description, 'relative float example', 'Wrong command description for command ddd');
            test.assertEqual(command.flags, 192, 'Wrong command flags for command ddd');
            test.assertEqual(command.permission_level, 0, 'Wrong command permission level for command ddd');
            test.assert(command.overloads.length === 1, 'Wrong command overloads length for command ddd');
            test.assert(command.overloads[0].length === 3, 'Not enough overload arguments for command ddd');
            ddd = true;
            break;
        case 'eee':
            test.assertEqual(command.description, 'entity example', 'Wrong command description for command eee');
            test.assertEqual(command.flags, 192, 'Wrong command flags for command eee');
            test.assertEqual(command.permission_level, 0, 'Wrong command permission level for command eee');
            test.assert(command.overloads.length === 1, 'Wrong command overloads length for command eee');
            test.assert(command.overloads[0].length === 1, 'Incorrect overload arguments for command eee');
            eee = true;
            break;
        case 'fff':
            test.assertEqual(command.description, 'boolean example', 'Wrong command description for command fff');
            test.assertEqual(command.flags, 192, 'Wrong command flags for command fff');
            test.assertEqual(command.permission_level, 0, 'Wrong command permission level for command fff');
            test.assert(command.overloads.length === 1, 'Wrong command overloads length for command fff');
            test.assert(command.overloads[0].length === 1, 'Incorrect overload arguments for command fff');
            fff = true;
            break;
        case 'ggg':
            test.assertEqual(command.description, 'enum example', 'Wrong command description for command ggg');
            test.assertEqual(command.flags, 192, 'Wrong command flags for command ggg');
            test.assertEqual(command.permission_level, 0, 'Wrong command permission level for command ggg');
            test.assert(command.overloads.length === 1, 'Wrong command overloads length for command ggg');
            test.assert(command.overloads[0].length === 2, 'Incorrect overload arguments for command ggg');
            test.assertEqual(command.overloads[0][1].parameter_name, 'enum2', 'Wrong enum name for command ggg');
            test.assertDeepEqual(pkt.enums[command.overloads[0][0].value_type].values.map(x => pkt.enum_values[x]), ['enum1', 'enum2', 'enum3'], 'Wrong enum values for command ggg (Enum: ' + pkt.enums[command.overloads[0][1].enum_type].name + ')');
            test.assertDeepEqual(pkt.enums[command.overloads[0][1].value_type].values.map(x => pkt.enum_values[x]), ['overworld', 'nether', 'theend', 'undefined'], 'Wrong enum values for command ggg (Enum: ' + pkt.enums[command.overloads[0][1].enum_type].name + ')');
            ggg = true;
            break;
        case 'hhh':
            test.assertEqual(command.description, 'json example', 'Wrong command description for command hhh');
            test.assertEqual(command.flags, 192, 'Wrong command flags for command hhh');
            test.assertEqual(command.permission_level, 0, 'Wrong command permission level for command hhh');
            test.assert(command.overloads.length === 1, 'Wrong command overloads length for command hhh');
            test.assert(command.overloads[0].length === 1, 'Incorrect overload arguments for command hhh');
            hhh = true;
            break;
        }
    }
    if(!(aaa && bbb && ccc && ddd && eee && fff && ggg && hhh)) {
        test.fail('Missing commands');
    }
    test.succeed();
}

test.timeoutCallback = () => "Did not receive commands";
