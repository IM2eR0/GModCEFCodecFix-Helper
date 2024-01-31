<template>
    <div id="app">
        <p>很遗憾，页面仍在施工~</p>
        <p>ZZzz…(。-ω-)..ooO</p>
        <p>如果你在软件运行期间出现了问题，请提交
            <el-button type="text" @click="openUrl('https://github.com/IM2eR0/GModCEFCodecFix-Helper/issues')">Github
                Issue</el-button>
            ！
        </p>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
    name: "FeedBack",
    methods: {
        openUrl(url) {
            ipcRenderer.send("openBrowser", url)
        }
    }
}
</script>