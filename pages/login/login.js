// pages/register/register.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  		loginAccount_number:{
  			reg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
  			value:null,
  			state:0
  		},
    	loginPwd:{
    		reg:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
    		value:null,
    		state:0
    	},
      phone:"",
      pwd:""
      
  },
  // 点击注册
  navigateToRegister(){
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },
  // 验证手机号格式
  verifyPhone(e){
  	const val = e.detail.value,
  		reg = this.data[e.currentTarget.dataset.reg],
  		that = this;
  	if(val.length === 0){
  		this.data[e.currentTarget.dataset.reg].state = 0;
  		return;
  	}
		if(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(val)){
			this.data[e.currentTarget.dataset.reg].state = 1;
		}else{
			this.data[e.currentTarget.dataset.reg].state = -1;
		}
		console.log(this.data[e.currentTarget.dataset.reg])
    that.setData({
      phone: e.detail.value
    })

  },
  // 验证密码格式
    verifyPwd(e){
	  	const val = e.detail.value,
	  		reg = this.data[e.currentTarget.dataset.reg],
	  		that = this;
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
			console.log(this.data[e.currentTarget.dataset.reg])
      that.setData({
        pwd: e.detail.value
      })
  },
  // 点击登录
  submitLogin(){
  	let alertInfo = "";
    var that=this;
  	if(this.data.loginAccount_number.state === 0 || this.data.loginPwd.state === 0){
  		if(this.data.loginAccount_number.state === 0){
  			alertInfo = "账号不能为空";
  		}else if(this.data.loginPwd.state === 0){
  			alertInfo = "密码不能为空";
  		}
  	}else if(this.data.loginAccount_number.state === -1 || this.data.loginPwd.state === -1){
  		if(this.data.loginAccount_number.state === -1){
  			alertInfo = "账号格式错误";
  		}else if(this.data.loginPwd.state === -1){
  			alertInfo = "密码格式错误";
  		}
  	}
  	if(alertInfo){
  		wx.showModal({
  			title:alertInfo,
  			showCancel:false
  		})
  	}else{
      // 此时账号和密码的初步验证都有了，所以进行进一步验证。获取服务器手机号与密码，与输入的一致才能跳转。
      wx.request({
        url: 'https://www.58cleaning.cn/home/api/login', 
        data: {
          phone: that.data.phone,
          password: that.data.pwd
        },
        method:"POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          // 根据获取的数据进行比较，用户输入的值==服务器返回的  
         if(res.data.success == true){
           if (that.data.phone == res.data.data.userInfo.phone && that.data.pwd == res.data.data.userInfo.password) {
            //  此时登陆的用户名和密码都是正确的
             app.globalData.phoneNumber = res.data.data.userInfo.phone;
             app.globalData.userid = res.data.data.userInfo.userid;
             wx.navigateTo({
               url: '/pages/shopindentification/shopindentification?phone=' + res.data.data.userInfo.phone
             })
           }
         }else{
             wx.showModal({
               title: '账户名或密码不正确',
               showCancel: false
             })
         }
        }
      })
  		
  	}
  }
})