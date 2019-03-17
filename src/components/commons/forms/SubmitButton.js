import React from 'react';
import {
     StyleSheet,
} from 'react-native';
import {
    Button,
} from 'native-base';
import stylesPalette from "../../../utils/stylesPalette";

const SubmitButton = ({children, ...otherProps}) => (
    <Button style={styles.btnRoot} {...otherProps} rounded >
        {children}
    </Button>
);

const palette = stylesPalette();

const styles = StyleSheet.create({
    btnRoot : {
        backgroundColor : palette.primary.color,
    },
});

export default SubmitButton;