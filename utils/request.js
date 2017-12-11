var api = require('./api.js');
var app = getApp();
/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */

function requestData(url, data0, successCallback, errorCallback) {
    wx.request({
        url: url,
        method: 'POST',
        data: data0,
        success: function (res) {
            successCallback(res);
        },
        error: function (res) {
            errorCallback(res);
        },
    });
}
function requestDataPic(url, data0, imageList, successCallback, errorCallback) {
    wx.uploadFile({
        url: url,
        filePath: imageList,
        name: 'file',
        formData: data0,
        success: function (res) {
            successCallback(res);
        },
        error: function (res) {
            errorCallback(res);
        },
    })
}
// 授权登录
function login(data0, successCallback, errorCallback) {
    requestData(api.login(), data0, successCallback, errorCallback);
}
// 获取Banner
function getBanner(data0, successCallback, errorCallback) {
    requestData(api.getBanner(), data0, successCallback, errorCallback);
}
// 存储用户信息
function checkLogin(data, successCallback, errorCallback) {
    requestData(api.checkLogin(), data, successCallback, errorCallback);
}
// 个人中心
function getUser(data, successCallback, errorCallback) {
    requestData(api.getUser(), data, successCallback, errorCallback);
}
// 分类列表信息
function getType(data, successCallback, errorCallback) {
    requestData(api.getType(), data, successCallback, errorCallback);
}
// 获取区域列表
function getArea(data, successCallback, errorCallback) {
    requestData(api.getArea(), data, successCallback, errorCallback);
}
// 发布新需求
function addNotice(data, successCallback, errorCallback) {
    requestData(api.addNotice(), data, successCallback, errorCallback);
}
// 修改一条需求
function editNotice(data, successCallback, errorCallback) {
  requestData(api.editNotice(), data, successCallback, errorCallback);
}
// 发布新需求(有图)
function addNoticePic(data, imageList, successCallback, errorCallback) {
    requestDataPic(api.addNoticePic(), data, imageList, successCallback, errorCallback);
}
// 获取便民信息列表
function getUserTypeList(data, successCallback, errorCallback) {
    requestData(api.getUserTypeList(), data, successCallback, errorCallback);
}
// 获取个人发布列表
function getUserList(data, successCallback, errorCallback) {
    requestData(api.getUserList(), data, successCallback, errorCallback);
}
// 获取个人发布列表单条信息
function getUserListOne(data, successCallback, errorCallback) {
  requestData(api.getUserListOne(), data, successCallback, errorCallback);
}
// 删除个人已发布信息
function noticeDel(data, successCallback, errorCallback) {
    requestData(api.noticeDel(), data, successCallback, errorCallback);
}
// 获取每日趣图
function getQupic(data, successCallback, errorCallback) {
    requestData(api.getQupic(), data, successCallback, errorCallback);
}
// 获取Banner详情
function getBannerDetial(data, successCallback, errorCallback) {
    requestData(api.getBannerDetial(), data, successCallback, errorCallback);
}
// 获取公司配置信息
function getPeizhi(data, successCallback, errorCallback) {
  requestData(api.getPeizhi(), data, successCallback, errorCallback);
}
// 获取类目信息
function getTypes(data, successCallback, errorCallback) {
  requestData(api.getTypes(), data, successCallback, errorCallback);
}
// 获取类目名称
function getTname(data, successCallback, errorCallback) {
  requestData(api.getTname(), data, successCallback, errorCallback);
}
// 获取地区名称
function getAname(data, successCallback, errorCallback) {
  requestData(api.getAname(), data, successCallback, errorCallback);
}

// 获取默认地区
function getMapList(data, successCallback, errorCallback) {
  requestData(api.getMapList(), data, successCallback, errorCallback);
}
// 获取active详情
function getPicDetail(data, successCallback, errorCallback) {
  requestData(api.getPicDetail(), data, successCallback, errorCallback);
}
// 获取Icon详情
function getIcon(data, successCallback, errorCallback) {
  requestData(api.getIcon(), data, successCallback, errorCallback);
}

function getCompany(data, successCallback, errorCallback) {
  requestData(api.getCompany(), data, successCallback, errorCallback);
}

function getewm(data, successCallback, errorCallback) {
  requestData(api.getewm(), data, successCallback, errorCallback);
}


//商城的接口
function addBusiness(data, successCallback, errorCallback) {
  requestData(api.addBusiness(), data, successCallback, errorCallback);
}
function getBusiness(data, successCallback, errorCallback) {
  requestData(api.getBusiness(), data, successCallback, errorCallback);
}
function getGoodsType(data, successCallback, errorCallback) {
  requestData(api.getGoodsType(), data, successCallback, errorCallback);
}
function getGoodsList(data, successCallback, errorCallback) {
  requestData(api.getGoodsList(), data, successCallback, errorCallback);
}
function getGoodsDetail(data, successCallback, errorCallback) {
  requestData(api.getGoodsDetail(), data, successCallback, errorCallback);
}
function getActiveType(data, successCallback, errorCallback) {
  requestData(api.getActiveType(), data, successCallback, errorCallback);
}
function getActiveList(data, successCallback, errorCallback) {
  requestData(api.getActiveList(), data, successCallback, errorCallback);
}
function addOrder(data, successCallback, errorCallback) {
  requestData(api.addOrder(), data, successCallback, errorCallback);
}
function addCart(data, successCallback, errorCallback) {
  requestData(api.addCart(), data, successCallback, errorCallback);
}
function getCartList(data, successCallback, errorCallback) {
  requestData(api.getCartList(), data, successCallback, errorCallback);
}
function addNum(data, successCallback, errorCallback) {
  requestData(api.addNum(), data, successCallback, errorCallback);
}
function reduceNum(data, successCallback, errorCallback) {
  requestData(api.reduceNum(), data, successCallback, errorCallback);
}
function getBusinessIcon(data, successCallback, errorCallback) {
  requestData(api.getBusinessIcon(), data, successCallback, errorCallback);
}
function getNearBusiness(data, successCallback, errorCallback) {
  requestData(api.getNearBusiness(), data, successCallback, errorCallback);
}
function getGoodsSearch(data, successCallback, errorCallback) {
  requestData(api.getGoodsSearch(), data, successCallback, errorCallback);
}
function getBusinessDetail(data, successCallback, errorCallback) {
  requestData(api.getBusinessDetail(), data, successCallback, errorCallback);
}
function getShowGoodsList(data, successCallback, errorCallback) {
  requestData(api.getShowGoodsList(), data, successCallback, errorCallback);
}
function AllWeiPay(data, successCallback, errorCallback) {
  requestData(api.AllWeiPay(), data, successCallback, errorCallback);
}
function OneWeiPay(data, successCallback, errorCallback) {
  requestData(api.OneWeiPay(), data, successCallback, errorCallback);
}
function getMyOrder(data, successCallback, errorCallback) {
  requestData(api.getMyOrder(), data, successCallback, errorCallback);
}
function WeiPay(data, successCallback, errorCallback) {
  requestData(api.WeiPay(), data, successCallback, errorCallback);
}
function CheckOrder(data, successCallback, errorCallback) {
  requestData(api.CheckOrder(), data, successCallback, errorCallback);
}
function CancelOrder(data, successCallback, errorCallback) {
  requestData(api.CancelOrder(), data, successCallback, errorCallback);
}

function ReceiveGoods(data, successCallback, errorCallback) {
  requestData(api.ReceiveGoods(), data, successCallback, errorCallback);
}
function DeleteOneCart(data, successCallback, errorCallback) {
  requestData(api.DeleteOneCart(), data, successCallback, errorCallback);
}

function DeleteAllCart(data, successCallback, errorCallback) {
  requestData(api.DeleteAllCart(), data, successCallback, errorCallback);
}
function getComment(data, successCallback, errorCallback) {
  requestData(api.getComment(), data, successCallback, errorCallback);
}
function addOrderComment(data, successCallback, errorCallback) {
  requestData(api.addOrderComment(), data, successCallback, errorCallback);
}

function getCommentList(data, successCallback, errorCallback) {
  requestData(api.getCommentList(), data, successCallback, errorCallback);
}
function getClearTime(data, successCallback, errorCallback) {
  requestData(api.getClearTime(), data, successCallback, errorCallback);
}

function addPic(data, imageList, successCallback, errorCallback) {
  requestDataPic(api.addPic(), data, imageList, successCallback, errorCallback);
}
function addLiuyan(data, successCallback, errorCallback) {
  requestData(api.addLiuyan(), data, successCallback, errorCallback);
}
function deleteOrder(data, successCallback, errorCallback) {
  requestData(api.deleteOrder(), data, successCallback, errorCallback);
}
function getBusinessSearch(data, successCallback, errorCallback) {
  requestData(api.getBusinessSearch(), data, successCallback, errorCallback);
}


module.exports = {
    login: login,
    getBanner: getBanner,
    checkLogin: checkLogin,
    getUser: getUser,
    getType: getType,
    getArea: getArea,
    addNotice: addNotice,
    getUserTypeList: getUserTypeList,
    getUserList: getUserList,
    getUserListOne: getUserListOne,
    noticeDel: noticeDel,
    getQupic: getQupic,
    getBannerDetial: getBannerDetial,
    addNoticePic: addNoticePic,
    getPeizhi: getPeizhi,
    getTypes: getTypes,
    editNotice: editNotice,
    getTname: getTname,
    getAname: getAname,
    getMapList: getMapList,
    getPicDetail: getPicDetail,
    getIcon: getIcon,
    getCompany: getCompany,
    getewm: getewm,
    addBusiness: addBusiness,
    getBusiness: getBusiness,
    getGoodsType: getGoodsType,
    getGoodsList: getGoodsList,
    getGoodsDetail: getGoodsDetail,
    getActiveType: getActiveType,
    getActiveList: getActiveList,
    addOrder: addOrder,
    addCart: addCart,
    getCartList: getCartList,
    addNum: addNum,
    reduceNum: reduceNum,
    getBusinessIcon: getBusinessIcon,
    getNearBusiness: getNearBusiness,
    getGoodsSearch: getGoodsSearch,
    getBusinessDetail:getBusinessDetail,
    getShowGoodsList: getShowGoodsList,
    AllWeiPay: AllWeiPay,
    OneWeiPay: OneWeiPay,
    getMyOrder: getMyOrder,
    WeiPay: WeiPay,
    CheckOrder: CheckOrder,
    CancelOrder: CancelOrder,
    ReceiveGoods: ReceiveGoods,
    DeleteOneCart: DeleteOneCart,
    DeleteAllCart: DeleteAllCart,
    getComment: getComment,
    addOrderComment: addOrderComment,
    getCommentList: getCommentList,
    getClearTime: getClearTime,
    addPic: addPic,
    addLiuyan: addLiuyan,
    deleteOrder: deleteOrder,
    getBusinessSearch: getBusinessSearch
};