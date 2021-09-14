// pages/songDetial/songDetial.js
import request from "../../utils/request"
import PubSub from 'pubsub-js'

const appInstance = getApp();

Page({

   

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false,
        musicInfo: {},
        musicId: '',
        musicLink:''
    },
    handleMusicPlay() {
        let isPlay = !this.data.isPlay
        this.setData({
            isPlay
        })

        //控制播放暂停
        this.musicControl(isPlay, this.data.musicId)

    },

    async musicControl(isPlay, id,musicLink) {

        let musicLinkData = {}

        if(!musicLink){
            musicLinkData = await request('/song/url', {
                id
            })

            this.setData({
                musicLink
            })
        }

        musicLink = musicLinkData.data[0].url

        console.log(musicLink);


        if (isPlay) {

            //创建控制音乐播放的实例对象
            this.BackgroundAudioManager.src = musicLink
            this.BackgroundAudioManager.title = this.data.musicInfo.name
        } else {
            this.BackgroundAudioManager.pause()

        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let musicid = options.song

        this.setData({
            musicId: musicid
        })


        this.getMusicInfo(musicid)

        this.BackgroundAudioManager = wx.getBackgroundAudioManager()

        this.BackgroundAudioManager.onPause(()=>{
            this.setData({
                isPlay:false
            })
            appInstance.globalData.isMusicPlay = false
        })
        this.BackgroundAudioManager.onPlay(()=>{
            this.setData({
                isPlay:true
            })

            appInstance.globalData.isMusicPlay = true;
            appInstance.globalData.musicid = musicid;

        })

        this.BackgroundAudioManager.onStop(()=>{
            this.setData({
                isPlay:false
            })
            appInstance.globalData.isMusicPlay = false

        })


    },
    handleSwitch(event){

        let type = event.currentTarget.id

        PubSub.subscribe('musicId',(msg,musicId)=>{
            console.log(msg,musicId);

            this.musicControl(true,musicId)
            this.getMusicInfo(musicId)

            PubSub.unsubscribe('musicId')
        })

        PubSub.publish('switchType',type)

      

    },
    async getMusicInfo(id) {

        let musicInfo = await request(`/song/detail`, {
            ids: id
        })

        this.setData({
            musicInfo: musicInfo.songs[0]
        })

        //修改标题
        wx.setNavigationBarTitle({
            title: this.data.musicInfo.name,
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