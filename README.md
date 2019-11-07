# Permission Aware React Native Component

A react native component that receives a list of pairs ('expo permission constant', component), and will render the component that first maches a permission that has been granted, or will ask the user for ir otherwise.

Install using 'yarn add permission_aware_react_native_component' or 'npm install permission_aware_react_native_component'

# How to Use

For use this component you must import in to your project like this:

``` 
import { PermissionAwareComponent } from 'permission_aware_react_native_component'
``` 

A list should be declared that is composed of dictionaries that specify in order of priority the alternatives of components to render with their respective restrictions.

The possible permissions to be used are declared in PermissionConstants and can be imported:

```
import { PermissionConstants } from 'permission_aware_react_native_component'
```
Each directory will contain a list of required permissions (* permission *) and the component to render (* component *). For example:

```
componentList = [
      ({
        permission:[PermissionConstants.LOCATION],
        component:(<GPSLocComponent _setLocation={this._setLocation.bind(this)} toggleMap={this.toggleMap} />)
      }),
      ({
        component:(<ManualLocComponent _setLocation={this._setLocation.bind(this)} currentCoord={this.getMapRegion} toggleMap=         {this.toggleMap} />)
      }),
    ]
```

A component may not need permissions to render, in this case it is not necessary to declare the key * permission *.

Also, if some type of specific connection is required, you can add the * connectionRequire * key. For example, to add it to the previous list:

```
componentList = [
      ({
        permission:[PermissionConstants.LOCATION],
        connectionRequire:PermissionConstants.WIFI,
        component:(<GPSLocComponent _setLocation={this._setLocation.bind(this)} toggleMap={this.toggleMap} />)
      }),
      ({
        component:(<ManualLocComponent _setLocation={this._setLocation.bind(this)} currentCoord={this.getMapRegion} toggleMap=         {this.toggleMap} />)
      }),
    ]
```

The constants that specify the connection are also declared in PermissionConstants. Permission can be requested for Wi-Fi, any, cellular (specifying if the connection will be 4g, 3g or 2g) or if none is desired, none
If necessary, it can be clarified that if the activated energy saving mode is found, it shows a component


```
  componentList = [
    ({
      permission:[PermissionConstants.LOCATION],
      connectionRequire:PermissionConstants.WIFI,
      battteryLevelRequire: PermissionConstants.NO_POWER_SAVER,
      component:(<GPSMap navigation={this.props.navigation} />)
    }),
    ({
      permission:undefined,
      connectionRequire:PermissionConstants.WIFI,
      battteryLevelRequire: PermissionConstants.NO_POWER_SAVER,
      component:(<ManualMap navigation={this.props.navigation} />)
    }),
  ]
```
