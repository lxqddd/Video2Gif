import path from 'node:path'
import os from 'node:os'
import { dialog, ipcMain } from 'electron'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs-extra'
import sharp from 'sharp'

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
    ffmpeg(videoPath).outputOptions([
      '-vf',
      'fps=10'
    ])
      .save(path.join(tempOut, 'temp_%03d.png'))
      .on('end', async () => {
        const frameFiles = fs.readdirSync(tempOut).filter(file => file.endsWith('.png'))
        const frames = frameFiles.map(file => path.join(tempOut, file))

        const gif = sharp({
          create: {
            width: 320, // 调整宽度
            height: 240, // 调整高度
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          }
        })

        for (const frame of frames) {
          const image = await sharp(frame).resize(320, 240).toBuffer()
          gif.composite([{ input: image }])
        }

        gif.gif({ loop: 0 })
          .toFile(outputPath)
          .then(() => {
            console.log('GIF created successfully.')
            // 删除临时帧文件
            frameFiles.forEach(file => fs.unlinkSync(path.join(tempOut, file)))
            fs.rmdirSync(tempOut)
          })
          .catch(err => console.error('Error creating GIF:', err))
      })
      .on('error', (err) => {
        console.error('Error extracting frames:', err)
      })
    console.log(outputPath)
    console.log(videoPath)
  })
}
