import React, { Component } from 'react'
import { Permissions } from 'expo'

class PermissionAwareComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      componentToRender:props.defaultComponent
    }
  }

  async componentDidMount() {
    const {
      permissionComponentList
    } = this.props

    permissionComponentList.forEach((permission,component) =>
      Permissions.askAsync(permission) ? this.setState(() => ({componentToRender:component})) : null
    )
  }

  render() {

    const {
      componentToRender
    } = this.state
    
    return componentToRender

  }

}

export default PermissionAwareComponent