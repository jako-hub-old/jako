export const consoleError = (type, response) => {
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