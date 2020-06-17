var util= require('../../utils/util.js');
// pages/updateMajor/updateMajor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArray: [],
    display_null: true,
    display_yes: false,
    display_select: false,
    old_major_name: "",
    new_major_name: "请选择新专业",
    status: "审核中"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({old_major_name: options.major});
    this.loadMajor();
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
   * 加载专业名称
   */
  loadMajor: function () {
    var app = this;
    wx.request({
      url: util.adminUrl + 'getallmajor',
      success: function (res) {
        app.setData({selectArray: res.data});
      }
    });
  },

  /**
   * 查询申请
   */
  query: function () {
    var app = this;
    wx.request({
      method: "POST",
      url: util.adminUrl + 'getupdatemajor',
      data: {
        redis: util.redis
      },
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success: function (res) {
        //console.log(res.data);
        if(!res.data.status)
        {//已有申请记录
          app.setData({
            new_major_name: res.data.data.new_major,
            display_null: false,
            display_yes: true,
            display_select: false
          });
        }
        else
        {
          app.setData({
            new_major_name: "请选择新专业",
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
      new_major_name: this.data.selectArray[e.detail.value]
    });
  },

  /**
   * 提交申请
   */
  submit: function () {
    if(this.data.new_major_name == this.data.old_major_name)
    {
      wx.showToast({
        title: "新专业不能与之前的专业相同",
        icon: 'none',
        duration: 2000
      });
    }
    else if(this.data.new_major_name == "请选择新专业")
    {
      wx.showToast({
        title: "请选择新专业",
        icon: 'none',
        duration: 2000
      });
    }
    else
    {
      var app = this;
      wx.request({
        method: "POST",
        url: util.adminUrl + 'setupdatemajor',
        data: {
          redis: util.redis,
          major_name: this.data.new_major_name
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
      url: util.adminUrl + 'delnewmajor',
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