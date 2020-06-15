var util= require('../../utils/util.js');
// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList: [],
    data_display1: false,
    data_display2: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryTest();
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
   * 查询长跑成绩
   */
  queryTest: function () {
    if(util.openid != "")
    {
      var app = this;
      //发起网络请求
      wx.request({
        method: "POST",
        url: util.adminUrl + "querytest",
        data: {
          openid: util.openid
        },
        header: {'content-type': 'application/x-www-form-urlencoded'}, //默认值
        success: function (res) {
          //console.log(res.data);
          if(res.data.status)
          {
            app.setData({
              data_display1: true,
              data_display2: false
            });
            app.setData({testList: res.data.data.data});
          }
          else
          {
            app.setData({
              data_display1: false,
              data_display2: true
            });
            wx.showToast({
              title: "数据加载出错",
              icon: 'none',
              duration: 1000
            });
          }
        }
      });
    }
    else
    {
      this.setData({
        data_display1: false,
        data_display2: true
      });
    }
  }
})