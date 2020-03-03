import { Platform, Linking } from 'react-native'

export default OpenApp = params => {
  if (params.type === 'whatsapp') {
    const oldNumber = params.number.toString()
    let newNumber = oldNumber
    if(oldNumber[0] == '0')
      newNumber = '+62' + oldNumber.substring(1, oldNumber.length)

    console.log(newNumber)
    return Linking.openURL(`whatsapp://send?phone=${newNumber}`)
  } else if (params.type === 'sms') {
    return Linking.openURL(`sms:${params.number}${getSMSDivider()}body=${params.message}`)
  }
}

function getSMSDivider () {
  return Platform.OS === 'ios' ? '&' : '?'
}
