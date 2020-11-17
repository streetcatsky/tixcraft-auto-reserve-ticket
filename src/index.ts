import config from '../env.json'


import('./library/HandlePuppeteer')
    .then(res => {
        new res.default({
            targetUrl: config.targetUrl,
            gameDate: config.gameDate,
            seatType: config.seatType,
            ticketNumber: config.ticketNumber
        }).run()
    })


