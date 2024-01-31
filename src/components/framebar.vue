<template>
    <div class="frame-bar">

        <div class="frame-title">
            {{ frameTitles[Math.floor(Math.random()*frameTitles.length)] }} ({{ $version }})
        </div>

        <div class="frame-control">
            <button @click="min" class="frame-button-normal">
                <svg-icon width="12" type="mdi" :path="icon_minium"></svg-icon>
            </button>

            <button @click="max" class="frame-button-normal">
                <svg-icon width="12" type="mdi" :path="icon_maxium"></svg-icon>
            </button>

            <button @click="centerDialogVisible = true" class="frame-button-close">
                <svg-icon width="12" type="mdi" :path="icon_close"></svg-icon>
            </button>
        </div>

        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <span>你确定要退出程序吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="close">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import {
    mdiWindowClose,
    mdiWindowMaximize,
    mdiWindowMinimize
} from '@mdi/js';
export default {
    name: "FrameBar",
    components: {
        SvgIcon
    },
    data() {
        return {
            icon_close: mdiWindowClose,
            icon_maxium: mdiWindowMaximize,
            icon_minium: mdiWindowMinimize,
            centerDialogVisible: false,
            frameTitles: [
                "我不想写标题因为我想不到好标题",
                "NyanCat | MEMZ",
                "地爆天星！！！",
                "我今天没吃药",
                "🛏床盒 - 你最好的摆烂核心",
                "( *・ω・)✄╰ひ╯",
                "VRChat",
                "Steam",
                "QQ",
                "我花了一千块钱找人定制的标题，好看不？"
            ]
        }
    },
    methods: {
        // 最小化
        min() {
            this.$electron.ipcRenderer.send('window-min');
        },
        // 最大化
        max() {
            this.$electron.ipcRenderer.send('window-max');
        },
        // 关闭
        close() {
            this.$electron.ipcRenderer.send('quitapp');
        }
    }
}
</script>
<style scoped>
.frame-bar{
    display:flex;
    align-items:center;
}
.frame-title {
    margin-left: 10px;
}

.frame-control {
    -webkit-app-region: no-drag;
    margin-left: auto;
}

.frame-control button {
    font-size: 10px;
    height: 32px;
    padding: 1px 12px 1px 12px;
    border: none;
    background-color: white;
    border-bottom: 1px solid #dcdfe6;
    transition: background-color 0.3s ease;
}

.frame-button-normal:hover {
    background-color: gainsboro;
}

.frame-button-close:hover {
    background-color: red;
}
</style>