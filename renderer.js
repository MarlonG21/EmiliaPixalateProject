const { remote,ipcRenderer} = require('electron')

document.getElementById('minimize-button').addEventListener('click', () => {

	remote.getCurrentWindow().minimize();
})

document.getElementById('exit-button').addEventListener('click', () => {

	remote.app.quit();
})