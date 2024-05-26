import { dialog, ipcMain } from 'electron'

export const selectFile = () => {
  ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Videos', extensions: ['mp4', 'mov', 'avi'] }]
    });
    return result.filePaths[0]
  })
}
