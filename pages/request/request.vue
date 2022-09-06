<template>
	<view>
		<view class="req-img">
			<image :src="cardData.img" />
		</view>
		<view class="req-div">
			<view class="req-an1" @click="RequestB()">更换申请人</view>
			<view class="req-an2" @click="RequestA()">本人申请</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//信用卡数据
				cardData: [],
				//标题
				titleData: '',
				//防重复提交
				submitData: true

			};
		},
		//监听页面加载
		onLoad(option) {
			if (option.title == '' || option.title == null) {
				//设置当前标题
				uni.setNavigationBarTitle({
					title: '申请信用卡'
				});
			} else {
				//设置当前标题
				uni.setNavigationBarTitle({
					title: option.title
				});
			}
			this.pullData(option.id);
		},
		methods: {
			//拉取数据
			pullData: function(id) {
				api.apiPost('bank/applyforcard?cid=' + id, '', '', 'get', (status, credentials, res) => {
					if (status) {
						//信用卡
						this.cardData = res.data;
					} else {
						if (credentials == 152) {
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
			//本人申请
			RequestA: function() {
				if (this.submitData) {
					var data = {
						cid: this.cardData.bank_card_id,
						bid: this.cardData.bank_id
					};
					var parameter = '?cid=' + this.cardData.bank_card_id + '&bid=' + this.cardData.bank_id;
					api.apiPost('bank/apply', parameter, data, 'post', (status, credentials, res) => {
						if (status) {
							this.submitData = true;
							//#ifdef H5
							window.location.assign(res.data.url);
							//#endif
						} else {
							if(credentials == 155){
								//跳转实名认证页面
								uni.reLaunch({
									url: '/pages/login/realb/realb'
								});
							}else
							if (credentials == 152) {
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
				}
			},
			//他人申请
			RequestB: function() {
				uni.navigateTo({
					url: '/pages/requesta/requesta?card=' + this.cardData.bank_card_id + '&id=' + this.cardData.bank_id
				});
			}
		}
	};
</script>

<style>
	.req-img {
		width: 100%;
		height: 100%;
		padding-bottom: 120upx;
	}

	.req-img image {
		width: 100%;
		height: 1600upx;
	}

	.req-div {
		width: 100%;
		height: 130upx;
		border-top: 1px #eeeeee solid;
		display: flex;
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;
	}

	.req-an1 {
		width: 320upx;
		height: 86upx;
		border: 1px solid rgba(0, 125, 255, 1);
		border-radius: 43upx;
		font-size: 36upx;
		color: #007dff;
		text-align: center;
		line-height: 86upx;
		margin-left: 30upx;
		margin-top: 23upx;
	}

	.req-an2 {
		width: 320upx;
		height: 86upx;
		background: rgba(0, 125, 255, 1);
		border: 1px solid rgba(0, 125, 255, 1);
		box-shadow: 0px 6px 14px 0px rgba(113, 194, 255, 1);
		border-radius: 43upx;
		font-size: 36upx;
		color: #ffffff;
		text-align: center;
		line-height: 86upx;
		margin-left: 50upx;
		margin-top: 23upx;
	}
</style>
