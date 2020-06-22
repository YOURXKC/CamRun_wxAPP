var util= require('../../utils/util.js');
// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: "欢迎你",
    user_no: "0000000000",
    user_class: "",
    user_grade: "",
    user_major: ""
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
    if(util.redis != "")
    {
      if(this.data.user_no == "0000000000")
      {
        this.queryStudent();
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
            user_class: res.data.message.stu_class,
            user_grade: res.data.message.stu_year,
            user_major: res.data.message.major
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
   * 打开功能
   */
  clickUpdate: function (e) {
    if(util.redis != "")
    {
      var id = Number(e.currentTarget.dataset.id);
      switch(id)
      {
        case 1: wx.navigateTo({url: '../uppassword/uppassword'});break;
        case 2: wx.navigateTo({url: '../updateMajor/updateMajor?major='+this.data.user_major});break;
        case 3: wx.navigateTo({url: '../updateGrade/updateGrade?grade='+this.data.user_grade});break;
        case 4: wx.navigateTo({url: '../updateClass/updateClass?class='+this.data.user_class});break;
        case 5: wx.showToast({
          title: '暂未开放',
          icon: 'none',
          duration: 2000
        });break;
        case 6: wx.navigateTo({url: '../testFraction/testFraction'});break;
        case 7: wx.navigateTo({url: '../studentSms/studentSms'});break;
        case 8: ;break;
        case 9: ;break;
      }
    }
    else
    {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
    }
  }
})