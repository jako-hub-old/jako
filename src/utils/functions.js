export const consoleError = (type, response) => {
    console.group(type);
    console.error(response);
    console.groupEnd();
};

export const consoleInfo = (type, response) => {
    console.group(type);
    console.info(response);
    console.groupEnd();
};