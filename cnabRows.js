'use strict';
import path from 'path'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url';

import yargs from 'yargs'
import chalk from 'chalk'

const optionsYargs = yargs(process.argv.slice(2))
  .usage('Uso: $0 [options]')
  .option("f", { alias: "from", describe: "posição inicial de pesquisa da linha do Cnab", type: "number", demandOption: true })
  .option("t", { alias: "to", describe: "posição final de pesquisa da linha do Cnab", type: "number", demandOption: true })
  .option("s", { alias: "segmento", describe: "tipo de segmento", type: "string", demandOption: true })
  .example('$0 -f 21 -t 34 -s p', 'lista a linha e campo que from e to do cnab')
  .argv;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.resolve(`${__dirname}/cnabExample.rem`)

const { from, to, segmento } = optionsYargs

const sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions)

const messageLog = (segmento, segmentoType, from, to) => `
----- Cnab linha ${segmentoType} -----

posição from: ${chalk.inverse.bgBlack(from)}

posição to: ${chalk.inverse.bgBlack(to)}

item isolado: ${chalk.inverse.bgBlack(segmento.substring(from - 1, to))}

item dentro da linha P: 
  ${segmento.substring(0, from)}${chalk.inverse.bgBlack(segmento.substring(from - 1, to))}${segmento.substring(to)}

----- FIM ------
`

const log = console.log

console.time('leitura Async')
readFile(file, 'utf8')
  .then(file => {
    const cnabArray = file.split('\n')

    const cnabHeader = sliceArrayPosition(cnabArray, 0, 2)

    const [cnabBodySegmentoP, cnabBodySegmentoQ, cnabBodySegmentoR] = sliceArrayPosition(cnabArray, 2, -2)

    const cnabTail = sliceArrayPosition(cnabArray, -2)

    if (segmento === 'p') {
      log(messageLog(cnabBodySegmentoP, 'P', from, to))
      return
    }

    if (segmento === 'q') {
      log(messageLog(cnabBodySegmentoQ, 'Q', from, to))
      return
    }

    if (segmento === 'r') {
      log(messageLog(cnabBodySegmentoR, 'R', from, to))
      return
    }

  })
  .catch(error => {
    console.log("🚀 ~ file: cnabRows.js ~ line 76 ~ error", error)
  })
console.timeEnd('leitura Async')



// const bodyPQR = (conditional) => {

//   let sliceTotal = 0
//   let body = []

//   while (sliceTotal <= conditional) {
//     body.push(sliceArrayPosition(cnabBodyPQR, sliceTotal, sliceTotal + 3))
//     sliceTotal = sliceTotal + 3
//   }

//   return body
// }

// const header = {
//   controle: {
//     banco: [0, 3],
//     lote: [3, 7],
//     registro: [8, 8],
//   },
//   servico: {
//     operacao: [9, 9],
//     servico: [10, 11],
//     CNAB: [12, 13],
//     layout: [14, 16]
//   },
//   CNAB: [17, 17]
// }

// 4.72ms
// console.time('tempo de execucao com slice')
// console.log(`----- slice ----- \x1b[32m${sliceArrayPosition(cnabHeader[0], ...header.controle.banco).join('')}\x1b[0m${sliceArrayPosition(cnabHeader[0], 3).join('')} slice`);
// console.timeEnd('tempo de execucao com slice')

// 0.272ms
// console.time('tempo de execucao com subString')
// console.log(`----- substring ----- \x1b[32m${cnabHeader[1].substring(0, 3)}\x1b[0m${cnabHeader[0].substring(3)} substring`);
// console.timeEnd('tempo de execucao com subString')

// console.log("🚀 ~ file: cnabRows.js ~ line 99 ~ header", sliceArrayPosition(cnabHeader[1], ...header.controle.banco).join(''))
// console.log("🚀 ~ file: cnabRows.js ~ line 99 ~ header", sliceArrayPosition(cnabHeader[1], ...header.controle.lote).join(''))
// console.log("🚀 ~ file: cnabRows.js ~ line 99 ~ header", sliceArrayPosition(cnabHeader[1], ...header.controle.registro).join(''))

// console.log("🚀 ~ file: cnabRows.js ~ line 99 ~ header", sliceArrayPosition(cnabHeader[1], ...header.servico.operacao))
// console.log("🚀 ~ file: cnabRows.js ~ line 99 ~ header", sliceArrayPosition(cnabHeader[1], ...header.servico.servico))
// console.log("🚀 ~ file: cnabRows.js ~ line 99 ~ header", sliceArrayPosition(cnabHeader[1], ...header.servico.layout))
// console.log("🚀 ~ file: cnabRows.js ~ line 99 ~ header", sliceArrayPosition(cnabHeader[1], ...header.servico.CNAB))
// console.log("🚀 ~ file: cnabRows.js ~ line 99 ~ header", sliceArrayPosition(cnabHeader[1], ...header.CNAB))

// const inbound240 = {
//   options: {
//     initialLine: 1,
//     idConfiguration: {
//       from: 1,
//       to: 1,
//       type: 'string'
//     }
//   }
// }