// pages/index.js

import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [], // 轮播图数组
        recommendList: [], // 推荐歌单数据
        topList: [], //排行榜数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: async function () {

        //轮播图数据
        let bannerListData = await request("/banner", {
            type: 2
        })

        console.log(bannerListData);

        this.setData({
            bannerList: bannerListData.banners
        })

        //推荐歌单数据
        let recommendListData = await request("/personalized", {
            limit: 15
        })

        this.setData({
            recommendList: recommendListData.result
        })

        console.log(recommendListData);

        //推荐歌单数据
        /* 
            1.需要根据 idx 的值获取对应的数据
            2.idx的取值范围是 0 - 20  我们需要  0 - 4
            3.需要发送 5 次请求
        
         */

        let index = 0;
        let resultArr = []

        while (index < 5) {
            let topListData = await request("/top/list", {
                idx: index++
            })

            let topListItem = {
                name: topListData.playlist.name,
                tracks: topListData.playlist.tracks.slice(0, 3)
            }
            resultArr.push(topListItem)

            this.setData({
                topList: resultArr
            })
        }
       

        console.log(resultArr);


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