<template>
	<view>
		<view class="confi-zi">
			<view class="at">银行卡号</view>
			<view class="bt">{{ yhkCard }}</view>
		</view>
		<view class="confi-zi">
			<view class="at">手机号</view>
			<view class="bt">{{ userData.phone }}</view>
		</view>
		<view class="confi-zi">
			<view class="at">身份证</view>
			<view class="bt">{{ userData.user_id_card }}</view>
		</view>
		<view class="confi-zi">
			<view class="at">姓名</view>
			<view class="bt">{{ userData.name }}</view>
		</view>
		<view class="confi-an middle" @click="Successfulcard()">确认绑卡</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//身份数据
				userData: [],
				//银行卡号
				yhkCard: '',
				//防重复提交
				submitData: true
			};
		},
		//监听页面加载
		onLoad(option) {
			this.yhkCard = option.card;
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
				this.pullData();
			} else {
				this.Special('user/addcard');
			}
		},
		methods: {
			//获取数据
			pullData: function() {
				api.apiPost('user/addcard', '', '', 'get', (status, credentials, res) => {
					if (status) {
						//身份数据
						this.userData = res.data;
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('user/addcard');
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
			Special: function(url) {
				api.ONONON_login(url, (status, res) => {
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
			},
			//确认绑卡
			Successfulcard: function() {
				if (this.submitData) {
					var reg = /^(\d{16}|\d{19})$/;
					if (this.yhkCard == '') {
						uni.showToast({
							title: '请填写银行卡号',
							icon: 'none',
							duration: 2000
						});
					} else if (!reg.test(this.yhkCard)) {
						uni.showToast({
							title: '银行卡格式错误',
							icon: 'none',
							duration: 2000
						});
					} else {
						this.submitData = false;
						var data = {
							card: this.yhkCard
						};
						var parameter = '?card=' + this.yhkCard;
						api.apiPost('user/bindcard', parameter, data, 'post', (status, credentials, res) => {
							if (status) {
								uni.reLaunch({
									url: '/pages/successfulcard/successfulcard'
								});
							} else {
								this.submitData = true;
								uni.showToast({
									title: res.message,
									icon: 'none',
									duration: 2000
								});
							}
						});
					}
				}
			}
		}
	};
</script>

<style>
	page {
		background-color: #f1f4f8;
	}

	.confi-zi {
		width: 100%;
		height: 94upx;
		margin-top: 32upx;
		background-color: #ffffff;
		line-height: 94upx;
		font-size: 32upx;
		color: #000000;
		display: flex;
	}

	.confi-zi .at {
		width: 160upx;
		height: 100%;
		margin-left: 60upx;
	}

	.confi-zi .bt {
		flex: 1;
	}

	.confi-an {
		width: 630upx;
		height: 90upx;
		background: #257bff;
		text-align: center;
		line-height: 90upx;
		font-size: 34upx;
		color: #ffffff;
		margin-top: 80upx;
		-moz-border-radius: 50upx;
		-webkit-border-radius: 50upx;
		border-radius: 50upx;
	}
</style>
