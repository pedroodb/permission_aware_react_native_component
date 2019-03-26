import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PermissionAwareComponent from './PermissionAwareComponent'

import { Permissions } from 'expo'

const componentList = [
  ({permission:Permissions.CAMERA,component:(<Text>Tengo permisos de camara</Text>)}),
  ({permission:Permissions.AUDIO_RECORDING,component:(<Text>Tengo permisos de grabacion de audio</Text>)}),
  ({permission:Permissions.CONTACTS,component:(<Text>Tengo permiso de acceder a contactos</Text>)}),
]

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PermissionAwareComponent permissionComponentList={componentList} defaultComponent={(<Text>Componente default</Text>)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
