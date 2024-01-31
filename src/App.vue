
<template>
  <div id="app">
    <el-container class="outside-container">
      <el-header height="32px">
        <framebar />
      </el-header>

      <el-container>
        <el-aside width="auto">
          <LeftMenu />
        </el-aside>
        <el-main>
          <RouterViewPage />
        </el-main>
      </el-container>

      <!-- <el-footer class="footer">
        <p>Powered by 昵称违规喵</p>
      </el-footer> -->
    </el-container>
  </div>
</template>

<script>
/* eslint-disable */
import LeftMenu from '@/components/leftmenu.vue';
import RouterViewPage from './components/RouterViewPage.vue';
import framebar from './components/framebar.vue';

export default {
  name: 'App',
  components: { LeftMenu, RouterViewPage, framebar },
  data() {
    return {
    }
  },
  methods: {
    checkAppUpdate() {
      this.$notify({
        title: '版本更新检查',
        dangerouslyUseHTMLString: true,
        message: '欢迎！<br>你当前使用的是最新版本~',
        duration: 5000,
        type: 'success'
      });
    }
  },
  mounted: function () {
    var sfdata = []
    const loading = this.$loading({
      lock: true,
      text: '初始化中，请稍后',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });

    if (this.$route.path != "/")
      this.$router.replace({ name: "Index" });

    this.$electron.ipcRenderer.send('sysinfo', 'CallSend')
    this.$electron.ipcRenderer.on("sysinfo_callback", (_, data) => {
      sessionStorage.sysInfo = JSON.stringify(data)
    })
    this.$http.get('https://vr.nekogan.com/d/GModCEFCodecFix/helper/version.txt')
    .then((res) => {
      sessionStorage.appVersion = res.data
      if(res.data == this.$version){
        this.$notify({
          title: '版本检查',
          dangerouslyUseHTMLString: true,
          message: '<b>恭喜你，你是用的是最新版本！</b><br>当前版本：'+this.$version+'<br>在线版本：'+res.data,
          offset: 32,
          type: 'success'
        });
        loading.close();
      }else{
        this.$notify.error({
          title: '版本检查',
          dangerouslyUseHTMLString: true,
          message: '<b>软件有更新，请尽快更新！</b><br>当前版本：'+this.$version+'<br>在线版本：'+res.data,
          offset: 32,
          duration: 0
        });
        loading.close();
      }
    })
  }
}
</script>

<style scoped>
#app {
  user-select: none;
  overflow: hidden;
}

@font-face {
  font-family: 'SourceHans';
  src: url('assets/SourceHanSansCN-Normal.otf');
}

.outside-container {
  height: 100vh;
}

.el-main,.el-header {
  font-family: 'SourceHans';
}

.el-menu {
  height: 100%
}

.footer {
  text-align: center;
  height: auto;
  padding: 5px;
  border-top: 1px solid #dcdfe6;
}

.el-header {
  margin: 0;
  padding: 0;
  /* position: fixed; */
  -webkit-app-region: drag;
  text-align: center;
  border-bottom: 1px solid #dcdfe6;
  height: 32px;
}
</style>
