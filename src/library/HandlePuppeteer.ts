import puppeteer from 'puppeteer';
import debugLog from '../config/debugLog'
import delay from 'delay';
class HandlePuppeteer {
    private tixcraftHome: string
    private targetUrl: string;
    private gameDate: string;
    private seatType: string;
    private ticketNumber: string
    private targetGameIndex!: number
    private browser!: puppeteer.Browser
    private page!: puppeteer.Page
    constructor({
        targetUrl,
        gameDate,
        seatType,
        ticketNumber,
    }: {
        targetUrl: string,
        gameDate: string,
        seatType: string
        ticketNumber: string
    }) {

        this.targetUrl = targetUrl.replace('/detail/', '/game/');
        this.gameDate = gameDate;
        this.ticketNumber = ticketNumber;
        this.tixcraftHome = 'https://tixcraft.com/'
        this.seatType = seatType
    }

    async run() {

        await this.init()
        await this.checkIsLogin();
        await this.findTargetGameIndex();
        await this.checkTicketIsOnSale();
        await this.setSeat();
        await this.setTicketNumber();
        await this.autoCheckAgree();
        await this.focusCerifyCode();
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            defaultViewport: null,
            userDataDir: "./userData",
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        });
        this.page = await this.browser.newPage();
    }

    async checkIsLogin() {

        debugLog.info('檢查登入狀態...')
        await this.page.goto(this.tixcraftHome, { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector('.user-name', { timeout: 600000 });
        debugLog.succe('會員已登入')
    }

    async findTargetGameIndex() {

        debugLog.info('目標場次: ', this.gameDate)
        debugLog.info('定位索引...')

        await this.page.goto(this.targetUrl, { waitUntil: 'domcontentloaded' });
        const gameDateList = await this.page.$$eval('.fcTxt > td:first-child', tds => tds.map(td => td.innerHTML))
        this.targetGameIndex = gameDateList.findIndex(gameDate => gameDate.includes(this.gameDate))

        if (this.targetGameIndex === -1) {

            debugLog.error('找不到場次')
            debugLog.error('請確認演出時間並重新執行')
            process.exit(1)
        } else {
            debugLog.succe('找到目標(索引): ', this.targetGameIndex)
        }

    }

    async checkTicketIsOnSale() {

        debugLog.info('檢查是否開賣...')

        while (await this.page.$(`[name="yt${this.targetGameIndex}"]`) === null) {
            debugLog.warn('淡定 深呼CCC 尚未開賣 一秒後自動刷新')
            await delay(1000)
            await this.page.reload({ waitUntil: 'domcontentloaded' })
        }

        debugLog.info('開賣LAAA ~~~ 快搶')
    }

    async setSeat() {

        debugLog.info('尋找座位類型: ' + this.seatType)

        this.page.click(`[name="yt${this.targetGameIndex}"]`)
        await this.page.waitForSelector('.area-list')

        const seatID = await this.page.evaluate((seatType) => {

            const seatList = Array.from(document.querySelectorAll('.area-list > li > a'))
            const targetSeatIndex = seatList.findIndex(element => element.innerHTML.includes(seatType))

            return seatList[targetSeatIndex].id
        }, this.seatType);
        debugLog.succe('找到座位類型')
        debugLog.succe('id: ', seatID)
        await this.page.click(`[id="${seatID}"]`, { clickCount: 2 })
    }

    async setTicketNumber() {
        debugLog.info('設定票數: ' + this.ticketNumber)
        await this.page.waitForSelector('.mobile-select')
        await this.page.select('.mobile-select', this.ticketNumber)
        debugLog.succe('票數設定完成')
    }

    async autoCheckAgree() {
        debugLog.info('勾選我同意確認框 ...')
        await this.page.waitForSelector('#TicketForm_agree')
        await this.page.click('#TicketForm_agree')
    }

    async focusCerifyCode() {
        await this.page.waitForSelector('#TicketForm_verifyCode')
        await this.page.focus('#TicketForm_verifyCode')
    }
}

export default HandlePuppeteer;

