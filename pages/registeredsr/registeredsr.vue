<template>
	<view class="placeholder">
		<view class="b-bt middle">姓名</view>
		<view class="b-input middle"><input class="child-input" type="text" placeholder="请输入本人真实姓名" placeholder-style="color:#CDCDCD"
			 v-model="invitation.user" /></view>
		<view class="b-bt middle">身份证号</view>
		<view class="b-input middle"><input class="child-input" type="idcard" placeholder="请输入本人真实身份证号" placeholder-style="color:#CDCDCD"
			 v-model="invitation.idcard" /></view>
		<view class="b-bt middle">微信号</view>
		<view class="b-input middle"><input class="child-input" type="text" placeholder="请输入本人微信号" placeholder-style="color:#CDCDCD"
			 v-model="WechatData" /></view>
		<view class="b-bt middle">手机号</view>
		<view class="b-input middle"><input class="child-input" type="number" placeholder="请输入本人手机号" placeholder-style="color:#CDCDCD"
			 v-model="invitation.phone" /></view>
		<view class="b-bt middle">手机验证码</view>
		<view class="b-input middle"><input class="child-input tbld" type="number" placeholder="请输入验证码" placeholder-style="color:#CDCDCD"
			 v-model="verification" />
			<view class="input-hq" @click="takeGL()">{{ animation }}</view>
		</view>
		<view class="b-tebdms middle">个人信息将影响审核及收入提现，请确保信息真实有效</view>
		<view class="b-gj middle">
			<radio style="transform:scale(0.7)" :checked="agreement" @click="switchKG()" />我同意<text>《用户注册协议》</text></view>
		<view class="b-an middle" @click="validation()">提 交</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				invitation: {
					//姓名
					user: '',
					//身份证
					idcard: '',
					//手机号
					phone: ''
				},
				//微信
				WechatData: '',
				//验证码
				verification: '',
				//是否同意协议
				agreement: false,
				//倒数动画
				animation: '获取验证码',
				//倒数
				yzmZJ: true,
				countdown: 60,
				//防重复提交
				submitData: true
			}
		},
		onLoad(option) {
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
				this.pullData();
			} else {
				this.ONONON_login('user/viphandshake');
			}
		},
		methods: {
			//验证
			validation: function() {
				if (this.agreement) {
					if (this.submitData) {
						if (this.invitation.user == '') {
							uni.showToast({
								title: '姓名不能为空',
								icon: 'none',
								duration: 2000
							});
						} else if (this.invitation.idcard == '') {
							uni.showToast({
								title: '身份证不能为空',
								icon: 'none',
								duration: 2000
							});
						} else if (this.invitation.phone == '') {
							uni.showToast({
								title: '手机号不能为空',
								icon: 'none',
								duration: 2000
							});
						} else if (this.WechatData == '') {
							uni.showToast({
								title: '微信号不能为空',
								icon: 'none',
								duration: 2000
							});
						} else if (this.verification == '') {
							uni.showToast({
								title: '验证码不能为空',
								icon: 'none',
								duration: 2000
							});
						} else {
							this.submitData = false;
							this.TJinvitation();
						}
					}
				} else {
					uni.showToast({
						title: '是/否同意协议内容',
						icon: 'none',
						duration: 2000
					});
				}
			},
			//提交申请
			TJinvitation: function() {
				var pid = uni.getStorageSync('pidData');
				var data = {
					token: pid,
					name: this.invitation.user,
					idcard: this.invitation.idcard,
					wx: this.WechatData,
					mobile: this.invitation.phone,
					authcode: this.verification
				};
				var parameter =
					'?token=' +
					pid +
					'&name=' +
					this.invitation.user +
					'&idcard=' +
					this.invitation.idcard +
					'&wx=' +
					this.WechatData +
					'&mobile=' +
					this.invitation.phone +
					'&authcode=' +
					this.verification;
				api.apiPost('user/vipregister', parameter, data, 'post', (status, credentials, res) => {
					if (status) {
						//清空上级用户ID缓存
						uni.getStorageSync('pidData', '');
						//跳转注册成功页面
						uni.redirectTo({
							url: '/pages/registeredcg/registeredcg'
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
			},
			//验证码方法
			takeGL: function() {
				if (this.yzmZJ) {
					if (this.invitation.user == '') {
						uni.showToast({
							title: '姓名不能为空',
							icon: 'none',
							duration: 2000
						});
					} else if (this.invitation.idcard == '') {
						uni.showToast({
							title: '身份证不能为空',
							icon: 'none',
							duration: 2000
						});
					} else if (this.invitation.phone == '') {
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
					phone: this.invitation.phone
				};
				var parameter = '?phone=' + this.invitation.phone;
				api.apiPost('user/vipsendsms', parameter, data, 'post', (status, credentials, res) => {
					if (status) {
						//验证码倒数动画
						this.setTime();
						this.invitation.phone = res.data.phone;
						uni.showToast({
							title: '验证码发送成功',
							icon: 'none',
							duration: 2000
						});
					} else {
						uni.showToast({
							title: res.data.message,
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
			},
			//同意是/否
			switchKG: function() {
				if (this.agreement) {
					this.agreement = false;
				} else {
					this.agreement = true;
				}
			}
		}
	}
</script>

<style>
	.b-tebdms {
		width: 630upx;
		font-size: 18upx;
		color: #B1B1B1;
		padding-top: 20upx;
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
		margin-top: 16upx;
	}

	.b-bt {
		width: 630upx;
		font-size: 30upx;
		color: #474E58;
		padding-top: 40upx;
		padding-bottom: 10upx;
	}

	.b-input {
		width: 630upx;
		height: 100upx;
		border-bottom: 1px #dcdcdc solid;
		display: flex;
	}

	.child-input {
		width: 500upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		color: #182130;
	}

	.child-input::-webkit-input-placeholder {
		coloc: #CDCDCD;
	}

	.b-gj {
		width: 630upx;
		font-size: 26upx;
		color: #B1B1B1;
		margin-top: 30upx;
		margin-bottom: 20px;
	}

	.b-gj text {
		color: #257BFF;
	}

	.b-an {
		width: 630upx;
		height: 87upx;
		background: rgba(37, 123, 255, 1);
		border-radius: 44upx;
		line-height: 87upx;
		font-size: 34upx;
		color: #FFFFFF;
		text-align: center;
	}

	.tbld {
		flex: 1;
		margin-right: 10upx;
	}
</style>
