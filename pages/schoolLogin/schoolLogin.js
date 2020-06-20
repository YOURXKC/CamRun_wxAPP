var util= require('../../utils/util.js');
// pages/schoolLogin/schoolLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,//上一页面判断
    bools: false,//是否允许数据提交
    imgPath: "",//验证码路径
    cookie: "",//后台cookie
    viewstate: "",//教务处隐藏验证
    stu_id: "",//学号
    password: "",//密码
    userCode: "",//验证码
    buttonText: "绑定账号"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id)
    {
      this.setData({
        id: options.id,
        buttonText: "登录"
      });
    }
    this.initLogin();
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
   * 初始化登录信息
   */
  initLogin: function () {
    wx.showLoading({title: '初始化中'});
    var app = this;
    //发起网络请求
    wx.request({
      method: "GET",
      url: util.adminUrl + "initeas",
      success: function (res) {
        wx.hideLoading();
        if(res.statusCode == 200)
        {
          app.setData({
            imgPath: res.data.img_path,
            cookie: res.data.cookie,
            viewstate: res.data.viewstate,
            bools: true
          });
        }
        else
        {
          app.setData({bools: false});
        }
      }
    });
  },

  /**
   * 重新加载验证码
   */
  switchCode: function () {
    var app = this;
    //发起网络请求
    wx.request({
      method: "POST",
      url: util.adminUrl + "getCode",
      data: {
        cookie: this.data.cookie
      },
      header: {'content-type': 'application/x-www-form-urlencoded'}, //默认值
      success: function (res) {
        if(res.statusCode == 200)
        {
          app.setData({
            imgPath: res.data,
            bools: true
          });
        }
        else
        {
          app.setData({bools: false});
        }
      }
    });
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
   * 获取用户输入验证码
   */
  getUserCode: function (e) {
    this.data.userCode = e.detail.value;
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
    if(this.data.userCode == "")
    {
      wx.showToast({
        title: "验证码不能为空",
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if(!this.data.bools)
    {
      wx.showToast({
        title: "系统异常，请稍后再试",
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.showLoading({title: '提交中'});
    var app = this;
    //发起网络请求
    wx.request({
      method: "POST",
      url: util.adminUrl + "logineas",
      data: {
        stu_id: this.data.stu_id,
        password: this.data.password,
        code: this.data.userCode,
        cookie: this.data.cookie,
        viewstate: this.data.viewstate
      },
      header: {'content-type': 'application/x-www-form-urlencoded'}, //默认值
      success: function (res) {
        wx.hideLoading();
        if(res.data.status)
        {
          //保存菜单到全局
          util.menu = res.data.menu;
          //判断是登录还是绑定
          if(app.data.id == 0)
          {//绑定时，暂不保存全局cookie,添加用户成功后再保存到全局
            app.bindStudent(util.menu[4].menu_href);
          }
          else
          {//登录时（保存cookie到全局关闭本页）
            //将cookie保存到全局变量
            util.cookie = app.data.cookie;
            //关闭当前页面
            wx.navigateBack();
          }
        }
        else
        {
          //提示错误信息
          wx.showToast({
            title: "三个里面总有你填错的",
            icon: 'none',
            duration: 2000
          });
          //重新加载验证码
          app.switchCode();
        }
      }
    });
  },

  /**
   * 绑定教务系统账户
   */
  bindStudent: function (url) {
    wx.showLoading({title: '绑定中'});
    var app = this;
    //发起网络请求
    wx.request({
      method: "POST",
      url: util.adminUrl + "setstudentsms",
      data: {
        stu_id: this.data.stu_id,
        cookie: this.data.cookie,
        url: url,
        openid: util.openid,
        type: util.type
      },
      header: {'content-type': 'application/x-www-form-urlencoded'}, //默认值
      success: function (res) {
        wx.hideLoading();
        console.log(res.data);
        if(res.data.status)
        {//添加成功
          util.redis = res.data.redis;//保存redis到全局
          util.cookie = app.data.cookie;//保存cookie到全局
          //关闭当前页面
          wx.navigateBack();
        }
        else
        {//添加出现异常
          if(res.data.code == 1)
          {//打开登录页
            wx.showModal({
              title: '提示',
              content: res.data.message,
              success (res) {
                if(res.confirm) 
                {
                  wx.redirectTo({url: "../login/login"});
                }
              }
            });
          }
          else
          {//提示异常信息
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500
            });
          }
        }
      }
    });
  }
})