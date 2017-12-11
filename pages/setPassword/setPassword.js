// pages/changePassword/changePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	setPwd:{
    		reg:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
    		value:null,
    		state:0
    },
    repeatPwd:null,
    phone:"",
    oldpassword:""
    
  },
  //获取页面携带而来的参数
  onLoad: function (options) {
    var that = this;
    console.log("页面传过来的参数是" + options);
    that.setData({
      phone: options.phone,
      oldpassword: options.pwd
    })
  },
  // 验证密码格式
  setVerifyPwd(e){
	  	const val = e.detail.value,
	  		reg = this.data[e.currentTarget.dataset.reg];
	  	if(val.length === 0){
	  		this.data[e.currentTarget.dataset.reg].state = 0;
	  		return;
	  	}
			if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(val)){
				this.data[e.currentTarget.dataset.reg].state = 1;
				console.log("成功")
			}else{
				this.data[e.currentTarget.dataset.reg].state = -1;
			}
      this.data.setPwd.value = val;
			console.log(this.data[e.currentTarget.dataset.reg])
  },
  // 点击设置密码
  btnSetPwd(e) {
    var that=this;
    let alertInfo = "";
    if (this.data.setPwd.state === 0) {
      alertInfo = "密码不能为空";
    } else if (this.data.setPwd.state === -1) {
      alertInfo = "密码格式错误"
    }
    if (alertInfo) {
      wx.showModal({
        title: alertInfo,
        showCancel: false
      })
    } else if (this.data.setPwd.value !== this.data.repeatPwd) {
      wx.showModal({
        title: "两次密码不一致",
        showCancel: false
      })
    } else {
      that.setData({
        repeatPwd: that.data.repeatPwd
      })
      wx.navigateTo({
        url: "/pages/shopindentification/shopindentification"
      })
      console.log("向后台发起ajax请求 把密码发送到后台")
      wx.request({
        url: "https://www.58cleaning.cn/home/api/resetuppwd",
        data: {
          phone:that.data.phone,
          oldpassword: that.data.oldpassword,
          password: that.data.repeatPwd
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success: function(res) {
          console.log("密码上传成功")
        },
        
      })
    }
  },
  // 二次输入密码
  repeatPwdFn(e){
    console.log(e.detail.value)
    this.setData({
      repeatPwd:e.detail.value
    })
  },
	navigateToLogin() {
	    wx.redirectTo({
	      url: '/pages/login/login'
	    })
	}
  
})