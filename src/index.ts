

import debugLog from './config/debugLog'
import HandlePuppeteer from './library/HandlePuppeteer'
import config from '../env.json'


new HandlePuppeteer(config.targetUrl).run()

debugLog.info('Hello World')