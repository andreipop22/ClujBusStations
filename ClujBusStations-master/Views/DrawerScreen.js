import {
    DrawerNavigator
} from 'react-navigation';
import LogOut from './LogOut';
import MainMap from './MainMap';
import Tab from './BusLines';
import BuyTicket from './BuyTicket';

const DrawerScreen = DrawerNavigator({
        'Map': {screen: MainMap},
        'Bus Lines': {screen: Tab},
        'Buy Ticket':{screen:BuyTicket},
        'Log out': {screen: LogOut},
    },
    {
        headerMode: 'none'
    });

export default DrawerScreen;