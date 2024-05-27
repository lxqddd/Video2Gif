<template>
  <div>
    <div>
      <input v-show="false" ref="fileInputRef" type="file" @change="handleChange">
      <button @click="handleSelectFile">选择文件</button>
      <button @click="handleTransform" class="ml-2">开始转换</button>
    </div>
    <div class="flex mt-3">
      <div class="flex-1 mr-3">
        <video v-if="videoSrc" :src="videoSrc" controls class="w-100%" />
      </div>
      <div class="flex-1">this is Gif</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileInputRef = ref<HTMLInputElement>()
const videoSrc = ref('')
const videoPath = ref('')
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    console.log(file)
    videoSrc.value = URL.createObjectURL(file)
    videoPath.value = file.path
  }
}

const handleSelectFile = () => {
  fileInputRef.value?.click()
}

const handleTransform = () => {
  window.ipcRenderer.send('dealWith-video', videoPath.value)
}
</script>
