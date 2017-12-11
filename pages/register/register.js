//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    registerVerifyPhonto: {
    	reg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
    	value:"",
    	state:0
    },
    registerVerifyCode:{
    	reg:/^[0-9]{4}$/,
    	value:"",
    	state:0
    },
    phoneNumber:"",
    verifyCode:"",
    pwd:""
    
  },
  onLoad: function () {

  },
  navigateToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  // 验证手机号
  registerVerifyPhontoFn(e){  
  	const val = e.detail.value,   
  		reg = this.data[e.currentTarget.dataset.reg],
  		_this = this;
      console.log(val)
  	if(val.length === 0){
  		this.data[e.currentTarget.dataset.reg].state = 0;
  		return;
  	}
  
    //-------------
    if (val.length == 11){
      
        this.setData({
          phoneNumber:val
        })
    }
  },
  // 点击获取验证码 
  btnGetCode(){
    var that = this;
    if (that.data.phoneNumber.length < 11) {
      wx: wx.showModal({
        title: '手机号不正确',
        showCancel: false,

      })

    }
        // 获取验证码
        wx.request({
          url: 'https://www.58cleaning.cn/home/api/getVerifyCode', 
          data: {
            phone: that.data.phoneNumber
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data);
            
            if(res.data.data.result=="OK"){
              console.log("发送验证码成功");
            }else{
              wx.showModal({
                title: '',
                content: '获取验证码失败',
              })
            }
           

          }
        })
  
  	
  },
  // 验证code
  registerVerifyCodeFn(e){
  	const val = e.detail.value,
  		reg = this.data[e.currentTarget.dataset.reg],
  		that = this;
  	if(val.length === 0){
  		this.data[e.currentTarget.dataset.reg].state = 0;
  		return;
  	}
		
    that.setData({
      verifyCode: val
    })

  },
  // 点击注册按钮
  btnRegisterFn(){
    var that=this;

  	// if(!this.btnGetCode()){
  	// 	let alertInfo = "";
	  // 	if(this.data.registerVerifyCode.state === 0){
	  // 		alertInfo = "验证码不能为空"
	  // 	}else if(this.data.registerVerifyCode.state === -1){
	  // 		alertInfo = "验证码格式不对"
	  // 	}
	  // 	if(alertInfo){
	  // 		wx.showModal({
	  // 			title:alertInfo,
	  // 			showCancel:false
	  // 		})
	  // 	}else{
    //     // step1 获取用户输入的验证码 已经更新到了page.data里边

    //     //step 2 获取后台发送的验证码
    //     wx.request({
    //       url: 'https://www.58cleaning.cn/home/api/regist',
    //       data: {
    //         phone: that.data.phoneNumber,
    //         verifyCode: that.data.verifyCode
    //       },
    //       header: {},
    //       method: "POST",
    //       // dataType: json,
    //       header: {
    //         'content-type': 'application/json' // 默认值
    //       },
    //       success: function(res) {
    //         console.log("打印验证码获取");
    //         console.log(res.data)

    //       }
    //     })

    //     // if(后台的验证码===input的value)那么就跳转到setpassword页面
	  // 		wx.navigateTo({
    //   		url: '/pages/setPassword/setPassword'
    // 		})
	  // 	}
  	// }

    if (that.data.verifyCode.length == 5) {
      var postData = {
        phone: that.data.phoneNumber,
        verifyCode: that.data.verifyCode
      }
      console.log(postData)
      wx.request({
        url: 'https://www.58cleaning.cn/home/api/regist',
        data: postData,
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success: function (res) {
          console.log(res.data);
          if(res.data.data.result){
            wx.navigateTo({
              url: '/pages/setPassword/setPassword?phone=' + that.data.phoneNumber+"&pwd="+that.data.pwd
            })
          }else{
            wx.showModal({
              title: '',
              content: '验证码不正确',
              showCancel:false,
            })
          }  
        }
      })
    } else {
      wx.showModal({
        title: '',
        content: '验证码不正确',
      })
    }
  }
})

