var util= require('../../utils/util.js');
// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList: [],
    data_display1: false,
    data_display2: true,
    tishi_text: "加载中···"
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
    if(util.redis != "")
    {
      var app = this;
      //发起网络请求
      wx.request({
        method: "POST",
        url: util.adminUrl + "querytest",
        data: {
          redis: util.redis
        },
        header: {'content-type': 'application/x-www-form-urlencoded'}, //默认值
        success: function (res) {
          //console.log(res.data);
          //判断是否查询成功
          if(res.data.status)
          {
            //判断数据是否为空
            if(res.data.data.z_num == 0)
            {
              app.setData({
                data_display1: false,
                data_display2: true,
                tishi_text: "暂无您的跑步数据"
              });
            }
            else
            {
              app.setData({testList: res.data.data.data});
              app.setData({
                data_display1: true,
                data_display2: false
              });
            }
          }
          else
          {
            app.setData({
              data_display1: false,
              data_display2: true,
              tishi_text: "暂无您的跑步数据"
            });
            wx.showToast({
              title: res.data,data,
              icon: 'none',
              duration: 3000
            });
          }
        }
      });
    }
    else
    {
      this.setData({
        data_display1: false,
        data_display2: true,
        tishi_text: "暂无您的跑步数据"
      });
    }
  }
})