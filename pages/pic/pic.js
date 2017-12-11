// pages/pic/pic.js


// var cosUrl = "https://picupload-1253210153.cossh.myqcloud.com"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath:"",
    sign:"",
  },
    
  //先确定上传的URL
  







  //图片选择
  uploadToCos: function () {
    var that = this;

    // 选择上传的图片
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 图片类型 original 原图，compressed 压缩图，默认二者都有
      success: function (res) {
        console.log("打印图片上传的res路径", res.tempFilePaths[0]);
        // 图片在前端显示
        var temppath = res.tempFilePaths[0];
        that.setData({
          imgpath: temppath
        })


        // 获取文件路径
        console.log("打印图片文件的res", res);
        var file = res.tempFiles[0];
        console.log(file.size);

        // 获取文件名
        // var fileName = file.path.match(/(wxfile:\/\/)(.+)/)
        // fileName = fileName[2]

        // 获取到图片临时路径后，指定文件名 上传到cos


        
      }
    })
  },

  



  upload:function(){
     //此处可以获取到sign    =====that.data.sign
     //图片路径   imgpath
     var that=this;
     wx.uploadFile({
       url: 'https://bj.file.myqcloud.com/files/v2/1253210153/home/' + "111",
       filePath: that.data.imgpath,
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

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      //页面加载后就获取sign
      wx.request({
        url: "https://www.58cleaning.cn/home/api/getsign",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("======请求sign获取的数据=====",res.data.data.sign)
          var tempsign = res.data.data.sign;
          that.setData({
            sign: tempsign
          })
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