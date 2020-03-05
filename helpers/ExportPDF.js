import { Alert, Linking } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'

export default ExportPDF = (urlDownload, fileName) => {
  Linking.canOpenURL(urlDownload)
    .then(supported => {
      if (!supported) {
        Alert.alert('Perhatian!', 'File PDF tidak dapat diunduh!')
      } else {
        const fileUri = FileSystem.documentDirectory + fileName
        FileSystem.downloadAsync(
          urlDownload,
          fileUri
        )
          .then(async stat => {
            console.log("Download Status: ", stat)

            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status === 'granted') {
              const asset = await MediaLibrary.createAssetAsync(stat.uri)
              await MediaLibrary.createAlbumAsync("Download", asset, false)
            } else {
              Alert.alert('ERROR!', 'Aplikasi tidak diizinkan untuk menyimpan data!')
            }
          })
          .catch(err => {
            console.log('Error Download: ', err)
          })
        // return Linking.openURL(result.data)
      }
    })
    .catch(err => {
      console.log("Error Download PDF: ", err)
      Alert.alert('Perhatian!', 'File PDF tidak dapat diunduh!')
    })
}
