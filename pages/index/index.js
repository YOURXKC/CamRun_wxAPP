var util= require('../../utils/util.js');
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    if_block: true,//滚动条显示控制
    if_querytest: true,//成绩查询接口时间控制
    z_num: 0,
    y_num: 0,
    w_num: 0,
    z_height: 0,//标题栏加状态栏高度
    s_height: 0,//状态栏高度
    m_height: 0,//标题栏高度
    m_ptd: 0//标题栏上下内边距
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.shows();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(util.redis != "")
    {
      this.queryTest();
    }
    else
    {
      if(util.openid != "")
      {
        wx.showModal({
          title: '提示',
          content: '您还未绑定账号',
          showCancel: false,
          confirmText: "前往绑定",
          confirmColor: "	#1E90FF",
          complete: function () {
            //打开登录页
            wx.navigateTo({url: '../login/login'});
          }
        });
      }
      else
      {
        this.wxLogin();
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  /**
   * 微信登录
   */
  wxLogin: function () {
    wx.showLoading({title: '登录中'});
    var app = this;
    wx.login({
      success: function (res) {
        if(res.code) 
        {
          //发起网络请求
          wx.request({
            method: "POST",
            url: util.adminUrl + "login",
            data: {
              code: res.code,
              type: util.type
            },
            header: {'content-type': 'application/x-www-form-urlencoded'}, //默认值
            success: function (request) {
              wx.hideLoading();
              if(request.data.status)
              {
                util.redis = request.data.redis;
                //加载成绩
                app.queryTest();
              }
              else
              {
                //保存openid,便于登录页绑定
                util.openid = request.data.openid;
                //打开登录页
                wx.navigateTo({url: '../login/login'});
              }
            }
          });
        } 
        else 
        {
          wx.hideLoading();
          //打开登录页
          wx.navigateTo({url: '../login/login'});
        }
      }
    });
  },

  /**
   * 查询长跑成绩
   */
  queryTest: function () {
    if(this.data.if_querytest)
    {
      var app = this;
      app.data.if_querytest =  false;//此次调用后暂停该接口60秒
      setTimeout(function(){
        app.data.if_querytest = true;
      },1000*60);//60秒后执行
      //发起网络请求
      wx.request({
        method: "POST",
        url: util.adminUrl + "querytest",
        data: {redis: util.redis},
        header: {'content-type': 'application/x-www-form-urlencoded'}, //默认值
        success: function (res) {
          //console.log(res.data);
          if(res.data.status)
          {
            app.setData({
              z_num: res.data.data.z_num,
              y_num: res.data.data.y_num,
              w_num: res.data.data.w_num
            });
            if(app.data.z_num == 0)
            {
              app.setData({if_block: true});
            }
            else
            {
              app.setData({if_block: false});
            }
          }
          else
          {
            wx.showToast({
              title: "数据加载出错",
              icon: 'none',
              duration: 1000
            });
          }
        }
      });
    }
  },

  /**
   * 打开详情页
   */
  openDetails: function () {
    wx.navigateTo({url: '../details/details'});
  },

  /**
   * 自定义标题栏
   */
  shows: function () {
    //获取状态栏高度
    var statusBar = wx.getSystemInfoSync();
    //获取菜单栏高度
    var menuBar = wx.getMenuButtonBoundingClientRect();
    //两个总高度
    var zheight = statusBar.statusBarHeight + menuBar.height + (menuBar.top - statusBar.statusBarHeight)*2;
    this.setData({
      z_height: zheight,
      s_height: statusBar.statusBarHeight,
      m_height: menuBar.height,
      m_ptd: menuBar.top - statusBar.statusBarHeight
    });
  }
})