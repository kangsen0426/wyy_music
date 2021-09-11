import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: ""
    },

    handleInput(event) {
        //实时监听表单数据
        let type = event.currentTarget.id;
        this.setData({
            [type]: event.detail.value
        })

        console.log(type);

        console.log(event);
    },
    async login() {
        let {
            password,
            phone
        } = this.data

        if (!phone) {
            wx.showToast({
                title: '手机号不能为空',
                icon: "error"
            })

            return
        }

        let phoneReg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/

        if (!phoneReg.test(phone)) {
            wx.showToast({
                title: '手机号格式错误',
                icon: "error"
            })

            return
        }

        if (!password) {
            wx.showToast({
                title: '密码不能为空',
                icon: "error"
            })
        }


        //后端验证
        let result = await request("/login/cellphone", {
            phone,
            password
        })

        if(result.code == 200){
            wx.showToast({
                title: '登入成功',
            })

            //存储用户信息
            console.log(result.profile);
            wx.setStorageSync('userInfo', JSON.stringify(result.profile))
           

            //跳转
            wx.reLaunch({
              url: '/pages/personal/personal',
            })


        }else if(result.code == 400){
            wx.showToast({
                title: '手机号错误',
                icon: "error"
            })
        }else if(result.code == 502){
            wx.showToast({
                title: '密码错误',
                icon: "error"
            })
        }else{
            wx.showToast({
                title: '登入失败，请重新登入',
                icon: "error"
            })
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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