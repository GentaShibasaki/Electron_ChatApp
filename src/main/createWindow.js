import { BrowserWindow } from "electron";

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadURL(`file://${__dirname}/../../index.html`);
  win.on("closed", () => {
    win = null;
  });
}

export default createWindow;
