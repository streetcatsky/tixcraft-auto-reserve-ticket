import debug from "debug";
import { debugMode } from '../../env.json'

const error = debug("Error");
const info = debug("Info");
const warn = debug("Warn");

error.color = '1'
info.color = '2'
warn.color = '3'
if (debugMode) {
    error.enabled = true;
    info.enabled = true;
    warn.enabled = true;
}

error('Debug Mode On !')
info('Debug Mode On !')
warn('Debug Mode On !')

export default {
    error,
    info,
};

console.warn
