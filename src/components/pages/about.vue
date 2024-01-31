<template>
    <span>
        <div id="app">
            <h1>关于 GModCEFCodecFix-Helper</h1>
            <hr>
            <div>相关链接：</div>
            <el-button type="text" @click="openUrl('https://github.com/IM2eR0/GModCEFCodecFix-Helper')">GitHub</el-button>
            <el-button type="text" @click="openUrl('https://qm.qq.com/cgi-bin/qm/qr?k=CdxYcWwLgVHeEKkk8ESCbeUi_1J9GeZv&jump_from=webapi&authKey=zah9xEa2hrd9nYezGAVS1dSF3cPKXjiD8H4bdoXG9ehssDQ2d5CtXPQ9iMBnnUzN')">QQ群</el-button>
            <el-button type="text" @click="alert('还没做！')">KOOK</el-button>
            <el-button type="text" @click="alert('还没做！')">Discord</el-button>
            <el-button type="text" @click="alert('还没做！')">Telegram</el-button>
            <hr>
            <p>软件作者：昵称违规喵</p>
            <p @click="oiiaiooooiai">当前版本号：{{ $version }}</p>

        </div>
        <el-dialog id="nyancat" title="NyanNyanNyan!!" :visible.sync="dialogVisible" @opened="nyannyan" @close="nyan" width="300px">
            <video width="256px" autoplay="autoplay" loop="loop">
                <source src="../../assets/cat-space.mp4" type="video/mp4" />
            </video>
            <audio autoplay="autoplay" loop="loop">
                <source src="../../assets/nyancat.mp3" type="audio/mpeg">
            </audio>
        </el-dialog>
    </span>
</template>
<script>
import {ipcRenderer} from 'electron'
export default {
    name: 'AboutPage',
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {
        oiiaiooooiai: function () {
            this.dialogVisible = true
        },
        nyannyan(){
            document.getElementsByTagName('audio')[0].load()
        },
        nyan(){
            document.getElementsByTagName('audio')[0].pause()
            this.dialogVisible = false
        },
        openUrl(url){
            ipcRenderer.send("openBrowser",url)
        },
        alert(msg) {
            this.$alert(msg, '提示', {
                confirmButtonText: '确定'
            })
        }
    }
}
</script>
<style scoped>
#app {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    cursor: default;
}

h1 {
    margin-top: 0;
}

#nyancat{
    margin: 0;
    padding: 0;
}
</style>