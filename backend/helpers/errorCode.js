import { errorTypes } from './errorConstants.js';

const getErrorCode = (errorName) => {
    return errorTypes[errorName]? errorTypes[errorName]: errorTypes['DEFAULT'];
}

export default getErrorCode;