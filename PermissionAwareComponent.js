import React, { Component } from 'react'
import { Permissions } from 'expo'

class PermissionAwareComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      componentToRender:props.defaultComponent
    }
  }

  async handleComponentEvaluation({permission,component}) {
    const { Permissions } = Expo
    const { status } = (await Permissions.askAsync(permission))
    status ? this.setState(() => ({componentToRender:(component)})) : null
  }

  async componentDidMount() {
    const {
      permissionComponentList
    } = this.props

    permissionComponentList.forEach(this.handleComponentEvaluation.bind(this))
  }

  render() {

    const {
      componentToRender
    } = this.state
    
    return componentToRender

  }

}

export default PermissionAwareComponent