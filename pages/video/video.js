// pages/video.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList: [],
        navId: '',
        videoList: [], //视频列表数据
        videoId: '',
        videoUpdateTime: [], //视频播放的时长,
        isTriggered: false //是否触发下拉刷新
    },

    chaneNav(event) {
        let navId = event.currentTarget.id;
        this.setData({
            navId,
            videoList: []
        })

        //显示正在加载
        wx.showLoading({
            title: '正在加载',
        })
        //获取当前视频导航的数据
        this.getVideoList(this.data.navId)
    },

    async getvideoGroupListData() {
        let videoGroupListData = await request("/video/group/list")

        console.log(videoGroupListData);
        this.setData({
            videoGroupList: videoGroupListData.data.splice(0, 14),
            navId: '58100'
        })
        this.getVideoList(this.data.navId)
    },
    async getVideoList(navId) {
        //获取视频列表数据
        if (!navId) {
            return
        }
        let videoListData = await request("/video/group", {
            id: navId
        })

        //关闭加载框
        wx.hideLoading({
            success: (res) => {},
        })

        let index = 0;
        let videoList = videoListData.datas.map(item => {
            item.id = index++;
            return item
        })

        this.setData({
            videoList,
            isTriggered: false
        })

        console.log(videoListData);
    },
    handlePlay(event) {
        //点击播放图标

        //创建 video 对象实例
        let vid = event.currentTarget.id;
        //关闭上一个视频
        //this.vid != vid && this.videoContext && this.videoContext.stop()
        // this.vid = vid
        //更新 videoID
        this.setData({
            videoId: vid
        })
        this.videoContext = wx.createVideoContext(vid)

        //判断当前视频之前是否播放过

        let {
            videoUpdateTime
        } = this.data;
        let videoItem = videoUpdateTime.find(item => item.vid === vid);
        if (videoItem) {
            this.videoContext.seek(videoItem.currentTime)
        }
        this.videoContext.play()
        console.log(this.videoContext);

    },
    handleTimeUpdate(event) {
        //播放时长变化的监听
        let videoTimeObj = {
            vid: event.currentTarget.id,
            currentTime: event.detail.currentTime
        }

        let {
            videoUpdateTime
        } = this.data;

        //记录播放时间
        let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid)
        if (videoItem) {
            //说明已经有这个视频的记录，只需要更新即可
            videoItem.currentTime = event.detail.currentTime
        } else {
            videoUpdateTime.push(videoTimeObj)
        }

        this.setData({
            videoUpdateTime
        })

    },
    handleEnded(event) {
        //播放结束
        let {
            videoUpdateTime
        } = this.data;

        videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTimetarget.id), 1)
        this.setData({
            videoUpdateTime
        })
    },
    handleRefresher() {
        //下拉刷新
        //刷新视频列表数据

        this.setData({
            isTriggered: true
        })
        this.getVideoList(this.data.navId)



    },
    handleTolower() {
        //上拉加载


        //分页加载
        let newVideoList = [{
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_1B225CEFD6BFCF36F641BC938790866D",
                    "coverUrl": "https://p1.music.126.net/ztjiPwsdwWEwKBO1oq8otQ==/109951165352165967.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "Gesaffelstein - Viol (Original Mix)",
                    "description": "",
                    "commentCount": 261,
                    "shareCount": 1948,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 7740583
                        },
                        {
                            "resolution": 480,
                            "size": 11340260
                        },
                        {
                            "resolution": 720,
                            "size": 15261343
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 370000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/zEOQghNoUCB_H0PT5OJlAA==/109951165400265406.jpg",
                        "accountStatus": 0,
                        "gender": 1,
                        "city": 370200,
                        "birthday": 909411127187,
                        "userId": 322788029,
                        "userType": 200,
                        "nickname": "Esson-Q",
                        "signature": "电子音乐/先锋音乐单主&业余DJ，长期更新曲风/厂牌歌单及电子音乐现场视频。拒绝混圈伸手党，好音乐要去探索；拒绝电音鄙视链，包容所有的曲风。微博、公众号ID：网易同名；加群请私，欢迎交流🅣。\n⚠寻衅滋事者一律拉黑处理，愿大家能专注于音乐本身⚠",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951165400265400,
                        "backgroundImgId": 109951164865671000,
                        "backgroundUrl": "http://p1.music.126.net/2c92ySzqbr8B5szPPxGvHw==/109951164865671015.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": [
                            "电子"
                        ],
                        "experts": {
                            "1": "音乐视频达人",
                            "2": "音乐图文达人"
                        },
                        "djStatus": 0,
                        "vipType": 11,
                        "remarkName": null,
                        "avatarImgIdStr": "109951165400265406",
                        "backgroundImgIdStr": "109951164865671015"
                    },
                    "urlInfo": {
                        "id": "1B225CEFD6BFCF36F641BC938790866D",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/9jicUAap_2358652783_shd.mp4?ts=1631453007&rid=F522E52F17CF8C3C0F220FAF10E781E5&rl=3&rs=OHMUDAjQiodOjVLlybmsARcAZWOaaqAt&sign=0decf425d6b2d5a20d4db0ec37b8444d&ext=EvylHbS9apX9EEcVWJYh4FR9XK%2FTnT9NrrJW3uhMg5%2FecrzmHe6HJFcMvYtWD3Lrtpw67yNc5xL1TE2dupnwRmm0KdJ5nCZrBjKBXBiG%2FBdxdX5fk%2FTyzIKo8WCqR1f0ORCD1Zy8Rhz4iQK%2FcVt2bg4SJM8ID1l60Vy8xHKH1sTPDL1IL4Dp3YLdoGmXxdAQDK2K56lzcwkl0%2F8HLhxYF%2F%2FIsvxj2%2B%2BEV78Jt7o4%2BVM4FKOwLCJ5FXkNQ%2BvN%2FHMx",
                        "size": 15261343,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 720
                    },
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 57106,
                            "name": "欧美现场",
                            "alg": null
                        },
                        {
                            "id": 58104,
                            "name": "音乐节",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 9104,
                            "name": "电子",
                            "alg": null
                        },
                        {
                            "id": 4104,
                            "name": "电音",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                        "name": "Viol (Original Mix)",
                        "id": 18004020,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                            "id": 34337,
                            "name": "Gesaffelstein",
                            "tns": [],
                            "alias": []
                        }],
                        "alia": [],
                        "pop": 90,
                        "st": 0,
                        "rt": "",
                        "fee": 8,
                        "v": 11,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 1655526,
                            "name": "Conspiracy Pt.2",
                            "picUrl": "http://p4.music.126.net/KHjw5ldyElpWfjgQRhdqJw==/109951163532822411.jpg",
                            "tns": [],
                            "pic_str": "109951163532822411",
                            "pic": 109951163532822420
                        },
                        "dt": 343878,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 13758215,
                            "vd": 0
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 8254946,
                            "vd": 0
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 5503312,
                            "vd": 0
                        },
                        "a": null,
                        "cd": "1",
                        "no": 1,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 2,
                        "s_id": 0,
                        "mst": 9,
                        "cp": 743010,
                        "mv": 0,
                        "rtype": 0,
                        "rurl": null,
                        "publishTime": 1310918400000,
                        "privilege": {
                            "id": 18004020,
                            "fee": 8,
                            "payed": 1,
                            "st": 0,
                            "pl": 320000,
                            "dl": 320000,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 320000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 5,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "1B225CEFD6BFCF36F641BC938790866D",
                    "durationms": 135441,
                    "playTime": 236061,
                    "praisedCount": 2527,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_DB9F72BBA9E494A02204BA5EEBEB7561",
                    "coverUrl": "https://p1.music.126.net/dxxoG9SCrEtLxtkwElcRvA==/109951165017396195.jpg",
                    "height": 1080,
                    "width": 1920,
                    "title": "最近被沙雕搞笑网友疯狂点赞的《Jealousy》大火了",
                    "description": "",
                    "commentCount": 28,
                    "shareCount": 58,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 41173775
                        },
                        {
                            "resolution": 480,
                            "size": 72871087
                        },
                        {
                            "resolution": 720,
                            "size": 110585234
                        },
                        {
                            "resolution": 1080,
                            "size": 210489727
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 510000,
                        "authStatus": 1,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/Bol2Dm0VR9a9pgF8a100RQ==/109951164801198620.jpg",
                        "accountStatus": 0,
                        "gender": 1,
                        "city": 510100,
                        "birthday": 766618639605,
                        "userId": 410654889,
                        "userType": 204,
                        "nickname": "DEERMUSIC",
                        "signature": "保持乐观开心，爱音乐爱图片，喜欢的小伙伴随便撩❤️🎵🐰",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951164801198620,
                        "backgroundImgId": 109951165815156420,
                        "backgroundUrl": "http://p1.music.126.net/Qd-rQvcmtulqRTEfjWrPlg==/109951165815156417.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐原创视频达人"
                        },
                        "djStatus": 10,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951164801198620",
                        "backgroundImgIdStr": "109951165815156417"
                    },
                    "urlInfo": {
                        "id": "DB9F72BBA9E494A02204BA5EEBEB7561",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/q9H2LiQN_3008686807_uhd.mp4?ts=1631453007&rid=F522E52F17CF8C3C0F220FAF10E781E5&rl=3&rs=TiekgHzLonmyxZUiOELHdbUVNPevuXSb&sign=582527395eee74efe15a1a55059909fc&ext=EvylHbS9apX9EEcVWJYh4FR9XK%2FTnT9NrrJW3uhMg5%2FecrzmHe6HJFcMvYtWD3Lrtpw67yNc5xL1TE2dupnwRmm0KdJ5nCZrBjKBXBiG%2FBdxdX5fk%2FTyzIKo8WCqR1f0ORCD1Zy8Rhz4iQK%2FcVt2bg4SJM8ID1l60Vy8xHKH1sTPDL1IL4Dp3YLdoGmXxdAQDK2K56lzcwkl0%2F8HLhxYF%2F%2FIsvxj2%2B%2BEV78Jt7o4%2BVM4FKOwLCJ5FXkNQ%2BvN%2FHMx",
                        "size": 210489727,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 1080
                    },
                    "videoGroup": [{
                            "id": 1105,
                            "name": "最佳饭制",
                            "alg": null
                        },
                        {
                            "id": 9104,
                            "name": "电子",
                            "alg": null
                        },
                        {
                            "id": 4104,
                            "name": "电音",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 15241,
                            "name": "饭制",
                            "alg": null
                        },
                        {
                            "id": 23116,
                            "name": "音乐推荐",
                            "alg": null
                        },
                        {
                            "id": 15102,
                            "name": "华语音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                        "name": "Jealousy (Pop Version)",
                        "id": 1328428887,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                            "id": 57802,
                            "name": "French Kiss",
                            "tns": [],
                            "alias": []
                        }],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": "",
                        "fee": 8,
                        "v": 11,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 74591604,
                            "name": "Jealousy",
                            "picUrl": "http://p4.music.126.net/6xK_jrTwO0wzxwWNiiK7EQ==/109951165407938866.jpg",
                            "tns": [],
                            "pic_str": "109951165407938866",
                            "pic": 109951165407938860
                        },
                        "dt": 190026,
                        "h": {
                            "br": 320002,
                            "fid": 0,
                            "size": 7603766,
                            "vd": -20899
                        },
                        "m": {
                            "br": 192002,
                            "fid": 0,
                            "size": 4562277,
                            "vd": -18312
                        },
                        "l": {
                            "br": 128002,
                            "fid": 0,
                            "size": 3041533,
                            "vd": -16725
                        },
                        "a": null,
                        "cd": "01",
                        "no": 3,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "mst": 9,
                        "cp": 1416618,
                        "mv": 0,
                        "rtype": 0,
                        "rurl": null,
                        "publishTime": 1539273600000,
                        "tns": [
                            "嫉妒"
                        ],
                        "privilege": {
                            "id": 1328428887,
                            "fee": 8,
                            "payed": 1,
                            "st": 0,
                            "pl": 999000,
                            "dl": 999000,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 260,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "DB9F72BBA9E494A02204BA5EEBEB7561",
                    "durationms": 280183,
                    "playTime": 98757,
                    "praisedCount": 535,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_5F1B9CFCC442E3E3AFA9987A74A09983",
                    "coverUrl": "https://p2.music.126.net/GNAjpS5-e2ovM0O0pfkeKg==/109951165354208253.jpg",
                    "height": 360,
                    "width": 640,
                    "title": "没有人比XXXTENTACION的现场炸！Fucked Up！",
                    "description": null,
                    "commentCount": 406,
                    "shareCount": 1108,
                    "resolutions": [{
                        "resolution": 240,
                        "size": 8518678
                    }],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 310000,
                        "authStatus": 1,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/cNsuBA3Gk82kQOMjdiJTKg==/109951163303797870.jpg",
                        "accountStatus": 0,
                        "gender": 1,
                        "city": 310101,
                        "birthday": -1565251200000,
                        "userId": 344052772,
                        "userType": 4,
                        "nickname": "Geminiboyz",
                        "signature": "双胞胎。 B站：Geminiboyz / 微博：Gemini-Boyz",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951163303797870,
                        "backgroundImgId": 109951163470998780,
                        "backgroundUrl": "http://p1.music.126.net/qYEOfIALO3ThHhSVv0yFsA==/109951163470998781.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人"
                        },
                        "djStatus": 0,
                        "vipType": 11,
                        "remarkName": null,
                        "avatarImgIdStr": "109951163303797870",
                        "backgroundImgIdStr": "109951163470998781"
                    },
                    "urlInfo": {
                        "id": "5F1B9CFCC442E3E3AFA9987A74A09983",
                        "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/PoZTbUw8_3141058627_sd.mp4?ts=1631453007&rid=F522E52F17CF8C3C0F220FAF10E781E5&rl=3&rs=yFBvXvkTIhiShFwRUNRheMPckCaQUmhm&sign=418d178fcd4c7b776b786a32e9672577&ext=EvylHbS9apX9EEcVWJYh4FR9XK%2FTnT9NrrJW3uhMg5%2FecrzmHe6HJFcMvYtWD3Lrtpw67yNc5xL1TE2dupnwRmm0KdJ5nCZrBjKBXBiG%2FBdxdX5fk%2FTyzIKo8WCqR1f0ORCD1Zy8Rhz4iQK%2FcVt2bg4SJM8ID1l60Vy8xHKH1sTPDL1IL4Dp3YLdoGmXxdAQDK2K56lzcwkl0%2F8HLhxYF%2F%2FIsvxj2%2B%2BEV78Jt7o4%2BVM4FKOwLCJ5FXkNQ%2BvN%2FHMx",
                        "size": 8518678,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 240
                    },
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 57106,
                            "name": "欧美现场",
                            "alg": null
                        },
                        {
                            "id": 59108,
                            "name": "巡演现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 9104,
                            "name": "电子",
                            "alg": null
                        },
                        {
                            "id": 4104,
                            "name": "电音",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 13164,
                            "name": "快乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": [
                        109
                    ],
                    "relateSong": [{
                        "name": "Take A Step Back",
                        "id": 478269457,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                                "id": 12054421,
                                "name": "Ski Mask the Slump God",
                                "tns": [],
                                "alias": []
                            },
                            {
                                "id": 12107961,
                                "name": "XXXTENTACION",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 90,
                        "st": 0,
                        "rt": null,
                        "fee": 1,
                        "v": 10,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 35461555,
                            "name": "Take A Step Back",
                            "picUrl": "http://p3.music.126.net/Mjev7kkZx81PldTI8JwcKA==/18291475440220679.jpg",
                            "tns": [],
                            "pic_str": "18291475440220679",
                            "pic": 18291475440220680
                        },
                        "dt": 210416,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 8417742,
                            "vd": -3600
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 5050662,
                            "vd": -1000
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 3367123,
                            "vd": -2
                        },
                        "a": null,
                        "cd": "1",
                        "no": 1,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "mst": 9,
                        "cp": 7003,
                        "mv": 0,
                        "rtype": 0,
                        "rurl": null,
                        "publishTime": 1495123200007,
                        "privilege": {
                            "id": 478269457,
                            "fee": 1,
                            "payed": 1,
                            "st": 0,
                            "pl": 320000,
                            "dl": 320000,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 320000,
                            "fl": 0,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "5F1B9CFCC442E3E3AFA9987A74A09983",
                    "durationms": 37000,
                    "playTime": 1088714,
                    "praisedCount": 8824,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_7AEC43AC6C8DC62DEDE15AC7FCCE6ABB",
                    "coverUrl": "https://p2.music.126.net/qF31_OFVvRroXWBvzW4NUA==/109951163819116360.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "【吉他蒸汽波】 Cathy-So cute～嘉禾天橙国际大影院",
                    "description": "",
                    "commentCount": 475,
                    "shareCount": 398,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 1799494
                        },
                        {
                            "resolution": 480,
                            "size": 3195908
                        },
                        {
                            "resolution": 720,
                            "size": 5731022
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 110000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/-n07GKfOA_qYo1kTC12bWg==/109951163717459621.jpg",
                        "accountStatus": 0,
                        "gender": 1,
                        "city": 110101,
                        "birthday": 1019664000000,
                        "userId": 304701976,
                        "userType": 204,
                        "nickname": "Heathh_",
                        "signature": "heavenplease.",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951163717459620,
                        "backgroundImgId": 109951164090617260,
                        "backgroundUrl": "http://p1.music.126.net/iLW9G0Fdfq0uasVo2lhPUA==/109951164090617270.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐原创视频达人"
                        },
                        "djStatus": 10,
                        "vipType": 11,
                        "remarkName": null,
                        "avatarImgIdStr": "109951163717459621",
                        "backgroundImgIdStr": "109951164090617270"
                    },
                    "urlInfo": {
                        "id": "7AEC43AC6C8DC62DEDE15AC7FCCE6ABB",
                        "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/hrAIGas7_2280057119_shd.mp4?ts=1631453007&rid=F522E52F17CF8C3C0F220FAF10E781E5&rl=3&rs=jkfksSEgGudCzQmDxZHwqBbGzacTqRDJ&sign=a46027e4a4be861de6905e38b79482cf&ext=EvylHbS9apX9EEcVWJYh4FR9XK%2FTnT9NrrJW3uhMg5%2FecrzmHe6HJFcMvYtWD3Lrtpw67yNc5xL1TE2dupnwRmm0KdJ5nCZrBjKBXBiG%2FBdxdX5fk%2FTyzIKo8WCqR1f0ORCD1Zy8Rhz4iQK%2FcVt2bg4SJM8ID1l60Vy8xHKH1sTPDL1IL4Dp3YLdoGmXxdAQDK2K56lzcwkl0%2F8HLhxYF%2F%2FIsvxj2%2B%2BEV78Jt7o4%2BVM4FKOwLCJ5FXkNQ%2BvN%2FHMx",
                        "size": 5731022,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 720
                    },
                    "videoGroup": [{
                            "id": 9100,
                            "name": "指弹",
                            "alg": null
                        },
                        {
                            "id": 58111,
                            "name": "翻弹",
                            "alg": null
                        },
                        {
                            "id": 4103,
                            "name": "演奏",
                            "alg": null
                        },
                        {
                            "id": 9104,
                            "name": "电子",
                            "alg": null
                        },
                        {
                            "id": 4104,
                            "name": "电音",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 73104,
                            "name": "乐器",
                            "alg": null
                        },
                        {
                            "id": 16170,
                            "name": "吉他",
                            "alg": null
                        },
                        {
                            "id": 23116,
                            "name": "音乐推荐",
                            "alg": null
                        },
                        {
                            "id": 15102,
                            "name": "华语音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                            "name": "So Cute~",
                            "id": 433107530,
                            "pst": 0,
                            "t": 0,
                            "ar": [{
                                "id": 12027465,
                                "name": "Lopu$",
                                "tns": [],
                                "alias": []
                            }],
                            "alia": [],
                            "pop": 100,
                            "st": 0,
                            "rt": "",
                            "fee": 0,
                            "v": 15,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 34901157,
                                "name": "So Cute~（当山瞳-Cathy Lopurmx）",
                                "picUrl": "http://p4.music.126.net/yFCpD3GrgmcInAbVvVaFUg==/17999005346907556.jpg",
                                "tns": [],
                                "pic_str": "17999005346907556",
                                "pic": 17999005346907556
                            },
                            "dt": 184267,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 7372844,
                                "vd": 0
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 4423724,
                                "vd": 0
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 2949164,
                                "vd": 0
                            },
                            "a": null,
                            "cd": "1",
                            "no": 1,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 0,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 0,
                            "mv": 0,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 1475515536761,
                            "privilege": {
                                "id": 433107530,
                                "fee": 0,
                                "payed": 0,
                                "st": 0,
                                "pl": 320000,
                                "dl": 320000,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 320000,
                                "fl": 320000,
                                "toast": false,
                                "flag": 2,
                                "preSell": false
                            }
                        },
                        {
                            "name": "嘉 禾 天 橙 国 际 大 影 院",
                            "id": 441437222,
                            "pst": 0,
                            "t": 0,
                            "ar": [{
                                "id": 768266,
                                "name": "Galaxy Knight",
                                "tns": [],
                                "alias": []
                            }],
                            "alia": [],
                            "pop": 100,
                            "st": 0,
                            "rt": null,
                            "fee": 0,
                            "v": 23,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 34993762,
                                "name": "她 ，就 是 东 京",
                                "picUrl": "http://p4.music.126.net/M3ieCBkTn-bYYXvZLzcj-Q==/109951162809695511.jpg",
                                "tns": [],
                                "pic_str": "109951162809695511",
                                "pic": 109951162809695500
                            },
                            "dt": 107075,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 4285170,
                                "vd": -8400
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 2571120,
                                "vd": -5700
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 1714094,
                                "vd": -4000
                            },
                            "a": null,
                            "cd": "1",
                            "no": 3,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 2,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 0,
                            "mv": 0,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 1479225600000,
                            "privilege": {
                                "id": 441437222,
                                "fee": 0,
                                "payed": 0,
                                "st": 0,
                                "pl": 320000,
                                "dl": 320000,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 320000,
                                "fl": 320000,
                                "toast": false,
                                "flag": 258,
                                "preSell": false
                            }
                        },
                        {
                            "name": "告白♡",
                            "id": 511783974,
                            "pst": 0,
                            "t": 0,
                            "ar": [{
                                "id": 1043290,
                                "name": "传琦SAMA",
                                "tns": [],
                                "alias": []
                            }],
                            "alia": [],
                            "pop": 100,
                            "st": 0,
                            "rt": null,
                            "fee": 0,
                            "v": 38,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 36495325,
                                "name": "告白♡ （当山瞳 - Cathy 传琦SAMA bootleg）",
                                "picUrl": "http://p4.music.126.net/BvCneSmS4mKXYi2G5dvCcw==/109951163039313202.jpg",
                                "tns": [],
                                "pic_str": "109951163039313202",
                                "pic": 109951163039313200
                            },
                            "dt": 187614,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 7507636,
                                "vd": -13200
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 4504599,
                                "vd": -10700
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 3003080,
                                "vd": -9000
                            },
                            "a": null,
                            "cd": "01",
                            "no": 1,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 0,
                            "s_id": 0,
                            "mst": 9,
                            "cp": 0,
                            "mv": 0,
                            "rtype": 0,
                            "rurl": null,
                            "publishTime": 1507449471802,
                            "privilege": {
                                "id": 511783974,
                                "fee": 0,
                                "payed": 0,
                                "st": 0,
                                "pl": 999000,
                                "dl": 999000,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 999000,
                                "fl": 320000,
                                "toast": false,
                                "flag": 128,
                                "preSell": false
                            }
                        }
                    ],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "7AEC43AC6C8DC62DEDE15AC7FCCE6ABB",
                    "durationms": 30000,
                    "playTime": 366999,
                    "praisedCount": 2757,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_F9650068BC8B42F91E915CD8DB3F6ECE",
                    "coverUrl": "https://p2.music.126.net/BemMpHpSjyn_qwGswiCW2g==/109951164002543600.jpg",
                    "height": 1080,
                    "width": 1920,
                    "title": "终于找到火遍全网的“敲敲敲”， 搭配抽烟的硬汉，太嚣张",
                    "description": "终于找到火遍全网的“敲敲敲”， 搭配抽烟的硬汉，网友：太嚣张",
                    "commentCount": 487,
                    "shareCount": 799,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 15990154
                        },
                        {
                            "resolution": 480,
                            "size": 24536505
                        },
                        {
                            "resolution": 720,
                            "size": 33723494
                        },
                        {
                            "resolution": 1080,
                            "size": 54380622
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 210000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/nEkh8k3JFqK54dlHVUwrHA==/109951163910951928.jpg",
                        "accountStatus": 0,
                        "gender": 2,
                        "city": 210200,
                        "birthday": -2209017600000,
                        "userId": 1771079078,
                        "userType": 204,
                        "nickname": "下饭音乐music",
                        "signature": "邀请你来我的音乐party，抓取全球最in音乐给你",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951163910951940,
                        "backgroundImgId": 109951162868126480,
                        "backgroundUrl": "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "视频达人"
                        },
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951163910951928",
                        "backgroundImgIdStr": "109951162868126486"
                    },
                    "urlInfo": {
                        "id": "F9650068BC8B42F91E915CD8DB3F6ECE",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/Dx9rkIt9_2448853897_uhd.mp4?ts=1631453007&rid=F522E52F17CF8C3C0F220FAF10E781E5&rl=3&rs=cUMLKHGGmCWdrsNMtXBWWRFhEkkvXLql&sign=1635c5bdb8ecdbacb7d97dcd71ef8e05&ext=EvylHbS9apX9EEcVWJYh4FR9XK%2FTnT9NrrJW3uhMg5%2FecrzmHe6HJFcMvYtWD3Lrtpw67yNc5xL1TE2dupnwRmm0KdJ5nCZrBjKBXBiG%2FBdxdX5fk%2FTyzIKo8WCqR1f0ORCD1Zy8Rhz4iQK%2FcVt2bg4SJM8ID1l60Vy8xHKH1sTPDL1IL4Dp3YLdoGmXxdAQDK2K56lzcwkl0%2F8HLhxYF%2F%2FIsvxj2%2B%2BEV78Jt7o4%2BVM4FKOwLCJ5FXkNQ%2BvN%2FHMx",
                        "size": 54380622,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 1080
                    },
                    "videoGroup": [{
                            "id": 9104,
                            "name": "电子",
                            "alg": null
                        },
                        {
                            "id": 4104,
                            "name": "电音",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 14212,
                            "name": "欧美音乐",
                            "alg": null
                        },
                        {
                            "id": 25112,
                            "name": "音乐科普",
                            "alg": null
                        },
                        {
                            "id": 23116,
                            "name": "音乐推荐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "F9650068BC8B42F91E915CD8DB3F6ECE",
                    "durationms": 166997,
                    "playTime": 3494782,
                    "praisedCount": 11395,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_A24C8DF6283CD4356D86F92652989573",
                    "coverUrl": "https://p2.music.126.net/ixCc5NdWsaMnXBhi0ZENpg==/109951165050596015.jpg",
                    "height": 720,
                    "width": 1694,
                    "title": "2018 Destr0yer 作曲_削除(sakuzyo) 演唱_Nikki Simmons",
                    "description": "",
                    "commentCount": 88,
                    "shareCount": 76,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 16244790
                        },
                        {
                            "resolution": 480,
                            "size": 25628976
                        },
                        {
                            "resolution": 720,
                            "size": 30046804
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 420000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/oEuvgZJXIFHsa6rOgsJDfA==/109951165711524083.jpg",
                        "accountStatus": 0,
                        "gender": 2,
                        "city": 420100,
                        "birthday": 1018627200000,
                        "userId": 1617779867,
                        "userType": 0,
                        "nickname": "F-Forristsis_as_霜落",
                        "signature": "有点冷呢，来杯咖啡？",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951165711524080,
                        "backgroundImgId": 109951165711522620,
                        "backgroundUrl": "http://p1.music.126.net/dC5-99ELOWUNVUtPpY6Hzg==/109951165711522616.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": null,
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951165711524083",
                        "backgroundImgIdStr": "109951165711522616"
                    },
                    "urlInfo": {
                        "id": "A24C8DF6283CD4356D86F92652989573",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/wQ83dPLE_3025218398_shd.mp4?ts=1631453007&rid=F522E52F17CF8C3C0F220FAF10E781E5&rl=3&rs=FYQAceRKQWuSvbQprFxpNqUldvbffKyb&sign=ed9bcf31363aad630d67b81daa9d3b67&ext=EvylHbS9apX9EEcVWJYh4FR9XK%2FTnT9NrrJW3uhMg5%2FecrzmHe6HJFcMvYtWD3Lrtpw67yNc5xL1TE2dupnwRmm0KdJ5nCZrBjKBXBiG%2FBdxdX5fk%2FTyzIKo8WCqR1f0ORCD1Zy8Rhz4iQK%2FcVt2bg4SJM8ID1l60Vy8xHKH1sTPDL1IL4Dp3YLdoGmXxdAQDK2K56lzcwkl0%2F8HLhxYF%2F%2FIsvxj2%2B%2BEV78Jt7o4%2BVM4FKOwLCJ5FXkNQ%2BvN%2FHMx",
                        "size": 30046804,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 720
                    },
                    "videoGroup": [{
                            "id": 1105,
                            "name": "最佳饭制",
                            "alg": null
                        },
                        {
                            "id": 9104,
                            "name": "电子",
                            "alg": null
                        },
                        {
                            "id": 4104,
                            "name": "电音",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 14212,
                            "name": "欧美音乐",
                            "alg": null
                        },
                        {
                            "id": 15241,
                            "name": "饭制",
                            "alg": null
                        },
                        {
                            "id": 23116,
                            "name": "音乐推荐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                        "name": "Destr0yer",
                        "id": 1403449766,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                                "id": 12073277,
                                "name": "削除",
                                "tns": [],
                                "alias": []
                            },
                            {
                                "id": 29785818,
                                "name": "Nikki Simmons",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 90,
                        "st": 0,
                        "rt": "",
                        "fee": 0,
                        "v": 8,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 83327894,
                            "name": "Destr0yer",
                            "picUrl": "http://p4.music.126.net/3jE-6EXSL3wLp3hVURfCyw==/109951164487140323.jpg",
                            "tns": [],
                            "pic_str": "109951164487140323",
                            "pic": 109951164487140320
                        },
                        "dt": 180741,
                        "h": null,
                        "m": null,
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 2892321,
                            "vd": -64556
                        },
                        "a": null,
                        "cd": "01",
                        "no": 0,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 0,
                        "s_id": 0,
                        "mst": 9,
                        "cp": 0,
                        "mv": 14299953,
                        "rtype": 0,
                        "rurl": null,
                        "publishTime": 0,
                        "privilege": {
                            "id": 1403449766,
                            "fee": 0,
                            "payed": 0,
                            "st": 0,
                            "pl": 128000,
                            "dl": 128000,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 128000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 128,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "A24C8DF6283CD4356D86F92652989573",
                    "durationms": 183329,
                    "playTime": 58301,
                    "praisedCount": 1002,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_269C67812AB7C0EEBB0175325FB62E0C",
                    "coverUrl": "https://p2.music.126.net/hp52us4x_TSLdN9lVG9txQ==/109951163456223479.jpg",
                    "height": 540,
                    "width": 964,
                    "title": "【DJ舞曲】精选全中文Club车载Dj舞曲串烧",
                    "description": "精选全中文Club车载Dj舞曲串烧",
                    "commentCount": 47,
                    "shareCount": 311,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 115505015
                        },
                        {
                            "resolution": 480,
                            "size": 165076230
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 500000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/RKJge-FvEbpTiWVfCsVofw==/109951165868046580.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 500101,
                        "birthday": 1620230400000,
                        "userId": 3032903,
                        "userType": 0,
                        "nickname": "英子收藏",
                        "signature": "朋友真点耍久点！",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951165868046580,
                        "backgroundImgId": 109951164948712370,
                        "backgroundUrl": "http://p1.music.126.net/RhI3d7AHHhuI5UcM0MGH8g==/109951164948712364.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": null,
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951165868046580",
                        "backgroundImgIdStr": "109951164948712364"
                    },
                    "urlInfo": {
                        "id": "269C67812AB7C0EEBB0175325FB62E0C",
                        "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/EAnltVp7_153368786_hd.mp4?ts=1631453007&rid=F522E52F17CF8C3C0F220FAF10E781E5&rl=3&rs=HzMxNXoAZZiUhPqlVzTcWNtOBLGiyTbD&sign=8ac9556804ea39e22979875fee6e2585&ext=EvylHbS9apX9EEcVWJYh4FR9XK%2FTnT9NrrJW3uhMg5%2FecrzmHe6HJFcMvYtWD3Lrtpw67yNc5xL1TE2dupnwRmm0KdJ5nCZrBjKBXBiG%2FBdxdX5fk%2FTyzIKo8WCqR1f0ORCD1Zy8Rhz4iQK%2FcVt2bg4SJM8ID1l60Vy8xHKH1sTPDL1IL4Dp3YLdoGmXxdAQDK2K56lzcwkl0%2F8HLhxYF%2F%2FIsvxj2%2B%2BEV78Jt7o4%2BVM4FKOwLCJ5FXkNQ%2BvN%2FHMx",
                        "size": 165076230,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 480
                    },
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 9104,
                            "name": "电子",
                            "alg": null
                        },
                        {
                            "id": 4104,
                            "name": "电音",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 13164,
                            "name": "快乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": [
                        109
                    ],
                    "relateSong": [],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "269C67812AB7C0EEBB0175325FB62E0C",
                    "durationms": 966089,
                    "playTime": 202901,
                    "praisedCount": 890,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_5896985FF8255FA50F228D710D2E0F7F",
                    "coverUrl": "https://p1.music.126.net/pdMibETzabMhYXO2HhZJRA==/109951164951246630.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "非常震撼的一首电音《Fiery Sky》戴上耳机音量调最大",
                    "description": null,
                    "commentCount": 55,
                    "shareCount": 223,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 18002412
                        },
                        {
                            "resolution": 480,
                            "size": 29103301
                        },
                        {
                            "resolution": 720,
                            "size": 35475034
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 310000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/SDd3WVsWhna-4SR7WECv7g==/109951166315140237.jpg",
                        "accountStatus": 0,
                        "gender": 2,
                        "city": 310101,
                        "birthday": 855846988546,
                        "userId": 2000419989,
                        "userType": 0,
                        "nickname": "阿姨-1997",
                        "signature": "好音乐只愿和你分享～",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951166315140240,
                        "backgroundImgId": 109951166315143360,
                        "backgroundUrl": "http://p1.music.126.net/-fDtSIp3hGh9X9cu_Um_nA==/109951166315143365.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": null,
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951166315140237",
                        "backgroundImgIdStr": "109951166315143365"
                    },
                    "urlInfo": {
                        "id": "5896985FF8255FA50F228D710D2E0F7F",
                        "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/TaRy1vuZ_2986152734_shd.mp4?ts=1631453007&rid=F522E52F17CF8C3C0F220FAF10E781E5&rl=3&rs=CJtqjjajMwoyXgZJhVEObSwiumKUDArq&sign=5aa82acd28c85e5660b4450930921145&ext=EvylHbS9apX9EEcVWJYh4FR9XK%2FTnT9NrrJW3uhMg5%2FecrzmHe6HJFcMvYtWD3Lrtpw67yNc5xL1TE2dupnwRmm0KdJ5nCZrBjKBXBiG%2FBdxdX5fk%2FTyzIKo8WCqR1f0ORCD1Zy8Rhz4iQK%2FcVt2bg4SJM8ID1l60Vy8xHKH1sTPDL1IL4Dp3YLdoGmXxdAQDK2K56lzcwkl0%2F8HLhxYF%2F%2FIsvxj2%2B%2BEV78Jt7o4%2BVM4FKOwLCJ5FXkNQ%2BvN%2FHMx",
                        "size": 35475034,
                        "validityTime": 1200,
                        "needPay": false,
                        "payInfo": null,
                        "r": 720
                    },
                    "videoGroup": [{
                            "id": 1000,
                            "name": "MV",
                            "alg": null
                        },
                        {
                            "id": 9104,
                            "name": "电子",
                            "alg": null
                        },
                        {
                            "id": 4104,
                            "name": "电音",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 14212,
                            "name": "欧美音乐",
                            "alg": null
                        },
                        {
                            "id": 23116,
                            "name": "音乐推荐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                        "name": "Fiery Sky",
                        "id": 1325896666,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                            "id": 13042433,
                            "name": "Jarico",
                            "tns": [],
                            "alias": []
                        }],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": null,
                        "fee": 0,
                        "v": 3,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 74268209,
                            "name": "Fiery Sky",
                            "picUrl": "http://p3.music.126.net/YTgFICsNnx6pneo74KgkPg==/109951163683611891.jpg",
                            "tns": [],
                            "pic_str": "109951163683611891",
                            "pic": 109951163683611890
                        },
                        "dt": 213864,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 8556713,
                            "vd": -2
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 5134045,
                            "vd": -2
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 3422711,
                            "vd": -2
                        },
                        "a": null,
                        "cd": "1",
                        "no": 1,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 0,
                        "s_id": 0,
                        "mst": 9,
                        "cp": 0,
                        "mv": 0,
                        "rtype": 0,
                        "rurl": null,
                        "publishTime": 1542556800007,
                        "privilege": {
                            "id": 1325896666,
                            "fee": 0,
                            "payed": 0,
                            "st": 0,
                            "pl": 320000,
                            "dl": 320000,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 320000,
                            "fl": 320000,
                            "toast": false,
                            "flag": 128,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "5896985FF8255FA50F228D710D2E0F7F",
                    "durationms": 214205,
                    "playTime": 106056,
                    "praisedCount": 746,
                    "praised": false,
                    "subscribed": false
                }
            }
        ]

        let videoList = this.data.videoList
        videoList.push(...newVideoList)
        this.setData({
            videoList
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getvideoGroupListData()

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