export function encrypt ({ commit }, nonEncryptedData) {
  // console.log('TCL: encrypt -> nonEncryptedData', nonEncryptedData)
  commit('encryptData', nonEncryptedData)
  // commit('setSrcString', string)
  // commit('getMatrixFromText')
  // commit('getMatrixFromArray')
  // commit('multiplyMatrices')
  // commit('getNumbersFromMatrix')
  // commit('numberToChar')
}

export function decrypt ({ commit }, encryptedData) {
  // console.log('TCL: decrypt -> encryptedData', encryptedData)
  commit('decryptData', encryptedData)
  // commit('charToNumber', encryptedData)
}
