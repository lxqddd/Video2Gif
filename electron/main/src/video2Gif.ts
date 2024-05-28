import path, { dirname, join } from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { dialog, ipcMain } from 'electron'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import fs from 'fs-extra'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

export const selectFile = () => {
  ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Videos', extensions: ['mp4', 'mov', 'avi'] }]
    });
    return result.filePaths[0]
  })
}

export const dealWithVideo = () => {
  ipcMain.on('dealWith-video', async (_e, videoPath: string) => {
    const fileBaseName = path.basename(videoPath)
    const desktop = path.resolve(os.homedir(), 'Desktop')
    console.log(fileBaseName)
    const tempOut = path.resolve(desktop, 'temp')
    const outputPath = path.resolve(desktop, `${fileBaseName}.gif`)
    if (!fs.existsSync(tempOut)) {
      await fs.ensureDir(tempOut)
    }
    ffmpeg(videoPath)
      .outputOptions([
        '-vf',
        'fps=10,scale=320:-1:flags=lanczos',
        '-pix_fmt',
        'rgb24',
        '-f',
        'gif'
      ])
      .on('end', () => {
        console.log('GIF created successfully.')
      })
      .on('error', (err) => {
        console.log(err)
      })
      .save(outputPath)
    console.log(outputPath)
    console.log(videoPath)
  })
}
