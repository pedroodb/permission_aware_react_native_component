import React, { Component } from 'react'
import * as Permissions from 'expo-permissions'
import constants, {
  NONE,
  ANY,
  WIFI,
  CELLULAR,
  NO_POWER_SAVER,
} from './constants'
import { NetInfo } from 'react-native'
import * as Battery from 'expo-battery'

import permisionMap from './PermissionMap'

class PermissionAwareComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      componentToRender:props.defaultComponent,
    }
  }

  async handleBattery(battteryLevelRequire){
    if (battteryLevelRequire === NO_POWER_SAVER){
      return ! await Battery.isLowPowerModeEnabledAsync() 
    }else{
      return true
    }
  }

  async handleConnection(connectionRequire = ANY){
    const connectionInfo = await NetInfo.getConnectionInfo()
    switch (connectionRequire) {
      case WIFI:
        return NetInfo.isConnected && connectionInfo.type === WIFI
      case CELLULAR['4g']:
        return NetInfo.isConnected && connectionInfo.effectiveType === CELLULAR['4g']
      case CELLULAR['3g']:
        return NetInfo.isConnected && connectionInfo.effectiveType === CELLULAR['3g']
      case CELLULAR['2g']:
        return NetInfo.isConnected && connectionInfo.effectiveType === CELLULAR['2g']
      case ANY:
        return NetInfo.isConnected
      case NONE:
        return !NetInfo.isConnected
      default:
        return true
    }
  }
  
  async handleComponentEvaluation({permission,connectionRequire,battteryLevelRequire, component }) {
    const sufficientBattery = await this.handleBattery(battteryLevelRequire)
    const { status } = (permission !== undefined && sufficientBattery) ? 
      Array.isArray(permission) ?
        await Permissions.askAsync(...permission.map(each => permisionMap(each))) :
        await Permissions.askAsync(permisionMap(permission))
      : ({status:'granted'})
    const connection = await this.handleConnection(connectionRequire)
    if ((status === 'granted') && connection && sufficientBattery) this.setState(() => ({componentToRender:(component)}))
    return connection ? status : 'denied'
  }

  async askForPermissions(permissionComponentList, index) {
    if(index != permissionComponentList.length) {
      status = await this.handleComponentEvaluation(permissionComponentList[index])
      if(status === 'denied') {
        this.askForPermissions(permissionComponentList, index+1)
      }
    }
    
  }

  componentDidMount() {
    const {
      permissionComponentList
    } = this.props

    this.askForPermissions(permissionComponentList,0)
  }

  render() {

    const {
      componentToRender
    } = this.state
    
    return componentToRender

  }

}

export const PermissionAware = PermissionAwareComponent
export const PermissionConstants = constants

export default PermissionAwareComponent