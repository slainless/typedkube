import { getGlobal, getObjectFields } from "../../libs/global"

console.log("Hello, World from Startup Scripts!")
console.log("Global members from startup:", getObjectFields(getGlobal()))
