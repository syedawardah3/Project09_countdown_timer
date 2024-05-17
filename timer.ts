#! /usr/bin/env node
import inquirer from "inquirer";
import {differenceInSeconds} from "date-fns";
import chalk from "chalk";

console.log(chalk.bold.italic.underline.redBright("\t\t ************************WELCOME TO WARDAH SHAH COUNTDOWN TIMER************************"))
const res = await inquirer.prompt([
    {
        name: "minutes",
        type: "number",
        message: chalk.magentaBright.bold("Please enter the number of minutes:"),
        validate: (input) => {
          if (isNaN(input)) {
            return chalk.redBright("Please enter a valid number");
          } else if (input < 0) {
            return chalk.redBright("Please enter a positive number");
          } else {
            return true;
          }
        },
      },
    {
        type:"number",
        name:"seconds",
        message:chalk.magentaBright.bold("Please Enter the number of Seconds: "),
        validate: (input) =>{
            if (isNaN(input)) {
                return chalk.redBright("Please Enter Valid Number");
            }
            else if (input > 60) {
                return chalk.redBright("Seconds must be 60");
            }
            else {
                return true
            }
        }
    }
]);
let input1 = res.minutes;
let input2 = res.seconds;
// Total seconds for the timer
const totalSeconds = (input1 * 60) + input2;

function startTime(val:number) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(initialTime)
    setInterval((()=>{
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime,currentTime);
        if (timeDifference <= 0) {
            console.log(chalk.redBright.bold("\t\t *********************Timer has expired***********************"))
            process.exit();
        }
        const minute = Math.floor((timeDifference/60));
        const seconds = Math.floor(timeDifference%60);
        console.log(chalk.yellowBright.bold(`\t\t${minute.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`))
    }) , 1000);
}
startTime(totalSeconds);