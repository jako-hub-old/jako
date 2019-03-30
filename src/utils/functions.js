import {
    Toast,
} from 'native-base';

export const consoleError = (type, response) => {
    console.clear();
    console.group(type);
    console.log(response);
    console.groupEnd();
};

export const consoleInfo = (type, response) => {
    console.group(type);
    console.info(response);
    console.groupEnd();
};

export const replaceSpaces = (str, replacement) => {
    return str.replace(/ /g, replacement);
};

export const addMessage = text => Toast.show({text, duration : 3000});

export const isValidEmail = (email) => {
    const re = /^\S+@([a-zA-Z0-9]+)\.{1}([a-zA-Z]){2,3}(\.[a-zA-Z]{2})?$/;
    if(email === '') return true;
    return re.test(email);
};