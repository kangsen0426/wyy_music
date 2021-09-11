// pages/personal/personal.js

let startY = 0; //手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistanceY = 0; //手指移动的距离

Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform: "translateY(0)",
        coverTransition:"",
        userInfo:{}//用户信息
    },
    handleTouchStart(event) {
        startY = event.touches[0].clientY;

        this.setData({
            coverTransition:''
        })
    },
    handleTouchMove(event) {
        moveY = event.touches[0].clientY;

        moveDistanceY = moveY - startY;

        if (moveDistanceY <= 0) {
            return;
        }
        if (moveDistanceY >= 80) {
            moveDistanceY = 80;
        }
        this.setData({
            coverTransform: `translateY(${moveDistanceY}rpx)`
        })

    },
    handleTouchEnd() {
        this.setData({
            coverTransform: "translateY(0)",
            coverTransition:'transform 0.5s linear'
        })

    },
    toLogin(){
        wx.navigateTo({
          url: '/pages/login/login',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userInfo')
        
       if(userInfo){
            this.setData({
                userInfo:JSON.parse(userInfo)
            })

            
       }
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