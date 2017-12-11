// pages/submitInformation/submitInformation.js
// var plupload = require("../../utils/plupload/js/plupload.full.min.js"),
//     s = require("../../utils/plupload/js/plupload.dev.js"),
//         u  = require("../../utils/qiniu/dist/qiniu.min.js")
  
var app = getApp(); 
Page({
  data: {
    style_items: [
      { name: '0', value: '公司' },
      { name: '1', value: '个人' }
    ],
    style_state:1,
    logo: null,
    identityCard_front:null,
    identityCard_back:null,
    userInfo:{
      baby_sex:null
    },
    filePath:"",
    url:"",
    // formData: "",
    // tempFiles:tempFiles
    //上传到腾讯云的sign
    sign:"",
    //input的一些数据
    licencename:"",
    tel_name:"",
    identitycardnum:"",
    //后台获取到的一些此处不需要上传的问题
    creditcode:"",
    licenceregnum:"",
    registaddress:"",
    licencelocation:"",
    legalentity:"",
    limittimebegin:"",
    limittimeend:"",
    identitycardphoto:"",
    //licenceurl
    licenceurl:""

  },

  //保存按钮的页面跳转   
  navigatetoSet:function(){
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 8000
    })
    console.log("跳转到店铺设置页面")
    wx.navigateTo({
      url: '../shopsetting/shopsetting',
    })
  },
 
  // 点击保存按钮的时候会触发bindSaveTap事件 提交表单内的数据
  bindSaveTap: function (e) {
    var that = this;
    console.log(e.detail.value,"====保存按钮点击后的e.detail.value=====");
    console.log(e.detail.value, "====保存按钮点击后的name=====");
    console.log('------------token---------------', that.data.token);
    console.log('------------that.data.filePath---------------', that.data.filePath);
    
    
    
    // 图片上传到腾讯云======待做
    wx.uploadFile({
      url: 'https://bj.file.myqcloud.com/files/v2/1253210153/home/' + "222",
      filePath: that.data.filePath,
      name: 'filecontent',
      header: {
        'Authorization': that.data.sign
      },
      formData: {
        op: 'upload'
      },
      success: function (uploadRes) {
        console.log("==========图片上传后的返回内容==========", uploadRes)
      }
    })


    
    
    
    // //图片上传获取url
    // var key = Math.random().toString(36).substr(2); //生成一个随机字符串的文件名
    // wx.uploadFile({
    //   url: app.globalData.qiniu_images,
    //   filePath: that.data.filePath,
    //   name: 'file',
    //   formData: {
    //     'token': that.data.token,//刚刚获取的上传凭证
    //     'key': key//这里是为文件设置上传后的文件名
    //   },
    //   success:function(res){
    //     console.log("=========图片返回的内容=======", res.data)
    //     var data =res.data;
    //     if (typeof data === 'string') {
    //       data = JSON.parse(data.trim())//解压缩
    //       console.log("=======typeof data === 'string'====")
    //     }
    //     if (data.key) {
    //       var tempurl = app.globalData.qiniucloud_interface + data.key;
    //       that.setData({
    //         url: tempurl
    //       }) 
    //     //这里就可以直接使用data.key，文件已经上传成功可以使用了。如果是图片也可以直接通过image调用。
    //     // 拼接出外链图片地址 url+ key
    //     }
    //   },
    //   fail: function (res) {
    //     console.log("===上传失败了=",res.data)
    //   }
    // }),












    //表单上传
     wx.request({
      url: app.globalData.houtai_interface + "home/api/addshopcertifyInfo",
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"POST",
      data:{
        userid: app.globalData.userid,
        phone: app.globalData.phoneNumber+"",
        licencename: e.detail.value.nick_name,
        type: e.detail.value.baby_sex,
        name: e.detail.value.tel_name,
        identitycardnum: e.detail.value.tel_id,
        licenceurl: that.data.licenceurl,
        creditcode: that.data.creditcode,
        licenceregnum: that.data.licenceregnum,
        registaddress: that.data.registaddress,
        licencelocation: that.data.licencelocation,
        legalentity: that.data.legalentity,
        limittimebegin: that.data.limittimebegin,
        limittimeend: that.data.limittimeend,
        identitycardphoto: that.data.identitycardphoto,
      },
      success: function (res) {
        console.log("=======表单上传res.data------------",res.data)
      },
      fail: function (res) {
        console.log("=============表单上传失败----------------",res.data)
      }
     })







     
  },












  onLoad: function(options){
    var that =this;
    console.log('onLoad')
    // console.log("=======页面参数=====",options)
    
    //页面加载后就获取sign
    wx.request({
      url: "https://www.58cleaning.cn/home/api/getsign",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("======请求sign获取的数据=====", res.data.data.sign)
        that.setData({
          sign: res.data.data.sign
        })
      }
    })


    //已有企业基本信息获取  页面一显示就需要获取到
    wx.request({
      url: app.globalData.houtai_interface + 'home/api/getshopcertifyInfo',
      data: {
        userid: app.globalData.userid,
        phone: app.globalData.phoneNumber + ""
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("=============获取到的店铺认证信息=====", res.data)
        // 把获取到的信息放到每一个应该放到的input里，并且把其他不需要的信息也放到data里，然后点击保存的时候把这些数据给上传的那一个参数
 
        that.setData({
          licencename: res.data.data.licencename,
          tel_name: res.data.data.name,
          identitycardnum: res.data.data.identitycardnum,
          "userInfo.baby_sex": res.data.data.type,
          licenceurl: res.data.data.licenceurl,
          creditcode: res.data.data.creditcode,
          licenceregnum: res.data.data.licenceregnum,
          registaddress: res.data.data.registaddress,
          licencelocation: res.data.data.licencelocation,
          legalentity: res.data.data.legalentity,
          limittimebegin: res.data.data.limittimebegin,
          limittimeend: res.data.data.limittimeend,
          identitycardphoto: res.data.data.identitycardphoto,

        })
      }
    })
  
  },


  chooseImageTap: function (e) {
    let _this = this,
    imgName = e.currentTarget.dataset.img;
    // tempFiles = e.currentTarget.dataset.tempFiles;
    console.log(e.currentTarget.dataset.img)
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album',imgName)
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera',imgName)
          }
        }
        
      }
    })
  },

  // 选择图片
  chooseWxImage: function (type,name) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original','compressed'],
      sourceType: [type],
      success: function (res){
        console.log("-------打印chooseWxImage-res--------------", res);
        that.setData({
          [name]: res.tempFilePaths[0],
        })
        that.setData({ 
          filePath: res.tempFilePaths[0]
        })
        console.log("-------打印字符串路径--------------", res.tempFilePaths[0]);
        console.log("-------打印数组路径--------------", res.tempFilePaths);
      }
    })
  },
  // 点击单选按钮
  changeRadioFn(e){
    this.setData({
      style_state:e.detail.value
    })
    console.log(this.data)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '家之圈可好了',
      path: '/pages/login/login',
      imageUrl: "../../images/share.png",
      success: function (res) {
        // 转发成功
        console.log("======转发成功===")
      },
      fail: function (res) {
        // 转发失败
        console.log("======转发失败===")
      }
    }
  }
    
  
})