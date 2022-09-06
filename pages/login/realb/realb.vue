<template>
	<view>
		<view class="title middle">请开始您的实名认证</view>
		<view class="real-mis middle">根据监管合规政策，请您务必填写本人真实身份信 息，并确认无误，否则将无法提现。此信息一旦确 认不可修改</view>
		<view class="real-zi middle">真实姓名</view>
		<view class="input-div middle"><input class="child-input" type="text" placeholder="请输入您的真实姓名" placeholder-style="color:#CDCDCD"
			 v-model="user" /></view>
		<view class="real-zi middle">身份证号</view>
		<view class="input-div middle"><input class="child-input" type="idcard" placeholder="请输入您的身份证号" placeholder-style="color:#CDCDCD"
			 v-model="idcard" /></view>
		<view class="real-zi middle">手机号</view>
		<view class="input-div middle"><input class="child-input" type="number" placeholder="请输入您的手机号" placeholder-style="color:#CDCDCD"
			 v-model="phone" /></view>
		<view class="real-zi middle">验证码</view>
		<view class="input-div middle" style="display: flex;">
			<input class="child-input teb-inpu" type="number" placeholder="请输入短信验证码" placeholder-style="color:#CDCDCD" v-model="verification" />
			<view class="input-hq" @click="takeGL()">{{ animation }}</view>
		</view>
		<view class="login-button middle" @click="validation()">提交认证</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				//姓名
				user: '',
				//身份证
				idcard: '',
				//手机号
				phone: '',
				//验证码
				verification: '',
				//倒数动画
				animation: '获取验证码',
				//倒数
				yzmZJ: true,
				countdown: 60,
				//防重复提交
				submitData: true,
				//验证正则表达式
				re: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
				reg: /^[\u4E00-\u9FA5]{2,4}$/
			};
		},
		//监听页面加载
		onLoad() {
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
			} else {
				this.Special('user/authuser');
			}
		},
		methods: {
			//验证
			validation: function() {
				if (this.submitData) {
					if (this.user == '') {
						uni.showToast({
							title: '姓名不能为空',
							icon: 'none',
							duration: 2000
						});
					} else if (!this.reg.test(this.user)) {
						uni.showToast({
							title: '姓名格式错误',
							icon: 'none',
							duration: 2000
						});
					} else if (this.idcard == '') {
						uni.showToast({
							title: '身份证不能为空',
							icon: 'none',
							duration: 2000
						});
					} else if (!this.re.test(this.idcard)) {
						uni.showToast({
							title: '身份证格式错误',
							icon: 'none',
							duration: 2000
						});
					} else if (this.phone == '') {
						uni.showToast({
							title: '手机号不能为空',
							icon: 'none',
							duration: 2000
						});
					} else if (this.verification == '') {
						uni.showToast({
							title: '短信验证码不能为空',
							icon: 'none',
							duration: 2000
						});
					} else {
						this.submitData = false;
						this.Submit();
					}
				}
			},
			//实名认证
			Submit: function() {
				var data = {
					user: this.user,
					idcard: this.idcard,
					phone: this.phone,
					authcode:this.verification
				};
				var parameter = '?user=' + this.user + '&idcard=' + this.idcard + '&phone=' + this.phone;
				api.apiPost('user/authuser', parameter, data, 'post', (status, credentials, res) => {
					if (status) {
						uni.showToast({
							title: '实名认证成功',
							icon: 'none',
							duration: 2000
						});
						uni.switchTab({
							url: '/pages/index/index'
						});
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('user/authuser');
						} else {
							this.submitData = true;
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
			//验证码方法
			takeGL: function() {
				if (this.yzmZJ) {
					if (this.user == '') {
						uni.showToast({
							title: '姓名不能为空',
							icon: 'none',
							duration: 2000
						});
					} else if (!this.reg.test(this.user)) {
						uni.showToast({
							title: '姓名格式错误',
							icon: 'none',
							duration: 2000
						});
					} else if (this.idcard == '') {
						uni.showToast({
							title: '身份证不能为空',
							icon: 'none',
							duration: 2000
						});
					} else if (!this.re.test(this.idcard)) {
						uni.showToast({
							title: '身份证格式错误',
							icon: 'none',
							duration: 2000
						});
					} else if (this.phone == '') {
						uni.showToast({
							title: '手机号不能为空',
							icon: 'none',
							duration: 2000
						});
					} else {
						this.obtainYZ();
					}
				}
			},
			//获取验证码
			obtainYZ: function() {
				var data = {
					phone: this.phone
				};
				var parameter = '?phone=' + this.phone;
				api.apiPost('user/vipsendsms', parameter, data, 'post', (status, credentials, res) => {
					if (status) {
						//验证码倒数动画
						this.setTime();
						this.phone = res.data.phone;
						uni.showToast({
							title: '验证码发送成功',
							icon: 'none',
							duration: 2000
						});
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//验证码倒数动画
			setTime: function() {
				let _this = this;
				if (this.countdown == 0) {
					this.countdown = 60;
					this.yzmZJ = true;
					this.animation = '获取验证码';
				} else {
					this.animation = this.countdown + '秒';
					this.countdown--;
					this.yzmZJ = false;
					setTimeout(function() {
						_this.setTime();
					}, 1000);
				}
			}
		}
	};
</script>

<style>
	.real-zi {
		width: 630upx;
		height: 30upx;
		color: #000000;
		font-size: 28upx;
		line-height: 30upx;
	}

	.real-mis {
		width: 630upx;
		color: #c2c1c6;
		font-size: 28upx;
		padding-top: 37upx;
		padding-bottom: 90upx;
	}

	.title {
		width: 630upx;
		color: #343434;
		font-size: 48upx;
		padding-top: 120upx;
	}

	.input-div {
		margin-bottom: 40upx;
		width: 630upx;
		height: 115upx;
		border-bottom: 1px #dcdcdc solid;
	}

	.input-div .child-input {
		width: 630upx;
		height: 115upx;
		line-height: 115upx;
		font-size: 34upx;
	}

	.login-button {
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

	.input-hq {
		width: 240upx;
		height: 68upx;
		background: #257bff;
		color: #ffffff;
		font-size: 26upx;
		line-height: 68upx;
		text-align: center;
		-moz-border-radius: 40upx;
		-webkit-border-radius: 40upx;
		border-radius: 40upx;
		margin-top: 20upx;
	}

	.input-div .teb-inpu {
		width: 430upx;

	}
</style>
