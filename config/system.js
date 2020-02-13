import * as Device from 'expo-device'

export const osVersion = Device.osVersion
export const platformApiLevel = Device.platformApiLevel

export const textExtraProps = {
  ...(platformApiLevel >= 29 && {
    textBreakStrategy: 'simple'
  })
}
