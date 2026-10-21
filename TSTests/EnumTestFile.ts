import {Environment} from "../TSTests/EnumTest.js";

function runTests(env: Environment): void{
    console.log(`Tests are running in ${env}`);
}

runTests(Environment.development);