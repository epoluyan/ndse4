#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs/promises');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const input = readline.createInterface(process.stdin);
const argv = yargs(hideBin(process.argv)).argv;
const fileName = argv?._[0];

async function writeLogs(logs) {
  let data = null;
  try {
    data = JSON.parse(await fs.readFile(fileName, 'utf-8'));
  } catch(err) {
    console.log(err);
  }
  if (data) {
    data.quantityGame = data.quantityGame + 1;
    data.game.push(logs);
    await fs.writeFile(fileName, JSON.stringify(data));
  }
}

fs.access(fileName)
    .then(() => console.log(`Файл ${fileName} существует. Введите число 0 или 1`))
    .catch(()=> {
      const initialData = {
        quantityGame: 0,
        game: []
      }
      fs.writeFile('fileName', JSON.stringify(initialData))
          .then(() => console.log(`Файл ${fileName} создан. Введите число 0 или 1`));
    });
input.on('line', (data) => {
  if (data === 'next') {
    console.log('Введите число 0 или 1');
    return;
  }
  if (data === 'end') {
    process.exit();
  }
  const randomNumber = Math.round(Math.random());
  game(data, randomNumber)
});
input.on('close', (data) => console.log(data));

function game(data, number) {
  if (+data === number ) {
    console.log(`Вы выиграли, загаданное число ${data}. Начать новую игру введите 'next', чтобы закончить 'end'`);
    writeLogs({
      win: 1,
      lose: 0
    })
  } else {
    console.log(`Вы проиграли, загаданное число ${data}.  Начать новую игру введите 'next', чтобы закончить 'end'`);
    writeLogs({
      win: 0,
      lose: 1
    })
  }
}
