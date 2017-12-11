// pages/setting/setting.js


var app = getApp();
var pic = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'guangzhou', value: '广州' },
      { name: 'beijing', value: '北京', checked: 'true' },
      { name: 'shanghai', value: '上海' },
      { name: 'shenzhen', value: '深圳' },
      
    ],
    time_start: '08:00',
    time_end: '11:00',
    src:'',
    imageList:[],
    uploadPicBtn: true,
    token:"",
    url:[],//图片的服务器上的url=to houtai 的url
    
  },
  //表单提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that=this;
    console.log(that.data.imageList);
    // 点击提交按钮的时候 先提交相册获取url再进行整个的提交 最后提醒保存成功
   
    if (that.data.url==""){
    //提交相册获取url
      var arr=that.data.imageList;
      var imageUrlArr = [];
      for(var i=0;i<arr.length;i++){
        console.log("======第",i,"项获取url成功")
        var key = Math.random().toString(36).substr(2); //生成一个随机字符串的文件名
        wx.uploadFile({
          url: app.globalData.qiniu_images,
          filePath: arr[i],
          name: 'file',
          formData: {
            'token': that.data.token,//刚刚获取的上传凭证
            'key': key//这里是为文件设置上传后的文件名
          },
          success: function (res) {
            console.log("=========图片返回的内容=======", res.data)
            var data = res.data;
            if (typeof data === 'string') {
              data = JSON.parse(data.trim())//解压缩
              console.log("=======typeof data === 'string'====")
            }
            if (data.key) {
              var tempurl = app.globalData.qiniucloud_interface + data.key;
              
              imageUrlArr.push(tempurl);
              that.setData({
                url: imageUrlArr
              })
              //这里就可以直接使用data.key，文件已经上传成功可以使用了。如果是图片也可以直接通过image调用。        
              console.log("=====url格式====",that.data.url)
              console.log("=====url格式+引号====", that.data.url+"")
              // 拼接出外链图片地址 url+ key
            }
          },
          fail: function (res) {
            console.log("===上传失败了=", res.data)
          }
        })
      }
      

    } else if (that.data.imageList.length == 0){
      //如果图片没有上传，提醒请上传图片
      wx.showModal({
        title: '提示',
        content: '请上传图片',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }else{
      console.log("=========url已经生成=====") 
      wx.request({
        url: app.globalData.houtai_interface + "home/api/addshopsetupinfo",
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        data: {
          userid: app.globalData.userid,
          phone: app.globalData.phoneNumber + "",
          name: e.detail.value.shopname,
          servicemobile: e.detail.value.servicephone,
          servicetimebegin: e.detail.value.time_start,
          servicetimeend: e.detail.value.time_end,
          servicerange: "",
          album: that.data.url,
          orderattention: "",
          shopintro: "",
          week: "",
          minorderlimit: "",
          attachcost: "",
          exemptattachcost: "",
          appointmenttime: "1.5"

        },
        success: function (res) {
          console.log("----------表单上传成功------------", res.data)
        },
        fail: function (res) {
          console.log("=============表单上传失败----------------", res.data)
        }
      }),
        console.log(that.data.imageList);
      // 上传成功后提醒 保存成功
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      });
    }
  },
  bindTimeChange_start: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time_start: e.detail.value
    })
  },
  bindTimeChange_end: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time_end: e.detail.value
    })
  },

  // 选择照片
  chooseImage: function () {
    var that = this;
    var tempCount = 9 - that.data.imageList.length;
    if (tempCount < 1) {
      that.setData({
        uploadPicBtn: false
      })
    }
    wx.chooseImage({
      count: tempCount,
      sizeType: 'compressed',
      success: function (res) {
        console.log(res);
        console.log(tempCount);
        var tempImageList = that.data.imageList.concat(res.tempFilePaths);
        pic = 1;
        that.setData({
          imageList: tempImageList
        })
        if (tempImageList.length == 9) {
          that.setData({
            uploadPicBtn: false
          })
        }
      }
    })
  

  },


  //预览照片
  previewImage: function (e) {
    console.log(this.data.imageList);
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  // 删除未上传图片
  delPic: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.data.imageList.splice(index, 1);
    that.setData({
      imageList: that.data.imageList,
      uploadPicBtn: true
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取token
    var that=this;
    wx.request({
      url: app.globalData.houtai_interface+'home/api/getqiniutoken',
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        console.log("=====获取七牛云token=====", res.data)
        var temptoken = res.data.data.token;
        that.setData({
          token: temptoken
        })

      },
      fail: function (res) {
        console.log("=====获取token失败========")
      }

    })
    
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
  
  }
})