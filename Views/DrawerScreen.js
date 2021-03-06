import {
    DrawerNavigator
} from 'react-navigation';
import LogOut from './LogOut';
import MainMap from './MainMap';
import BusLines from './BusLines';
import RouteMap from './RouteMap';

const DrawerScreen = DrawerNavigator({
        'Map': {screen: MainMap},
        'Bus Lines': {screen: BusLines},
        'Log out': {screen: LogOut},
    },
    {
        headerMode: 'none'
    });

export default DrawerScreen;