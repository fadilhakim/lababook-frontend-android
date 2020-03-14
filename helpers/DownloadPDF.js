import { Linking, Alert } from 'react-native'

export default DownloadPDF = url => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('File PDF tidak dapat diunduh!')
      } else {
        return Linking.openURL(url)
      }
    })
    .catch(err => console.log(err))
}
