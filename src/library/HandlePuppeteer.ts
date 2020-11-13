import puppeteer from 'puppeteer';


class HandlePuppeteer {

    private targetUrl: string;
    private browser!: puppeteer.Browser
    private page!: puppeteer.Page
    constructor(targetUrl: string) {

        this.targetUrl = targetUrl;

    }

    async run() {

        await this.init()
        //this.page.select('#gameList')
        console.log(await this.page.$('#gameList'))
        //this.page.$('#gameList')
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
        await this.page.goto(this.targetUrl);
        //await this.page.setViewport({ width: 1920, height: 1080 });
        // await this.page.waitForSelector('#gameList');
    }

    checkIsLogin() {

    }

}

export default HandlePuppeteer;

