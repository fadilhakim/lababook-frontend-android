import { ToastAndroid } from 'react-native'

function showErrorBottom (message) {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM
  )
}

export {
  showErrorBottom
}
