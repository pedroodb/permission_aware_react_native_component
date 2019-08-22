import React, { Component } from 'react'
import { Permissions } from 'expo'
import constants, {
  NONE,
  ANY,
  WIFI,
  CELLULAR,
} from './constants'
import { NetInfo } from 'react-native'

import permisionMap from './PermissionMap'

class PermissionAwareComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      componentToRender:props.defaultComponent,
    }
  }

  async handleConnection(connectionRequire){
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
  
  async handleComponentEvaluation({permission,connectionRequire,component}) {
    const { status } = Array.isArray(permission) ?
      await Permissions.askAsync(...permission.map(each => permisionMap(each))) :
      await Permissions.askAsync(permisionMap(permission))
    const connection = await this.handleConnection(connectionRequire)
    if (status !== 'denied' && connection) this.setState(() => ({componentToRender:(component)}))
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