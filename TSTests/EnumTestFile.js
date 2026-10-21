import { Environment } from "../TSTests/EnumTest.js";
function runTests(env) {
    console.log(`Tests are running in ${env}`);
}
runTests(Environment.development);
