// pages/recommendSong/recommendSong.js
import request from "../../utils/request"
import PubSub from 'pubsub-js'


Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: '',
        month: '',
        recommendList: [],
        index:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //判断用户是否登入
        let userInfo = wx.getStorageSync('userInfo')

        if (!userInfo) {
            wx.showToast({
                title: '请先登入',
                success: () => {
                    wx.reLaunch({
                        url: '/pages/login/login'
                    })
                }
            })
        }

        //获取每日推荐数据
        this.getrecommendListData();


        //更新日期数据
        this.setData({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        })

        PubSub.subscribe('switchType', (msg, data) => {
            console.log(msg, data);

            let {
                recommendList,
                index
            } = this.data

            if (data === "next") {
                (index === 0) && ( index = recommendList.length)
                index--
            } else {
                (index === recommendList.length - 1 ) && (indedx = -1)
                index++
            }

            this.setData({
                index
            })

            let musicId = recommendList[index].id
            
            PubSub.publish('musicId',musicId)

        })
    },

    async getrecommendListData() {
        let recommendListData = await request('/recommend/songs')

        this.setData({
            recommendList: recommendListData.recommend
        })

    },
    toSongDeatil(event) {
        let {
            song,
            index
        } = event.currentTarget.dataset


        this.setData({
            index
        })
        wx.navigateTo({
            url: '/pages/songDetial/songDetial?song=' + song.id,
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