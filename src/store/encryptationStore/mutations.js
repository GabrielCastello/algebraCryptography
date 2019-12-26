// export function clearData (state) {
//   state.srcText = undefined
//   state.unicodedNumbersFrom_srcText = undefined
//   state.encryptedText = undefined
// }

// export function setSrcString (state, srcString) {
//   state.srcText = srcString
// }

// export function getMatrixFromText (state) {
//   let arr = []
//   for (var i = 0; i < state.srcText.length; i++) {
//     arr[i] = state.srcText.charCodeAt(i)
//   }
//   // console.log('TCL: CryptoController -> getMatrixFromText -> arr', arr)
//   state.encryptData.matrixFromString = arr
//   // return this.getMatrixFromArray(arr, srcString);
// }

// export function getMatrixFromArray (state) {
//   let arr = state.encryptData.matrixFromString
//   var matrix = []
//   for (var i = 0; i < state.rows; i++) matrix[i] = []

//   for (var j = 0; j < arr.length; j++) {
//     matrix[j % state.rows][Math.floor(j / state.rows)] = arr[j]
//   }

//   if (arr.length % state.rows !== 0) {
//     for (var k = arr.length % state.rows; k < state.rows; k++) {
//       matrix[k][Math.floor((arr.length - 1) / state.rows)] = 0
//     }
//   }
//   state.encryptData.matrixFromArray = matrix
// }

// export function multiplyMatrices (state) {
//   let m1 = state.encodingMatrix
//   let m2 = state.encryptData.matrixFromArray

//   var matrix = []
//   for (var h = 0; h < m1.length; h++) matrix[h] = []

//   for (var i = 0; i < m1.length; i++) {
//     for (var j = 0; j < m2[0].length; j++) {
//       matrix[i][j] = 0
//       for (var k = 0; k < m1[0].length; k++) {
//         matrix[i][j] += m1[i][k] * m2[k][j]
//       }
//     }
//   }
//   state.encryptData.multipliedMatrix = matrix
// }

// export function getNumbersFromMatrix (state) {
//   let matrix = state.encryptData.multipliedMatrix

//   var text = ''
//   for (var j = 0; j < matrix[0].length; j++) {
//     for (var i = 0; i < matrix.length; i++) {
//       text += matrix[i][j].toString() + ' '
//     }
//   }
//   state.encryptData.encryptedNumbers = text
// }

// export function numberToChar (state) {
//   let text = state.encryptData.encryptedNumbers
//   var result = ''
//   for (var i = 0; i < text.length; i++) {
//     result += String.fromCharCode(
//       text.charCodeAt(i) + (text.charCodeAt(i) === 32 ? 33 : 21)
//     )
//   }
//   state.encryptData.encryptedText = result
// }

// /* Decrypt */

// export function charToNumber (state, encryptedData) {
//   state.encryptedData = encryptedData
//   let text = state.encryptedData
//   var result = ''
//   for (var i = 0; i < text.length; i++) {
//     result += String.fromCharCode(
//       text.charCodeAt(i) - (text.charCodeAt(i) === 65 ? 33 : 21)
//     )
//   }
//   state.decryptData.encryptedNumbers = result
// }

// export function getMatrixFromNumbers (state) {
//   let text = state.decryptData.encryptedNumbers

//   var i = 0
//   var numbers = text.split(' ')
//   while (i < numbers.length) {
//     if (numbers[i].replace(/s+/g, '') === '') numbers.splice(i, 1)
//     else i++
//   }
//   var arr = []
//   for (var j = 0; j < numbers.length; j++) arr[j] = parseInt(numbers[j])

//   state.decryptData.getMatrixFromNumbers = arr
// }

import CryptoController from '../../controller/Encryption'

export function encryptData (state, nonEncryptedData) {
  state.nonEncryptedData = nonEncryptedData
  state.encryptedData = new CryptoController().encryptText(nonEncryptedData)
}

export function decryptData (state, encryptedData) {
  state.encryptedData = encryptedData
  state.nonEncryptedData = new CryptoController().decryptText(encryptedData)
}
