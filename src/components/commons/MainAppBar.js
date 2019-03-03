import React from 'react';
import {
    Header,
    Body,
    Button,
    Left,
    Right,
    Title,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MainAppBar = ({navigation}) => (
    <Header>
        <Left>
            <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={18}/>
            </Button>
        </Left>
        <Body>
            <Title>OPlay</Title>
        </Body>
        <Right>
            <Button transparent>
                <Icon style={styles.icon} name="ellipsis-v" size={18}/>
            </Button>
        </Right>
    </Header>
);
MainAppBar.propTypes = {
    navigation : PropTypes.object.isRequired,
};
export default MainAppBar;