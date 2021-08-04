const {
    app,
    BrowserWindow       
} = require('electron')
const path = require('path')
const puppeteer = require('puppeteer');
const fsp = require('fs/promises');
const fs = require('fs');
const unzipper = require('unzipper');
const rtfParse = require('rtf-parse');
//const epub = require('epub');

(async (language, month) => {
    const data = await fsp.readdir(path.join(__dirname, 'files'))
    console.log(data)
    data.forEach(async (element) => {
        try {
            console.log(element);
            fs.unlinkSync(path.join(__dirname, 'files', element))
        }
        catch (error) {
            console.log("running cacth")
            await fsp.rmdir(path.join(__dirname, 'files', element), {recursive: true})
        }
        
    });
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(`Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4272.0 Safari/537.36`);
    await page.goto('https://www.jw.org/en/');
    const lang =await page.waitForSelector('.tertiaryButton.siteFeaturesItem.jsChooseSiteLanguage', {timeout:0});
    await lang.click()
    await page.waitForTimeout(2000)
    await page.type('input.jsAutoCompleteInput.jsSiteLangAutoComplete', language, {delay: 20})
    await page.waitForTimeout(2000)
    page.click('.jsAutoCompleteContainer>ul>li')
    await page.waitForNavigation({waitUntil: "domcontentloaded"});
    page.click('#primaryNavRegion>nav>ul>li:nth-child(3)')
    await page.waitForTimeout(2000)
    page.click('.iconLink-icon.jwIcon.mid1011529')
    await page.waitForTimeout(3000)
    page.click(`.synopsis.publication.pub-mwb.iss-2021${month}>div.syn-body.publication>div.downloadLinks>div.digitalPubFormat>a`);
    await page.waitForTimeout(2000)
    page.click(`div.fileTypeButtonContainer>span>a.secondaryButton[data-type="RTF"]`)
    await page.waitForTimeout(2000)
    const zip_link=await page.$(`div.downloadFiles>div.fileContainer[data-fileformat="RTF"]:nth-child(1)>a`)
    await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: path.join(__dirname, 'files')});
    await zip_link.click({ clickCount: 1, delay: 100 });
    await page.waitForTimeout(2000)
    await browser.close();
    console.log('finished');
    const folder = await fsp.readdir(path.join(__dirname, 'files'))
    folder.forEach(async (element) => {
        const pipe=fs.createReadStream(path.join(__dirname, 'files', element)).pipe(unzipper.Extract({ path: path.join(__dirname, 'files', 'workbook') })).on('finish', async ()=>{
            console.log("start searching")            
            const workbook = await fsp.readdir(path.join(__dirname, 'files', 'workbook'))
            workbook.forEach(async (element) => {
                rtfParse.parseFile( path.join(__dirname, 'files', 'workbook', element) )
                .then( doc => {
                    const children=doc.getChildren()
                    console.log(children.length)
                } );
            })
        })
    });
})('Français', '09');

let win



function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 500,
        minHeight: 200,
        acceptFirstMouse: true,
        titleBarStyle: 'hidden',
        frame: false,
        title: "Ministry Board",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    win.loadFile('index.html')
    win.openDevTools()
    win.setTitle('Ministry Board')
}

app.name = 'Ministry Board'
app.setAboutPanelOptions({
    applicationName:'Ministry Board'
});
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})