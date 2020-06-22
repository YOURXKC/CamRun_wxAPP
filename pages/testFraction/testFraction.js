var util= require('../../utils/util.js');
// pages/testFraction/testFraction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tishi_display: true,
    tishi_text: "加载中···",
    fraction: [],
    display_fraction: [],
    shows: {
      img_src: '../../images/bottom.png',
      bools: true
    },
    hides: {
      img_src: '../../images/right.png',
      bools: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //确保登陆后有数据时只查询一次
    if(this.data.fraction.length == 0)
    {
      //判断是否已经登录过教务系统
      if(util.cookie == "")
      {//未登录
        //打开登录提示
        this.showLoginTiShi('是否登录教务系统');
      }
      else
      {//已登录
        //加载成绩信息
        this.loadFraction();
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
   * 登录提示
   */
  showLoginTiShi: function (text) {
    wx.showModal({
      title: '提示',
      content: text,
      success (res) {
        if(res.confirm) 
        {
          ///打开登陆界面并传值
          wx.navigateTo({url: '../schoolLogin/schoolLogin?id=1'});
        }
      }
    });
  },

  /**
   * 加载成绩信息
   */
  loadFraction: function () {
    var app = this;
    //发起网络请求
    wx.request({
      method: "POST",
      url: util.adminUrl + "getfraction",
      data: {
        redis: util.redis,
        cookie: util.cookie,
        url: util.menu[9].menu_href,
      },
      header: {'content-type': 'application/x-www-form-urlencoded'}, //默认值
      success: function (res) {
        if(res.data.status)
        {
          var datas = res.data.message;
          //获取总学期
          var displays = [];
          for(var i=0; i<datas.length; i++)
          {
            displays[i] = app.data.hides;
          }
          
          app.setData({
            tishi_display: false,
            fraction: datas,
            display_fraction: displays
          });
        }
        else
        {
          if(res.data.code == 0)
          {
            //打开登录提示
            this.showLoginTiShi('登录状态已过期');
          }
          app.setData({
            tishi_display: true,
            tishi_text: '暂无您的考试成绩'
          });
        }
      }
    });
  },

  /**
   * 成绩的显示与隐藏
   */
  fractionShowHide: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = "display_fraction["+id+"]";
    if(this.data.display_fraction[id].bools)
    {
      this.setData({[index]: this.data.hides});
    }
    else
    {
      this.setData({[index]: this.data.shows});
    }
  }
})