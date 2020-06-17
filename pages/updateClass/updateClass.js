var util= require('../../utils/util.js');
// pages/updateClass/updateClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArray: [
      '本班',
      '一班',
      '二班'
    ],
    display_null: true,
    display_yes: false,
    display_select: false,
    old_class_name: "",
    new_class_name: "请选择新班级",
    status: "审核中"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({old_class_name: options.class});
    this.query();
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
   * 查询申请
   */
  query: function () {
    var app = this;
    wx.request({
      method: "POST",
      url: util.adminUrl + 'getupdateclass',
      data: {
        redis: util.redis
      },
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success: function (res) {
        //console.log(res.data);
        if(!res.data.status)
        {//已有申请记录
          app.setData({
            new_class_name: res.data.data.new_class,
            display_null: false,
            display_yes: true,
            display_select: false
          });
        }
        else
        {
          app.setData({
            new_class_name: "请选择新班级",
            display_null: true,
            display_yes: false,
            display_select: false
          });
        }
      }
    });
  },

  /**
   * 显示选项
   */
  showSelect: function () {
    this.setData({
      display_null: false,
      display_yes: false,
      display_select: true
    });
  },

  /**
   * 选中选项
   */
  setNewClass: function (e) {
    this.setData({
      new_class_name: this.data.selectArray[e.detail.value]
    });
  },

  /**
   * 提交申请
   */
  submit: function () {
    if(this.data.new_class_name == this.data.old_class_name)
    {
      wx.showToast({
        title: "新班级不能与之前的班级相同",
        icon: 'none',
        duration: 2000
      });
    }
    else if(this.data.new_class_name == "请选择新班级")
    {
      wx.showToast({
        title: "请选择新班级",
        icon: 'none',
        duration: 2000
      });
    }
    else
    {
      var app = this;
      wx.request({
        method: "POST",
        url: util.adminUrl + 'setupdateclass',
        data: {
          redis: util.redis,
          class_name: this.data.new_class_name
        },
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          if(res.data)
          {
            //刷新当前页面
            app.query();
          }
          else
          {
            wx.showToast({
              title: "提交申请失败",
              icon: 'none',
              duration: 2000
            });
          }
        }
      });
    }
  },

  /**
   * 撤销申请
   */
  revoke: function () {
    var app = this;
    wx.request({
      method: "POST",
      url: util.adminUrl + 'delnewclass',
      data: {
        redis: util.redis
      },
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success: function (res) {
        if(res.data)
        {
          //刷新当前页面
          app.query();
        }
        else
        {
          wx.showToast({
            title: "撤销申请失败",
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  }
})