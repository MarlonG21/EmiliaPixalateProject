const electron = require('electron');
const url = require('url')
const path = require('path')



const {app, BrowserWindow} = electron;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

//Listen for{app, BrowserWindow} the app tp be ready

app.on('ready', function()
{
	//create new window
	mainWindow = new BrowserWindow({width: 1400, height: 800, frame: false, fullscreen: true});
	//Load html into window
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'main.html'),
		protocol: 'file:',
		slashes: true
	}));
});




