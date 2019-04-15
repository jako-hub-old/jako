import React from 'react';
import PropTypes from 'prop-types';
import { 
    StyleSheet,    
} from 'react-native';
import {
    View,
} from 'native-base';
import Notify from './Notify';
import { withNotifies } from '../../providers';

class NotificationBar extends React.Component {
    state = {
        notifications : [
            {id : "hello", title : "hello", message : "hello"}
        ],
    };

    componentDidMount() {
        /**/
        setTimeout(() => {
            this.props.notify({title : "hello", message : "hello"});            
        }, 1000);
        
    }

    onCloseNotify({id}) {
        this.props.removeNotify(id);
    }
    
    render() {
        const {notifications=[]} = this.props;
        const [notificationToShow] = notifications;
        return (
            <View style = { styles.root }>
                {notificationToShow && (
                    <Notify 
                        message     = { notificationToShow.message  }
                        title       = { notificationToShow.title    }
                        onClose     = { () => this.onCloseNotify(notificationToShow) }
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

NotificationBar.propTypes = {
    notifications   : PropTypes.array, 
    notify          : PropTypes.func,
    removeNotify    : PropTypes.func,
    popNotify       : PropTypes.func,
    notifies        : PropTypes.arrayOf(PropTypes.shape({
        id          : PropTypes.any,
        title       : PropTypes.string,
        body        : PropTypes.string,
    })),
};

export default withNotifies(NotificationBar);