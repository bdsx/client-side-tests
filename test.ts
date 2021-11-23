import { client } from "./client";

const running = new Map<string, Test>();

let testsSuccessful = 0;
let testsCompleted = 0;
let totalTests = 0;

export function runTests(tests: Map<string, boolean>): void {
    totalTests = tests.size;
    for(const test of tests) {
        if(test[1]) {
            require('./tests/' + test[0]);
            tests.delete(test[0]);
        }
    }
    client.on('spawn', () => {
        for(const test of tests) {
            require('./tests/' + test[0]);
        }
    });
}

export class Test {
    id: string;
    timeout: NodeJS.Timeout;
    finished = false;
    timeoutCallback: () => string | undefined;

    constructor(id: string, timeout: number = 10000) {
        this.id = id;
        this.timeout = setTimeout(() => {
            if(this.timeoutCallback) this.fail(this.timeoutCallback() ?? "Timeout after " + timeout + "ms"); // callback can pass the test and fail will silently cancel
            else this.fail('Timeout after ' + timeout + 'ms');
        }, timeout);
        running.set(id, this);
    }
    pass(): void {
        this.succeed();
    }
    succeed(): void {
        if(this.finished) return;
        this.finished = true;
        testsSuccessful++;
        testsCompleted++;
        console.log(`Test ${this.id} succeeded [${testsSuccessful}/${totalTests}]`.green);
        clearTimeout(this.timeout);
        if(testsCompleted === totalTests) finish();
    }
    fail(message: string): void {
        if(this.finished) return;
        this.finished = true;
        testsCompleted++;
        console.log(`Test ${this.id} failed: ${message}`.red);
        clearTimeout(this.timeout);
        if(testsCompleted === totalTests) finish();
    }
    assert(condition: boolean, message: string): boolean {
        if(condition) return true;
        this.fail(message);
        return false;
    }
    assertEqual(first: any, second: any, message: string): boolean {
        return this.assert(first === second, message + "; Expected: " + second + " but got: " + first);
    }
    assertDeepEqual(first: any, second: any, message: string): boolean {
        return this.assert(deepEqual(first, second), message + "; Expected: " + second + " but got: " + first);
    }
}

// https://stackoverflow.com/questions/25456013/javascript-deepequal-comparison/25456134
function deepEqual(x: any, y: any): boolean {
    if (x === y) {
        return true;
    } else if ((typeof x === "object" && x != null) && (typeof y === "object" && y != null)) {
        if (Object.keys(x).length !== Object.keys(y).length) return false;

        for (const prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepEqual(x[prop], y[prop])) return false;
            } else return false;
        }
        return true;
    } else return false;
}

function finish(): void {
    client.close();
    console.log("Connection closed, finished!");
}
