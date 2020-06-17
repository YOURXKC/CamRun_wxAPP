var util= require('../../utils/util.js');
// pages/updateGrade/updateGrade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArray: [],
    display_null: true,
    display_yes: false,
    display_select: false,
    old_grade: "",
    new_grade: "请选择新年",
    status: "审核中"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var num = Number(options.grade);
    var gradeArray = Array(6);
    for(var i=1; i<=3; i++)
    {
      gradeArray[i-1] = num - (4 - i);
      gradeArray[i+2] = num + i;
    }
    this.setData({
      selectArray: gradeArray,
      old_grade: options.grade
    });
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
      url: util.adminUrl + 'getupdategrade',
      data: {
        redis: util.redis
      },
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success: function (res) {
        //console.log(res.data);
        if(!res.data.status)
        {//已有申请记录
          app.setData({
            new_grade: res.data.data.new_grade,
            display_null: false,
            display_yes: true,
            display_select: false
          });
        }
        else
        {
          app.setData({
            new_grade: "请选择新年",
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
      new_grade: this.data.selectArray[e.detail.value]
    });
  },

  /**
   * 提交申请
   */
  submit: function () {
    if(this.data.new_grade == "请选择新年")
    {
      wx.showToast({
        title: "请选择新年",
        icon: 'none',
        duration: 2000
      });
    }
    else
    {
      var app = this;
      wx.request({
        method: "POST",
        url: util.adminUrl + 'setupdategrade',
        data: {
          redis: util.redis,
          grade_name: this.data.new_grade
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
      url: util.adminUrl + 'delnewgrade',
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