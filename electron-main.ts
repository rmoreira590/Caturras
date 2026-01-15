
import { app, BrowserWindow } from 'electron';
import path from 'path';

// Variáveis injetadas pelo Vite Plugin do Electron Forge
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;
declare const __dirname: string;

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#000000',
    webPreferences: {
      // O Vite compila o preload para a mesma pasta do build
      preload: path.join(__dirname, 'electron-preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Logica de carregamento compatível com Vite
  if (typeof MAIN_WINDOW_VITE_DEV_SERVER_URL !== 'undefined') {
    win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    // Em produção, carrega o index.html gerado
    win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // Fix: Cast process to any to access the platform property in an environment where browser types might conflict with Node globals
  if ((process as any).platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
