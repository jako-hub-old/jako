import React from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    View,
} from 'react-native';
import Item from './item';

const Results = ({results=[], onSelectItem,}) => (
    <ScrollView style={{marginTop : 15, flex : 1, flexDirection: "column"}}>
        {results.map((item, key) => (
            <Item 
                key         = {`${item.code}-${key}`} 
                onSelect    = {onSelectItem}
                item        = {item}
            />
        ))}        
    </ScrollView>
);

Results.propTypes = {
    results : PropTypes.array.isRequired,
    onSelectItem : PropTypes.func,
};

export default Results;