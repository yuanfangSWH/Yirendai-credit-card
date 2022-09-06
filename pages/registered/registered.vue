<template>
	<view>
		<view class="op-img middle">
			<image mode="widthFix" src="../../static/images/zcrdqz.png" />
		</view>
		<view class="op-ann" @click="ljzc()">立即注册</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//判断跳转
				cip: '',
				//上级用户ID
				pid: ''
			}
		},
		//监听页面加载
		onLoad(option) {
			//获取判断依据
			this.cip = option.cip;
			if (this.cip == 200) {} else {
				//获取上级用户ID
				this.pid = option.pid;
				if (this.pid !== '' || this.pid != undefined) {
					//上级用户ID存入本地缓存
					uni.setStorageSync('pidData', this.pid);
				}
				var stateData = uni.getStorageSync('state');
				if (stateData == '') {
					this.pullData();
				} else if (stateData == 152) {
					this.ONONON_login('user/viphandshake');
				} else if (stateData == 153) {
					this.ONONON_login('user/viphandshake');
				}
			}
		},
		methods: {
			//握手接口
			pullData: function() {
				api.apiPost3('user/viphandshake', '', '', this.pid, 'get', (status, credentials, res) => {
					if (status) {

					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.ONONON_login('user/viphandshake');
						} else if (credentials == 156) {
							uni.showToast({
								title: '已注册',
								icon: 'none',
								duration: 2000
							});
							//跳转首页
							uni.switchTab({
								url: '/pages/index/index'
							});
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			//未登陆？ 我系内阿爸啊~
			ONONON_login: function(url) {
				//取到状态缓存
				var stateData = uni.getStorageSync('state');
				//取到当前url地址
				//#ifdef H5
				var urlData = encodeURIComponent(location.href);
				//#endif
				//#ifdef H5
				var urlData2 = location.href;
				//#endif
				if (stateData == 152) {
					//步骤1
					api.failureEx(url + '?url=' + urlData, (credentials, res) => {
						if (credentials == 153) {
							uni.setStorageSync('state', '153');
							//#ifdef H5
							location.assign(res.data.url);
							//#endif
						} else if (credentials == 156) {
							uni.showToast({
								title: '已注册',
								icon: 'none',
								duration: 2000
							});
							//跳转首页
							uni.switchTab({
								url: '/pages/index/index'
							});
						} else {
							uni.showToast({
								title: '未知错误，请退出后重试',
								icon: 'none',
								duration: 2000
							});
						}
					});
				} else if (stateData == 153) {
					// 从"?"处切割得到数组
					var info = urlData2.split('?');
					// 取到正确的值
					var group = info[info.length - 2];
					var code = group.split('&');
					var token = uni.getStorageSync('pidData');
					//步骤2
					api.failureEx(url + '?' + code[0] + '&token=' + token, (credentials, res) => {
						if (credentials == 154) {
							uni.setStorageSync('state', '');
							//跳转关注公众号页面
							uni.navigateTo({
								url: '/pages/public/public'
							});
						} else if (credentials == 156) {
							uni.showToast({
								title: '已注册',
								icon: 'none',
								duration: 2000
							});
							//跳转首页
							uni.switchTab({
								url: '/pages/index/index'
							});
						} else {
							uni.setStorageSync('state', '159');
						}
					});
				}
			},
			//立即注册
			ljzc: function() {
				if (this.cip == 200 || this.cip == '200') {
					uni.navigateTo({
						url: '/pages/become/become'
					});
				} else if (this.pid !== '' || this.pid != undefined) {
					uni.navigateTo({
						url: '/pages/registeredsr/registeredsr'
					});
				}
			}
		}
	}
</script>

<style>
	.op-img {
		width: 100%;
	}

	.op-img image {
		width: 100%;
		display: block;
		padding-bottom: 120upx;
	}

	.op-ann {
		width: 100%;
		height: 120upx;
		position: fixed;
		bottom: 0;
		font-size: 46upx;
		line-height: 120upx;
		text-align: center;
		color: #FFFFFF;
		background: linear-gradient(0deg, rgba(255, 97, 60, 1), rgba(255, 155, 66, 1));
	}
</style>
