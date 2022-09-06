<template>
	<view>
		<!-- 弹框 -->
		<view class="activity" v-if="activitynr">
			<view class="img1">
				<image src="../../../static/images/yaoq11.png" />
			</view>
			<view class="wzbt1">抱歉，该文章为精品内容，需邀请{{yaoqData}}位好友才可查看</view>
			<view class="wzbt2" @click="Become()">点击邀请好友</view>
		</view>
		<view class="zhezc" v-if="activitynr"></view>
		<!-- 弹框结束 -->
		<view class="biaot">
			{{articleData.article_title}}
		</view>
		<view class="tbd" v-if="!activitynr">
			<view class="fabsj">发布时间：{{articleData.created_at}}</view>
			<view class="liuzl">
				<image class="tljmz" src="../../../static/images/chaktb.png" />
				<view class="tljmwz">{{articleData.article_readingl}}</view>
			</view>
		</view>
		<view class="tinr">
			<rich-text :nodes="articleData.article_content"></rich-text>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				//数据
				articleData: [],
				//弹框显示
				activitynr: false,
				//需要邀请
				yaoqData: 0
			}
		},
		//监听页面加载
		onLoad(option) {
			this.pullData(option.id);
			this.SzhiFX(option.id);
		},
		methods: {
			//拉取数据
			pullData: function(id) {
				var data = {
					article_id: id
				};
				var parameter = "?article_id=" + id;
				api.apiPost('article/readarticle', parameter, data, 'post', (status, credentials, res) => {
					if (status) {
						//数据
						this.articleData = res.data;
						//设置当前标题
						uni.setNavigationBarTitle({
							title: this.articleData.article_title
						});
						setTimeout(function() {
							//隐藏加载框
							uni.hideLoading();
						}, 300);
					} else {
						if (credentials == 152) {
							//跳转首页
							uni.switchTab({
								url: '/pages/index/index'
							});
						}
						if (credentials == 515) {
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
							this.yaoqData = res.data.number;
							this.activitynr = true;
						} else {
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			//设置分享
			SzhiFX: function(id) {
				//分享代码开始
				// #ifdef H5  
				var jweixin = require('jweixin-module')
				// //获取当前URL
				// var url = location.href.split('#')[0];
				// url = encodeURIComponent(url);
				var data = {
					article_id: id
				};
				var parameter = "?article_id=" + id;
				api.apiPost('article/wzhare', parameter, data, 'post', (status, credentials, res) => {
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
			},
			//跳转海报
			Become: function() {
				uni.navigateTo({
					url: '/pages/promoteyh/promoteyh?id=0'
				});
			}
		}
	}
</script>

<style>
	/* 活动弹框 */
	.zhezc {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(33, 37, 41, 1);
		opacity: 0.9;
		z-index: 30;
	}

	.activity {
		width: 540upx;
		height: 510upx;
		position: fixed;
		top: 50%;
		margin-top: -255upx;
		left: 50%;
		margin-left: -270upx;
		z-index: 40;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.img1 {
		width: 200upx;
		height: 200upx;
		margin-left: auto;
		margin-right: auto;
		padding-top: 40upx;
		padding-bottom: 30upx;
	}

	.img1 image {
		width: 100%;
		height: 100%;
	}

	.wzbt1 {
		width: 460upx;
		height: 130upx;
		line-height: 50upx;
		font-size: 30upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		color: #A2ADC0;
	}

	.wzbt2 {
		width: 420upx;
		height: 60upx;
		line-height: 60upx;
		margin-left: auto;
		margin-right: auto;
		font-size: 32upx;
		color: #FFFFFF;
		text-align: center;
		background-color: #4f77ff;
		border-radius: 10upx;
	}

	/*  */
	.biaot {
		width: 670upx;
		/* 		height: 190upx; */

		line-height: 60upx;
		margin-left: auto;
		margin-right: auto;
		padding-top: 30upx;
		font-size: 40upx;
		font-weight: bold;
	}

	.tbd {
		width: 500upx;
		height: 50upx;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		font-size: 24upx;
		line-height: 50upx;
		color: #A2ADC0;
	}

	.fabsj {
		margin-right: 60upx;
	}

	.tinr {
		width: 670upx;
		margin-left: auto;
		margin-right: auto;
		padding-bottom: 80upx;
		padding-top: 10upx;
		font-size: 32upx;
	}

	.liuzl {
		display: flex;
	}

	.tljmz {
		width: 50upx;
		height: 50upx;
		display: block;
	}

	.tljmwz {
		flex: 1;
		height: 50upx;
	}
</style>
