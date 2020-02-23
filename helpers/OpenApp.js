import { Platform, Linking } from 'react-native'

export default OpenApp = params => {
  if (params.type === 'whatsapp') {
    return Linking.openURL('whatsapp://app')
  } else if (params.type === 'sms') {
    return Linking.openURL(`sms:${params.number}${getSMSDivider()}body=${params.message}`)
  }
}

function getSMSDivider(): string {
  return Platform.OS === "ios" ? "&" : "?";
}
