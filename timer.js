#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
// responces liya hai user se 
const res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: "please enter the amount of second",
    validate: (input) => {
        if (isNaN(input)) {
            return "please enter valid number";
        }
        else if (input > 60) {
            return "seconds must be in 60";
        }
        else {
            return true;
        }
    }
});
let input = res.userInput;
function startTime(value) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + value);
    const IntervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(IntervalTime, currentTime);
        if (timeDifference <= 0) {
            console.log("timer has expir ed");
            process.exit();
        }
        const minute = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const second = Math.floor(timeDifference % 60);
        console.log(`${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(input);
// console.log(input);
