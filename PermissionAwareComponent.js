import React, { Component } from 'react'
import { Permissions } from 'expo'
import constants from './constants'

import permisionMap from './PermissionMap'

class PermissionAwareComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      componentToRender:props.defaultComponent,
    }
  }

  async handleComponentEvaluation({permission,component}) {
    const { status } = Array.isArray(permission) ?
      await Permissions.askAsync(...permission.map(each => permisionMap(each))) :
      await Permissions.askAsync(permisionMap(permission))
    status !== 'denied' ? this.setState(() => ({componentToRender:(component)})) : null
    return status
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