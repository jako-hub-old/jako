import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Button,
    Text,
} from 'native-base';

const ButtonButton = ({children, disabled, light, primary, info, success, warning, danger, dark, styles:otherStyles}) => (
    <View>
        <Button 
            info     = { info   }
            primary  = { primary    }
            success  = { success    }
            warning  = { warning    }
            danger   = { danger }
            dark     = { dark }
            onPress  = {() => onSubmit && onSubmit({nombre : teamName, jugadores : players})}
            disabled = {disabled}
            style    = {{...styles.root, otherStyles}}
            >
            <Text style={{color : light? "#000" : "#FFF"}}>
                {children}
            </Text>
        </Button>
    </View>
);

const styles = StyleSheet.create({
    root : {
        paddingHorizontal : 20,
    },
});

ButtonButton.propTypes = {
    onPress : PropTypes.func,
    light   : PropTypes.bool, 
    primary : PropTypes.bool, 
    info    : PropTypes.bool,
    success : PropTypes.bool,
    warning : PropTypes.bool,
    danger  : PropTypes.bool,
    dark    : PropTypes.bool,
};

export default ButtonButton;