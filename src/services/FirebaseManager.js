import React from 'react';
import PropTypes from 'prop-types';
import { withSession } from '../providers';
import firebase from 'react-native-firebase';
import { addMessage } from '../utils/functions';

class FirebaseManager extends React.PureComponent {

    componentDidMount() {
        this.checkpermission();
        this.createNotificationListeners();
    }

    componentWillUnmount() {
    }

    //Remove listeners allocated in createNotificationListeners()
    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

    async createNotificationListeners() {
        /**
         * This function triggers a simple notification in the application in foreground.
         */
        this.notificationListener = firebase.notifications().onNotification(notification => {
            const {title, body} = notification;
            this.showAlert(title, body);
        });

        /**
         * If your application is in background you can listen for when a notification is tapped.
         */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
            const { title, body } = notificationOpen.notification;
            this.showAlert(title, body);
        });

        /**
         * if the application is closed, you can check if it was opened by a notification.
         */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            //this.showAlert(title, body);
        }

       /*
        * Triggered for data only payload in foreground
        * */
        this.messagelistener = firebase.messaging().onMessage((message) => {
            console.log("Backgroun message: ", message);
        });
    }


    showAlert(title, body) {
        addMessage(`${title} : ${body}`);
    }
    
    /**
     * This function allows to ask for permission to firebase.
     *
     * @memberof FirebaseManager
     */
    async checkpermission() {
        const enabled = await firebase.messaging().hasPermission();
        if(enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    printMessage(message) {
        console.group("Firebase manager: ");
        console.log(message);
        console.groupEnd();
    }

    /**
     * This function validates and stores the firebase messaging cloud.
     *
     * @memberof FirebaseManager
     */
    async getToken() {    
        const {firebaseData} = this.props.sessionStack;
        let fcmToken = firebaseData.fcmToken;
        if(!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if(fcmToken) {
                this.props.sessionWrite("firebaseData", {...firebaseData, fcmToken});
                this.printMessage("Token stored!");
            } else {
                this.printMessage("Cannot get the token");
            }
        } else {
            this.printMessage("Token available");
        }
    }

    /**
     * This function request permissions to the firebase messaging cloud.
     *
     * @memberof FirebaseManager
     */
    async requestPermission() {
        try {
            await firebase.messaging.requestPermission();
            this.getToken();
        } catch(err) { 
            console.log("Error: ", err);
        }
    }

    render () {
        const {children} = this.props;
        return (
            <>
                {children}
            </>
        );
    }
}

FirebaseManager.propTypes = {
    sessionWrite        : PropTypes.func,
    sessionWriteAll     : PropTypes.func,
    sessionStack        : PropTypes.object,
};

export default withSession(FirebaseManager);