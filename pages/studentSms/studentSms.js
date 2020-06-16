var util= require('../../utils/util.js');
// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: "未知",
    user_no: "未知",
    user_college: "未知",
    user_major: "未知",
    user_syear:"未知",
    user_grade: "未知",
    user_class: "未知"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(util.redis != "")
    {
      this.queryStudent();
    }
    else
    {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
    }
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
   * 查询学生信息
   */
  queryStudent: function () {
    var app = this;
    //发起网络请求
    wx.request({
      method: "POST",
      url: util.adminUrl + "getstudent",
      data: {
        redis: util.redis
      },
      header: {'content-type': 'application/x-www-form-urlencoded'}, //默认值
      success: function (res) {
        if(res.data.status)
        {
          app.setData({
            user_name: res.data.message.name,
            user_no: res.data.message.stu_id,
            user_college: res.data.message.college,
            user_major: res.data.message.major,
            user_syear: res.data.message.stu_syear,
            user_grade: res.data.message.stu_year,
            user_class: res.data.message.stu_class
          });
        }
        else
        {
          wx.showToast({
            title: '查询数据出错',
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  },

  /**
   * 返回
   */
  fanhuiVoid: function () {
    wx.navigateBack();
  }
})