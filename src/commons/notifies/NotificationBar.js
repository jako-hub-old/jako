import React from 'react';
import { 
    StyleSheet,    
} from 'react-native';
import {
    View,
} from 'native-base';
import Notify from './Notify';

class NotificationBar extends React.Component {
    state = {
        notifications : [
            {id : "hello", title : "hello", message : "hello"}
        ],
    };

    componentDidMount() {
        setTimeout(() => {
            this.addNotify();
        }, 1000);
    }

    addNotify() {
        const newNotify = {id : "hello", title : "hello", message : "hello"};
        this.setState(({notifications}) => ({
            notifications : [newNotify, ...notifications],
        }));
    }

    onCloseNotify() {
        const notifications = [...this.state.notifications];
        notifications.splice(0);
        this.setState({
            notifications,
        });
    }
    
    render() {
        const {notifications} = this.state;
        const [notificationToShow] = notifications;
        return (
            <View style = { styles.root }>
                {notificationToShow && (
                    <Notify 
                        message     = { notificationToShow.message  }
                        title       = { notificationToShow.title    }
                        onClose     = { this.onCloseNotify.bind(this) }
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        position : 'absolute',
        top : 0,
        left : 0,
        right : 0,
    },    
});

export default NotificationBar;