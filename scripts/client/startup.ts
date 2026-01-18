import { getGlobal, getObjectFields } from "../libs/global"

console.log("Hello, World from Client Scripts!")
console.log("Global members from client:", getObjectFields(getGlobal()))
