import { Permissions } from 'expo'
import NetInfo from "@react-native-community/netinfo";

import {
  NOTIFICATIONS,
  USER_FACING_NOTIFICATIONS,
  LOCATION,
  CAMERA,
  AUDIO_RECORDING,
  CONTACTS,
  CAMERA_ROLL,
  CALENDAR,
  REMINDERS,
  SYSTEM_BRIGHTNESS,  
} from './constants'

const permissionMap = permission => {
  switch (permission) {
    case NOTIFICATIONS:
      return Permissions.NOTIFICATIONS
    case USER_FACING_NOTIFICATIONS:
      return Permissions.USER_FACING_NOTIFICATIONS
    case LOCATION:
      return Permissions.LOCATION
    case CAMERA:
      return Permissions.CAMERA
    case AUDIO_RECORDING:
      return Permissions.AUDIO_RECORDING
    case CONTACTS:
      return Permissions.CONTACTS
    case CAMERA_ROLL:
      return Permissions.CAMERA_ROLL
    case CALENDAR:
      return Permissions.CALENDAR
    case REMINDERS:
      return Permissions.REMINDERS
    case SYSTEM_BRIGHTNESS:
      return Permissions.SYSTEM_BRIGHTNESS
    case INTERNET:
      return 
    default:
      return null
  }
}

async function ourAskAsync(permission){
  return permission == "INTERNET" ? {status : NetInfo.isConnected()} : Permissions.askAsync(permission);
}

export default permissionMap