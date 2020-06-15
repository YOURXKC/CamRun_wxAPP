var util= require('../../utils/util.js');
// pages/uppassword/uppassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPassword: "",
    newPassword1: "",
    newPassword2: ""
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
   * 输入旧密码
   */
  setOldPassword: function (e) {
    this.data.oldPassword = e.detail.value;
  },

  /**
   * 第一次输入新密码
   */
  setNewPassword1: function (e) {
    this.data.newPassword1 = e.detail.value;
  },

  /**
   * 第二次输入新密码
   */
  setNewPassword2: function (e) {
    this.data.newPassword2 = e.detail.value;
  },

  /**
   * 提交数据
   */
  updateData: function () {
    //判断旧密码是否已经输入
    if(this.data.oldPassword == "")
    {
      wx.showToast({
        title: '请输入原密码',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    //判断新密码第一次是否已经输入
    if(this.data.newPassword1 == "")
    {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    //判断新密码第二次是否已经输入
    if(this.data.newPassword2 == "")
    {
      wx.showToast({
        title: '请再输入一遍新密码',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    //判断两次密码是否输入一致
    if(this.data.newPassword1 != this.data.newPassword2)
    {
      wx.showToast({
        title: '两次输入不一致',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    //判断旧密码与新密码是否相同
    if(this.data.oldPassword == this.data.newPassword2)
    {
      wx.showToast({
        title: '新、旧密码不能相同',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    //判断密码是否小于6为字符
    if(this.data.newPassword1.length < 6 || this.data.newPassword1.length < 6)
    {
      wx.showToast({
        title: '密码长度不能低于6位字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    //调用密码修改
    this.updatePassword();
  },

  /**
   * 执行密码修改
   */
  updatePassword: function () {
    wx.showLoading({
      title: '修改中',
    });
    //发起网络请求
    wx.request({
      method: "POST",
      url: util.adminUrl + "updatepassword",
      data: {
        openid: util.openid,
        oldPassword: this.data.oldPassword,
        newPassword: this.data.newPassword1
      },
      header: {'content-type': 'application/x-www-form-urlencoded'}, //默认值
      success: function (res) {
        wx.hideLoading();
        if(res.data.status)
        {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          });
          //2秒后关闭当前页面
          setTimeout(function(){
            wx.navigateBack();
          },2000);
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