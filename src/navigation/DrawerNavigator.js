import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './Main';
import Sidebar from './Sidebar';

const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator
    drawerContent={(props) => <Sidebar {...props} />}
    >
        <Drawer.Screen name="Main"
        component={Main}
        options={{headerShown: false}} />
    </Drawer.Navigator>
  )
}
export default DrawerNavigation;
