//app.js
App({
  onLaunch: function () {
    this.appUpdate();
  },

  /**
   * 检测小程序是否有新版本
   */
  appUpdate: function () {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if(res.hasUpdate)
      {//需要更新
        updateManager.onUpdateReady(function () {
          //新版本下载成功
          wx.showLoading();
          wx.showModal({
            title: '更新提示',
            showCancel: false,
            content: '新版本已经就绪',
            success: function () {
              //调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          });
        });
        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          wx.showLoading();
          wx.showToast({
            title: '当前已是最新版本',
            icon: 'none',
            duration: 2000
          });
        });
      }/********************生产环境下需要禁用else********************//*
      else
      {//不需要更新
        wx.showLoading();
        wx.showToast({
          title: '当前已是最新版本',
          icon: 'none',
          duration: 2000
        });
      }*/
    });
  },

  //全局变量
  globalData: {
    userInfo: null
  }
})