"use strict";
const myTestObj = {
    userName: "Saad",
    age: 20
};
let x = {};
for (const [key, value] of Object.entries(myTestObj)) {
    x[key] = value;
}
console.log(x);
console.log(typeof myTestObj, "   ", typeof x);