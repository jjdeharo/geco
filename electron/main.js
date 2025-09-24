const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV === 'development';
const appRoot = path.resolve(__dirname, '..');
const DEFAULT_MENU_LANGUAGE = 'es';

const MENU_TRANSLATIONS = {
  es: {
    file: 'Archivo',
    edit: 'Edición',
    view: 'Ver',
    window: 'Ventana',
    help: 'Ayuda',
    openGuide: 'Abrir guía',
    reload: 'Recargar',
    forceReload: 'Forzar recarga',
    toggleDevTools: 'Mostrar herramientas para desarrolladores',
    resetZoom: 'Restablecer zoom',
    zoomIn: 'Acercar',
    zoomOut: 'Alejar',
    toggleFullScreen: 'Pantalla completa',
    minimize: 'Minimizar',
    close: 'Cerrar',
    quit: 'Salir',
    about: 'Acerca de GeCo',
    hide: 'Ocultar GeCo',
    hideOthers: 'Ocultar otras',
    unhide: 'Mostrar todo',
    bringAllToFront: 'Traer todo al frente',
    undo: 'Deshacer',
    redo: 'Rehacer',
    cut: 'Cortar',
    copy: 'Copiar',
    paste: 'Pegar',
    selectAll: 'Seleccionar todo',
    closeWindow: 'Cerrar ventana',
    zoomWindow: 'Zoom',
  },
  ca: {
    file: 'Arxiu',
    edit: 'Edició',
    view: 'Visualització',
    window: 'Finestra',
    help: 'Ajuda',
    openGuide: 'Obrir guia',
    reload: 'Recarregar',
    forceReload: 'Forçar recàrrega',
    toggleDevTools: 'Mostrar eines de desenvolupador',
    resetZoom: 'Restablir zoom',
    zoomIn: 'Ampliar',
    zoomOut: 'Reduir',
    toggleFullScreen: 'Pantalla completa',
    minimize: 'Minimitzar',
    close: 'Tancar',
    quit: 'Sortir',
    about: 'Quant a GeCo',
    hide: 'Amaga GeCo',
    hideOthers: 'Amaga les altres',
    unhide: 'Mostra-ho tot',
    bringAllToFront: 'Porta-ho tot al davant',
    undo: 'Desfer',
    redo: 'Refer',
    cut: 'Retallar',
    copy: 'Copiar',
    paste: 'Enganxar',
    selectAll: 'Selecciona-ho tot',
    closeWindow: 'Tanca la finestra',
    zoomWindow: 'Zoom',
  },
  gl: {
    file: 'Arquivo',
    edit: 'Edición',
    view: 'Ver',
    window: 'Xanela',
    help: 'Axuda',
    openGuide: 'Abrir guía',
    reload: 'Recargar',
    forceReload: 'Forzar recarga',
    toggleDevTools: 'Ferramentas de desenvolvemento',
    resetZoom: 'Restablecer zoom',
    zoomIn: 'Ampliar',
    zoomOut: 'Reducir',
    toggleFullScreen: 'Pantalla completa',
    minimize: 'Minimizar',
    close: 'Pechar',
    quit: 'Saír',
    about: 'Sobre GeCo',
    hide: 'Ocultar GeCo',
    hideOthers: 'Ocultar outras',
    unhide: 'Mostrar todo',
    bringAllToFront: 'Traer todo ao fronte',
    undo: 'Desfacer',
    redo: 'Refacer',
    cut: 'Cortar',
    copy: 'Copiar',
    paste: 'Pegar',
    selectAll: 'Seleccionar todo',
    closeWindow: 'Pechar xanela',
    zoomWindow: 'Zoom',
  },
  eu: {
    file: 'Fitxategia',
    edit: 'Editatu',
    view: 'Ikusi',
    window: 'Leihoa',
    help: 'Laguntza',
    openGuide: 'Gida ireki',
    reload: 'Berritu',
    forceReload: 'Berritu (behartu)',
    toggleDevTools: 'Garatzaileen tresnak',
    resetZoom: 'Zooma berrezarri',
    zoomIn: 'Handiagotu',
    zoomOut: 'Txikiagotu',
    toggleFullScreen: 'Pantaila osoa',
    minimize: 'Minimizatu',
    close: 'Itxi',
    quit: 'Irten',
    about: 'GeCo-ri buruz',
    hide: 'GeCo ezkutatu',
    hideOthers: 'Besteak ezkutatu',
    unhide: 'Guztia erakutsi',
    bringAllToFront: 'Guztia aurrera ekarri',
    undo: 'Desegin',
    redo: 'Berregin',
    cut: 'Moztu',
    copy: 'Kopiatu',
    paste: 'Itsatsi',
    selectAll: 'Hautatu dena',
    closeWindow: 'Leihoa itxi',
    zoomWindow: 'Zoom',
  },
  en: {
    file: 'File',
    edit: 'Edit',
    view: 'View',
    window: 'Window',
    help: 'Help',
    openGuide: 'Open Guide',
    reload: 'Reload',
    forceReload: 'Force Reload',
    toggleDevTools: 'Toggle Developer Tools',
    resetZoom: 'Reset Zoom',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    toggleFullScreen: 'Toggle Full Screen',
    minimize: 'Minimize',
    close: 'Close',
    quit: 'Quit',
    about: 'About GeCo',
    hide: 'Hide GeCo',
    hideOthers: 'Hide Others',
    unhide: 'Show All',
    bringAllToFront: 'Bring All to Front',
    undo: 'Undo',
    redo: 'Redo',
    cut: 'Cut',
    copy: 'Copy',
    paste: 'Paste',
    selectAll: 'Select All',
    closeWindow: 'Close Window',
    zoomWindow: 'Zoom Window',
  },
};

let currentMenuLanguage = DEFAULT_MENU_LANGUAGE;
let mainWindowRef = null;
let guideWindow = null;

const getMenuLabels = (language) => MENU_TRANSLATIONS[language] || MENU_TRANSLATIONS[DEFAULT_MENU_LANGUAGE];

const openGuideWindow = () => {
  if (guideWindow && !guideWindow.isDestroyed()) {
    guideWindow.focus();
    return;
  }

  guideWindow = new BrowserWindow({
    width: 960,
    height: 720,
    minWidth: 720,
    minHeight: 540,
    parent: mainWindowRef || undefined,
    modal: false,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#f5f7fa',
    icon: path.join(appRoot, 'build', 'icons', 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  guideWindow.once('ready-to-show', () => {
    guideWindow.show();
  });

  guideWindow.on('closed', () => {
    guideWindow = null;
  });

  guideWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  guideWindow.webContents.on('will-navigate', (event, url) => {
    if (guideWindow && url !== guideWindow.webContents.getURL()) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  guideWindow.loadFile(path.join(appRoot, 'instr.html'));
};

const buildMenuTemplate = (language) => {
  const labels = getMenuLabels(language);
  const template = [];

  if (isMac) {
    template.push({
      label: app.name,
      submenu: [
        { label: labels.about, role: 'about' },
        { type: 'separator' },
        { label: labels.hide, role: 'hide' },
        { label: labels.hideOthers, role: 'hideOthers' },
        { label: labels.unhide, role: 'unhide' },
        { type: 'separator' },
        { label: labels.quit, role: 'quit' },
      ],
    });
  }

  template.push({
    label: labels.file,
    submenu: [
      isMac
        ? { label: labels.closeWindow, role: 'close' }
        : { label: labels.quit, role: 'quit' },
    ],
  });

  template.push({
    label: labels.edit,
    submenu: [
      { label: labels.undo, role: 'undo' },
      { label: labels.redo, role: 'redo' },
      { type: 'separator' },
      { label: labels.cut, role: 'cut' },
      { label: labels.copy, role: 'copy' },
      { label: labels.paste, role: 'paste' },
      { label: labels.selectAll, role: 'selectAll' },
    ],
  });

  const viewSubmenu = [
    { label: labels.reload, role: 'reload' },
    { label: labels.forceReload, role: 'forceReload' },
  ];

  if (isDev) {
    viewSubmenu.push({ label: labels.toggleDevTools, role: 'toggleDevTools' });
  }

  viewSubmenu.push(
    { type: 'separator' },
    { label: labels.resetZoom, role: 'resetZoom' },
    { label: labels.zoomIn, role: 'zoomIn' },
    { label: labels.zoomOut, role: 'zoomOut' },
    { type: 'separator' },
    { label: labels.toggleFullScreen, role: 'togglefullscreen' },
  );

  template.push({
    label: labels.view,
    submenu: viewSubmenu,
  });

  const windowSubmenu = [
    { label: labels.minimize, role: 'minimize' },
  ];

  if (isMac) {
    windowSubmenu.push({ label: labels.zoomWindow, role: 'zoom' });
    windowSubmenu.push({ type: 'separator' });
    windowSubmenu.push({ label: labels.bringAllToFront, role: 'front' });
  } else {
    windowSubmenu.push({ label: labels.close, role: 'close' });
  }

  template.push({
    label: labels.window,
    submenu: windowSubmenu,
  });

  template.push({
    label: labels.help,
    submenu: [
      {
        label: labels.openGuide,
        click: () => openGuideWindow(),
      },
    ],
  });

  return template;
};

const applyApplicationMenu = (language) => {
  const menuTemplate = buildMenuTemplate(language);
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

const createMainWindow = () => {
  mainWindowRef = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 1024,
    minHeight: 680,
    backgroundColor: '#f4f4f6',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
    icon: path.join(appRoot, 'build', 'icons', 'icon.png'),
    title: 'GeCo',
  });

  mainWindowRef.once('ready-to-show', () => {
    mainWindowRef.show();
  });

  mainWindowRef.loadFile(path.join(appRoot, 'index.html'));

  if (isDev) {
    mainWindowRef.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindowRef.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindowRef.webContents.on('will-navigate', (event, url) => {
    if (url !== mainWindowRef.webContents.getURL()) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  applyApplicationMenu(currentMenuLanguage);

  return mainWindowRef;
};

app.on('second-instance', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    const primaryWindow = allWindows[0];
    if (primaryWindow.isMinimized()) {
      primaryWindow.restore();
    }
    primaryWindow.focus();
  }
});

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

ipcMain.handle('geco:get-version', () => app.getVersion());

ipcMain.on('geco:set-language', (_event, language) => {
  currentMenuLanguage = MENU_TRANSLATIONS[language] ? language : DEFAULT_MENU_LANGUAGE;
  applyApplicationMenu(currentMenuLanguage);
});
