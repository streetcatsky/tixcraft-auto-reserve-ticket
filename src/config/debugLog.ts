import debug from "debug";
import { debugMode } from '../../env.json'

const error = debug("Error");
const info = debug("Info");
const warn = debug("Warn");
const succe = debug("Succe");

info.color = '0'
error.color = '1'
succe.color = '2'
warn.color = '3'

if (debugMode) {
    error.enabled = true;
    info.enabled = true;
    warn.enabled = true;
    succe.enabled = true;
}

// error('Debug Mode On !')
// info('Debug Mode On !')
// warn('Debug Mode On !')
// succe('Debug Mode On !')

export default {
    error,
    info,
    warn,
    succe
};

