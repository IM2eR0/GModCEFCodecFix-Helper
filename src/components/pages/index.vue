<template>
    <div>
        <div id="app">
            <h1>GModCEFCodecFix 帮助程序</h1>
            <hr>
            <p>版本号：<span style="color: green;" @click="updateHistory = true">{{ $version }}</span></p>
            <p>请在左侧点击按钮开始使用！</p>
            <el-button type="text" @click="openSystemDialog">检查是否可以运行软件</el-button>
        </div>
        <el-dialog title="系统信息" :visible.sync="dialogVisible" width="50%">
            <span>
                <div>操作系统版本：{{ sysinfo.winver }}</div>
                <div>操作系统位数：{{ sysinfo.arch }}</div>
                <div>操作系统版本号：{{ sysinfo.release }}</div>
                <div>软件版本：{{ $version }}</div>
                <div>在线版本：{{ onlineVersion }}</div>
                <br>
                <div>Steam路径：{{ $steamPath ? "已找到" : "未找到，请检查设置" }}</div>
                <div>Steam Library：{{ $steamLibrary.data ? "已挂载 " + $steamLibrary.length + " 个 Library" : "Steam路径有误" }}</div>
                <div>Steam User：{{ "已作为 " + $steamLoginUser.AccountName + " 登录" }}</div>
                <br>

                <div style="color: green;" v-if="sysinfo.issupport && $version == onlineVersion && $steamPath">
                    恭喜！你的系统支持 GModCEFCodecFix！
                    <br>
                    软件理论上可以运行，如果遇到问题请反馈！
                </div>
                <div v-else>
                    <div style="color: red;" v-if="!sysinfo.issupport">
                        你的系统不满足运行所需的最新条件，请升级到 Windows 10 64位 或更新版本
                    </div>
                    <div style="color: red;" v-if="$version != onlineVersion">
                        软件有更新，请安装最新版！
                    </div>
                    <div style="color: red;" v-if="!$steamPath">
                        未找到Steam路径，请检查设置后重新尝试
                    </div>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="更新日志" :visible.sync="updateHistory" width="50%">
            
            <updateHistoryPage />

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateHistory = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import updateHistoryPage from '@/components/pages/updateHistory'
export default {
    name: 'IndexPage',
    components:{
        updateHistoryPage
    },
    data() {
        return {
            dialogVisible: false,
            sysinfo: [],
            onlineVersion: '',
            updateHistory: false,
        }
    },
    methods: {
        openSystemDialog: function () {
            this.sysinfo = JSON.parse(sessionStorage.sysInfo);
            this.onlineVersion = sessionStorage.appVersion
            this.dialogVisible = true
        }
    },
    mounted: function(){
        // console.log("=== STEAM LIBRARY ===",this.$steamLibrary);
        // console.log("=== STEAM USER ===",this.$steamUser);
    }
}
</script>
<style scoped>
#app {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
}

h1 {
    font-size: 48px;
    margin: 0;
}
</style>