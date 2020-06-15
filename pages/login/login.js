var util= require('../../utils/util.js');
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu_id: "",
    password: ""
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
   * 获取用户名
   */
  getUserName: function (e) {
    this.data.stu_id = e.detail.value;
  },

  /**
   * 获取用户密码
   */
  getPassword: function (e) {
    this.data.password = e.detail.value;
  },

  /**
   * 提交绑定账号
   */
  clickButton: function () {
    if(this.data.stu_id == "")
    {
      wx.showToast({
        title: "学号不能为空",
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if(this.data.password == "")
    {
      wx.showToast({
        title: "密码不能为空",
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.showLoading({title: '绑定中'});
    //发起网络请求
    wx.request({
      method: "POST",
      url: util.adminUrl + "bindopenid",
      data: {
        openid: util.openid,
        stu_id: this.data.stu_id,
        password: this.data.password
      },
      header: {'content-type': 'application/x-www-form-urlencoded'}, //默认值
      success: function (res) {
        wx.hideLoading();
        if(res.data.status)
        {
          //关闭当前页面
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          });
          util.xbool = true;
          wx.navigateBack();          
        }
        else
        {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  }
})