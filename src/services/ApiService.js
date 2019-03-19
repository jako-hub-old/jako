import {API_SERVER} from 'react-native-dotenv';

/**
 * This service allows to execute simple api fetchs
 *
 * @class ApiService
 */
class ApiService {

    /**
     * This function allows to execute a post request.
     *
     * @param {*} path
     * @param {*} data
     * @returns
     * @memberof ApiService
     */
    doPost(path, data) {
        data.headers = {
            "Content-type": "application/json",
        };
        data.method = "POST";
        return this.doRequest(path, data);
    }

    /**
     * This function allows to execute a get request.
     *
     * @param {*} path
     * @returns
     * @memberof ApiService
     */
    doGet(path) {
        return this.doRequest(path);
    }

    /**
     * This function allows to execute a simple javascript request.
     *
     * @param {*} path
     * @param {*} [data={}]
     * @returns
     * @memberof ApiService
     */
    doRequest(path, data={}) {
        return new Promise((resolve, reject) => {
            const url = `${API_SERVER }${path}`;
            fetch(url, data)
            .then(response => response.json())
            .then(response => {
                resolve(response);
            })
            .catch(response => {
                reject(response);
            });
        });
    }
};

export const Api = new ApiService();