class CryptoController {
  constructor () {
    this.srcText = null
    this.unicodedNumbersFrom_srcText = null
    this.encryptedText = null

    this.encodingMatrix = [
      [1, -1, -1, 1],
      [2, -3, -5, 4],
      [-2, -1, -2, 2],
      [3, -3, -1, 2]
    ]
    this.decodingMatrix = [
      [6, -1, 0, -1],
      [22, -4, 1, -4],
      [14, -3, 1, -2],
      [31, -6, 2, -5]
    ]
  }

  getMatrixFromArray (arr, rows) {
    let matrix = []
    for (let i = 0; i < rows; i++) matrix[i] = []

    for (let i = 0; i < arr.length; i++) matrix[i % rows][Math.floor(i / rows)] = arr[i]

    if (arr.length % rows !== 0) { for (let i = arr.length % rows; i < rows; i++) matrix[i][Math.floor((arr.length - 1) / rows)] = 0 }

    return matrix
  }

  getMatrixFromText (text, rows) {
    // console.log('TCL: CryptoController -> getMatrixFromText -> text', text)
    let arr = []
    for (let i = 0; i < text.length; i++) arr[i] = text.charCodeAt(i)
    // console.log('TCL: CryptoController -> getMatrixFromText -> arr', arr)
    return this.getMatrixFromArray(arr, rows)
  }

  getTextFromMatrix (matrix) {
    let text = ''
    for (let j = 0; j < matrix[0].length; j++) { for (let i = 0; i < matrix.length; i++) text += matrix[i][j] > 0 ? String.fromCharCode(matrix[i][j]) : '' }
    return text
  }

  getMatrixFromNumbers (text, rows) {
    let i = 0
    let numbers = text.split(' ')
    while (i < numbers.length) {
      if (numbers[i].replace(/s+/g, '') === '') numbers.splice(i, 1)
      else i++
    }
    let arr = []
    for (let i = 0; i < numbers.length; i++) arr[i] = parseInt(numbers[i])

    return this.getMatrixFromArray(arr, rows)
  }

  getNumbersFromMatrix (matrix) {
    let text = ''
    for (let j = 0; j < matrix[0].length; j++) { for (let i = 0; i < matrix.length; i++) text += matrix[i][j].toString() + ' ' }
    return text
  }

  multiplyMatrices (m1, m2) {
    let matrix = []
    for (let i = 0; i < m1.length; i++) matrix[i] = []

    for (let i = 0; i < m1.length; i++) {
      for (let j = 0; j < m2[0].length; j++) {
        matrix[i][j] = 0
        for (let k = 0; k < m1[0].length; k++) matrix[i][j] += m1[i][k] * m2[k][j]
      }
    }
    return matrix
  }

  numberToChar (text) {
    let result = ''
    for (let i = 0; i < text.length; i++) { result += String.fromCharCode(text.charCodeAt(i) + (text.charCodeAt(i) === 32 ? 33 : 21)) }
    return result
  }

  charToNumber (text) {
    let result = ''
    for (let i = 0; i < text.length; i++) { result += String.fromCharCode(text.charCodeAt(i) - (text.charCodeAt(i) === 65 ? 33 : 21)) }
    return result
  }

  encryptText (text) {
    this.srcText = text
    /* Convert the srcText to an Matrix, converting char to charCode(unicode) */
    const matrixFromSrcText = this.getMatrixFromText(this.srcText, 4)
    /* Multiplies the source text matrix by the enconding matrix */
    const multipliedMatrix = this.multiplyMatrices(this.encodingMatrix, matrixFromSrcText)
    /* Converts the multiplied matrix to string */
    const numbersFromSrcText = this.getNumbersFromMatrix(multipliedMatrix)
    /* Converts the  multiplied matrix to an encryptedChar sequence */
    this.encryptedText = this.numberToChar(numbersFromSrcText)

    return this.encryptedText
  }

  getEncryptedText () {
    return this.encryptedText
  }

  decryptText (encryptedText) {
    /* Converts encrypted string to numbers */
    const encryptedNumbers = this.charToNumber(encryptedText)
    /* Converts numbers to matrix */
    let matrixFromText = this.getMatrixFromNumbers(encryptedNumbers, 4)
    /* Multiply encrypted matrix by the decondig matrix */
    let plainMatrixFromText = this.multiplyMatrices(this.decodingMatrix, matrixFromText)
    /* Convets unicode to char, revealing the encrypted text */
    let decryptedDataFromText = this.getTextFromMatrix(plainMatrixFromText)
    return decryptedDataFromText
  }
}

export default CryptoController
