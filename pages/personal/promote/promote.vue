<template>
	<view>
		<view class="prom-img middle"><image :src="imgData" /></view>
		<view class="prom-mi">长按图片可保存海报</view>
		<view class="prom-fz middle" :data-clipboard-text="urlData" @click="copy()">复制链接</view>
	</view>
</template>

<script>
import api from '../../../common/api/api.js';
//clipboard插件
import Clipboard from '../../../common/clipboard/clipboard.min.js';
export default {
	data() {
		return {
			//海报数据
			imgData:'',
			//链接
			urlData:''
		};
	},
	//监听页面加载
	onLoad() {
		uni.showLoading({
			title: '加载中'
		});
		var stateData = uni.getStorageSync('state');
		if (stateData == '') {
			this.pullData();
		} else {
			this.Special('user/vipqr');
		}
	},
	methods: {
		//获取海报数据
		pullData:function(){
			var partner = uni.getStorageSync('partner');
			if(partner==1){
				api.apiPost('user/vipqr', '', '', 'get', (status, credentials, res) => {
					if (status) {
						//海报
						this.imgData = res.data.img;
						//链接
						this.urlData = res.data.url;
						setTimeout(function() {
							//隐藏加载框
							uni.hideLoading();
						}, 300);
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', credentials);
							this.Special('user/vipqr');
						} else {
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
							uni.showToast({
								title: res.message,
								duration: 2000
							});
						}
					}
				});
			}else{
				uni.navigateTo({
					url: '/pages/registered/registered?cip=200'
				});
			}	
		},
		//复制链接
		copy:function(){
			//#ifdef APP-PLUS
			//设置系统剪切板内容 ----仅兼容APP/小程序
			uni.setClipboardData({
				data: this.urlData,
				success: function() {
					uni.showToast({
						title: '链接复制成功',
						icon: 'none',
						duration: 2000
					});
				},
				fail: function() {
					uni.showToast({
						title: '复制失败',
						icon: 'none',
						duration: 2000
					});
				}
			});
			//#endif
			
			//#ifdef H5
			//注意要使用let或者const，不能使用var，否则会出现复制次数叠加的问题，即复制不止一次。----仅兼容H5
						let clipboard = new Clipboard('.prom-fz');
						clipboard.on('success', function(e) {
							uni.showToast({
								title: '链接复制成功',
								icon:'none',
								duration: 2000
							});
						});
			
						clipboard.on('error', function(e) {
							uni.showToast({
								title: '复制失败',
								icon:'none',
								duration: 2000
							});
						});
			//#endif
		},
		//未登陆？ 我系内阿爸啊~
		Special: function(url) {
			api.ONONON_login(url, (status,res) => {
				if (status) {
					this.pullData();
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none',
						duration: 2000
					});
				}
			});
		}
	}
};
</script>

<style>
/* 	.prom-img {
		width: 100%;
	
	}
	
	.prom-img image {
		width: 100%;
		height: 1334upx;
	} */
.prom-img {
	width: 539upx;
	height: 958upx;
	padding-top: 34upx;
}
.prom-img image {
	width: 539upx;
	height: 958upx;
}
.prom-mi {
	width: 100%;
	height: 60upx;
	padding-top: 30upx;
	padding-bottom: 30upx;
	line-height: 60upx;
	font-size: 24upx;
	color: #7a8da5;
	text-align: center;
}
.prom-fz {
	width: 270upx;
	height: 64upx;
	background-color: #2682ff;
	box-shadow: 0px 6px 6px 0px rgba(201, 224, 255, 1);
	-moz-border-radius: 30upx;
	-webkit-border-radius: 30upx;
	border-radius: 30upx;
	text-align: center;
	line-height: 64upx;
	font-size: 28upx;
	color: #fefefe;
}
</style>
