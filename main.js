const {
    app,
    BrowserWindow
} = require('electron')
const path = require('path')

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