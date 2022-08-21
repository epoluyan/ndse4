#!/usr/bin/env node

import readline from "readline";
const input = readline.createInterface(process.stdin);

input.on('line', (data) => {
  checkNumber(data)
});
input.on('close', (data) => console.log(data));

const randomNumber = Math.ceil(Math.random() * 100);
console.log('Загадано число в диапазоне от 0 до 100')

function checkNumber(num) {
  if (num > randomNumber) {
    console.log('Меньше');
  } else if (num < randomNumber) {
    console.log('Больше');
  } else {
    console.log('Отгадано число');
  }
}