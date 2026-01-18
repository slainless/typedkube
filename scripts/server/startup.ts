import { getGlobal, getObjectFields } from "../libs/global"

console.log("Hello, World from Server Scripts!")
console.log("Global members from server:", getObjectFields(getGlobal()))
