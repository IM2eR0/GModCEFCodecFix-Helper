'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
// import { ElStep } from 'element-ui/types/step'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true, stream: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1024,
    minWidth: 800,
    height: 600,
    minHeight: 600,
    frame: false,
    simpleFullscreen: true,
    titleBarOverlay: {
      color: 'rgba(0,0,0,0)',
      height: 35,
      symbolColor: 'white'
    },
    maximizable: true,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.setMenu(null)

    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  ipcMain.on('window-min', () => {
    win.minimize()
  })

  ipcMain.on('window-max', () => {
    // 如果已经是最大化窗口就还原
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize()
    }
  })

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      // await installExtension(VUEJS_DEVTOOLS)
      // require('vue-devtools').install()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  ipcMain.handle("dialog:openFile", handleFileOpen)
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

var os = require('os');

// Vue获取系统信息
ipcMain.on('sysinfo', (e) => {
  var callback = {}
  var osr = os.release().match(/10.0.(\S*)/)
  var osv = os.version()

  var winver = osv.replace(/\s+/g, "-").match(/Windows-(\S*)-(\S*)/)
  var fwinv = ""
  var spv = false
  var osarch = os.arch()

  if (winver[1] == "10") {
    if (Number(osr[1]) >= 22000) {
      // is windows 11
      fwinv = "Windows 11"
    } else {
      // is windows 10
      fwinv = "Windows 10"
    }
    if (osarch == "x64") spv = true
  } else {
    // is windows 8? GCCF nolonger support it.
    fwinv = osv
  }

  callback["release"] = osr[0]
  callback['platfrom'] = os.platform()
  callback['version'] = osv
  callback['winver'] = fwinv
  callback['issupport'] = spv
  callback['totalram'] = parseInt(os.totalmem() / 1024 / 1024 / 1024) + 1 + "GB"
  callback['arch'] = osarch

  e.sender.send('sysinfo_callback', callback);
})

ipcMain.on('quitapp', () => {
  app.quit()
})

// 新增：处理打开文件对话框的函数
async function handleFileOpen() {
  const options = {
    title: 'Select a Folder',
    properties: ['openDirectory']
  };
  const { canceled, filePaths } = await dialog.showOpenDialog(options)
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

const winreg = require("winreg")
const fs = require('fs')
const path = require('path')
import * as VDF from '@node-steam/vdf';

// 读取Steam路径IPC
ipcMain.on('getSteamPath', (e) => {
  var regKey = new winreg({
    hive: winreg.HKCU,
    key: '\\Software\\Valve\\Steam'
  })
  regKey.get('SteamPath', (err, r) => {
    if (err) {
      e.sender.send("steamPath_result", "")
    } else {
      // e.sender.send("steamPath_result",r.value)
      const steamPath = path.join(r.value, "steamapps", "libraryfolders.vdf")
      const steamUser = path.join(r.value, "config", "loginusers.vdf")
      fs.access(steamPath, (err) => {
        if (err) {
          e.sender.send("steamPath_result", "")
        } else {
          // 发送基本Steam路径
          e.sender.send("steamPath_result", r.value)

          //获取 SteamLibrary 信息
          const steamLibrary = fs.readFileSync(steamPath, { flag: 'r', encoding: 'utf8' })
          // console.log(steamLibrary);

          const libfolder = VDF.parse(steamLibrary).libraryfolders
          e.sender.send("steamLibraryInfo", {
            path: steamPath.replace(/\\/g, "/"),
            data: VDF.parse(steamLibrary)
          })
          
          // 获取GMOD安装路径
          const gmodpath = []
          for(let key in libfolder){
            if(libfolder[key]["apps"]["4000"]){
              const realfolder = libfolder[key]["path"].replace(/\\\\/g,"/")
              try{
                var data = fs.readFileSync(path.join(realfolder,'steamapps',"appmanifest_4000.acf"),{ flag: 'r', encoding: 'utf8'})
                // console.log(VDF.parse(data))
              }catch{

              }
            }
          }

          // 获取Steam用户信息
          const steamUserInfo = fs.readFileSync(steamUser,{ flag: 'r', encoding: 'utf8' })
          e.sender.send("steamUserInfo", {
            path: steamUser.replace(/\\/g, "/"),
            data: VDF.parse(steamUserInfo)
          })
          e.sender.send("load_success")
        }
      })
    }
  })
})

const openDefaultBrowser = function (url) {
  var exec = require('child_process').exec;
  console.log(process.platform)
  switch (process.platform) {
    case "darwin":
      exec('open ' + url);
      break;
    case "win32":
      exec('start ' + url);
      break;
    default:
      exec('xdg-open', [url]);
  }
}

// 打开系统默认浏览器
ipcMain.on("openBrowser", (e, msg) => {
  openDefaultBrowser(msg)
})