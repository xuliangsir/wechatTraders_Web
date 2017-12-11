/**
 * 上传方法
 * filePath: 上传的文件路径
 * fileName： 上传到cos后的文件名
 * that: 小程序所在当前页面的 object
 */
function upload(filePath, fileName, that) {
  var data;

  // 鉴权获取签名
  wx.request({
    url: cosSignatureUrl,
    header: {
      Authorization: 'JWT' + ' ' + that.data.jwt.access_token
    },
    success: function (cosRes) {
      // 获取签名
      var signature = cosRes.data.sign;

      // 头部带上签名，上传文件至COS
      var uploadTask = wx.uploadFile({
        url: cosUrl + '/' + fileName,
        filePath: filePath,
        header: {
          'Authorization': signature
        },
        name: 'filecontent',
        formData: {
          op: 'upload'
        },
        success: function (uploadRes) {
          // 上传成功后的操作
          var upload_res = JSON.parse(uploadRes.data)
          var files = that.data.files;
          files.push(upload_res.data.source_url);
          that.setData({
            upload_res: upload_res,
            files: files,
            test_image: upload_res.data.source_url
          })
        },
        fail: function (e) {
          console.log('e', e)
        }
      });
      // 上传进度条
      uploadTask.onProgressUpdate((res) => {
        that.setData({
          upload_progress: res.progress
        })
        if (res.progress === 100) {
          that.setData({
            upload_progress: 0
          })
        }
      })
    }
  })
  return data
}