import Vue from 'vue'
import App from './App'
import api from './common/api/api.js';

//分享代码开始
// #ifdef H5  
var jweixin = require('jweixin-module')
//获取当前URL
var url = location.href.split('#')[0];
url = encodeURIComponent(url);
//获取当前域名
//var urlData = location.href.split('/')[2];
//urlData = "http://"+urlData
//请求接口域名
//api.DomainName(urlData); 
api.apiPost('user/wxshare?url='+url, '', '', 'get', (status, credentials, res) => {
	if (status) {
		jweixin.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
			appId: res.data.config.appId, // 必填，公众号的唯一标识  
			timestamp: res.data.config.timestamp, // 必填，生成签名的时间戳  
			nonceStr: res.data.config.nonceStr, // 必填，生成签名的随机串  
			signature: res.data.config.signature, // 必填，签名，见附录1  
			jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表          
		});
		jweixin.ready(function() {
			//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
			jweixin.updateAppMessageShareData({
				title: res.data.title, // 分享标题  
				desc: res.data.desc, // 分享描述  
				link: res.data.url, // 分享链接  
				imgUrl: res.data.logo, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				}
			});
			//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
			jweixin.updateTimelineShareData({
				title: res.data.title, // 分享标题
				link: res.data.url, // 分享链接  
				imgUrl: res.data.logo, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数  
				}
			});

		});
	} else {
		uni.showToast({
			title: res.message,
			icon: 'none',
			duration: 2000
		});
	}
});
// #endif  
//分享代码结束


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
