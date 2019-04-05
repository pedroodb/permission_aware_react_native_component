import React, { Component } from 'react'
import { Permissions } from 'expo'

class PermissionAwareComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      componentToRender:props.defaultComponent,
    }
  }

  async handleComponentEvaluation({permission,component}) {
    const { status } = (await Permissions.askAsync(permission))
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

export default PermissionAwareComponent