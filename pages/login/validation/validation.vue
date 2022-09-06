<template>
	<view>
		<view class="title middle">请输入验证码</view>
		<view class="jian middle">验证码已发送至 {{mobileXH}}</view>
		<view class="verification middle">
			<input
				class="move-ex"
				:class="{ moveda: disabled1, movedb: disabled2, movedc: disabled3, movedd: disabled4 }"
				type="number"
				maxlength="4"
				name="code"
				pattern="[0-9]*"
				v-model="mobilecaptcha"
				@input="moveDH"
				focus="focus"
			/>
			<view class="mlimbg" :class="{ mlimbgts: disabled1 }">{{ validation1 }}</view>
			<view class="mlimbg" :class="{ mlimbgts: disabled2 }">{{ validation2 }}</view>
			<view class="mlimbg" :class="{ mlimbgts: disabled3 }">{{ validation3 }}</view>
			<view class="mlimbg" :class="{ mlimbgts: disabled4 }">{{ validation4 }}</view>
		</view>
		<view class="daos middle">
			<view class="obtain" :class="{ n_border: isActive }" @click="takeGL()">{{ animation }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//手机号
			mobile: '',
			//手机号星号
			mobileXH: '',
			//验证码
			mobilecaptcha: '',
			//倒数
			yzmZJ: true,
			isActive: true,
			countdown: 60,
			//倒数动画
			animation: '免费获取验证码',
			//位置
			location: 0,
			//输入框假值
			validation1: '',
			validation2: '',
			validation3: '',
			validation4: '',
			//输入框移动
			disabled1: true,
			disabled2: false,
			disabled3: false,
			disabled4: false
		};
	},
	//监听页面加载
	onLoad(option) {
		this.mobile = option.mobile;
		//加星号
		var sjh = /^(\d{3})\d+(\d{4})$/;
		var ty = this.mobile;
		this.mobileXH = ty.replace(sjh, '$1****$2');
		//验证码倒数动画
		this.setTime();
	},
	methods: {
		//输入框动画
		moveDH: function(event) {
			var yzmID = event.target.value;
			var group = new Array();
			group = yzmID.split('');
			switch (group.length) {
				case 0:
					this.validation1 = '';
					this.disabled1 = true;
					this.disabled2 = false;
					this.disabled3 = false;
					this.disabled4 = false;
					break;
				case 1:
					this.validation1 = group[0];
					this.validation2 = '';
					this.disabled2 = true;
					this.disabled1 = false;
					this.disabled3 = false;
					this.disabled4 = false;

					break;
				case 2:
					this.validation1 = group[0];
					this.validation2 = group[1];
					this.validation3 = '';
					this.disabled3 = true;
					this.disabled1 = false;
					this.disabled2 = false;
					this.disabled4 = false;
					break;
				case 3:
					this.validation1 = group[0];
					this.validation2 = group[1];
					this.validation3 = group[2];
					this.validation4 = '';
					this.disabled4 = true;
					this.disabled1 = false;
					this.disabled2 = false;
					this.disabled3 = false;
					break;
				case 4:
					this.validation1 = group[0];
					this.validation2 = group[1];
					this.validation3 = group[2];
					this.validation4 = group[3];
					this.disabled4 = true;
					this.disabled1 = false;
					this.disabled2 = false;
					this.disabled3 = false;
					//this.login();
					break;
			}
		},
		//验证
		takeGL: function() {
			if (this.yzmZJ == true) {
				this.obtainYZ();
			}
		},
		//获取验证码
		obtainYZ: function() {
			//验证码倒数动画
			this.setTime();
			// var data = {
			// 	mobile: this.mobile
			// };
			// var parameter = '?mobile=' + this.mobile;
			// api.apiPost('/member/forgetstep1', parameter, data, 'post', (status, res) => {
			// 	if (status) {
			// 		//验证码倒数动画
			// 		this.setTime();
			// 		this.mobile = res.data.mobile;
			// uni.showToast({
			// 	title: '验证码重新发送成功',
			// 	icon: 'none',
			// 	duration: 2000
			// });
			// 	} else {
			// 		uni.showToast({
			// 			title: '获取验证码错误，请重试',
			// 			icon: 'none',
			// 			duration: 2000
			// 		});
			// 	}
			// });
		},
		//验证码倒数动画
		setTime: function() {
			let _this = this;
			if (this.countdown == 0) {
				this.countdown = 60;
				this.isActive = true;
				this.yzmZJ = true;
				this.animation = '免费获取验证码';
			} else {
				this.animation = '剩余' + this.countdown + '秒';
				this.countdown--;
				this.isActive = false;
				this.yzmZJ = false;
				setTimeout(function() {
					_this.setTime();
				}, 1000);
			}
		},
		//手机号登陆
		login: function() {
			if (this.mobilecaptcha.length > 4) {
				uni.showToast({
					title: '验证码格式错误',
					icon: 'none',
					duration: 2000
				});
			} else {
				var data = {
					mobile: this.mobile,
					mobilecaptcha: this.mobilecaptcha
				};
				var parameter = '?mobile=' + this.mobile + '&mobilecaptcha=' + this.mobilecaptcha;
				api.apiPost('/member/notelogin', parameter, data, 'post', (status, res) => {
					if (status) {
						//登录信息本地缓存储存
						uni.setStorageSync('landing', res.data);
						this.validation();
					} else {
						uni.showToast({
							title: '验证码不正确，请重试',
							icon: 'none',
							duration: 2000
						});
					}
				});
			}
		},
		//继续验证用户信息
		validation: function() {
			var value = uni.getStorageSync('landing');
			if (value.member_tj_id == '' || value.member_tj_id == 0) {
				//未填写邀请码
				uni.reLaunch({
					url: '/pages/registered/invitation/invitation'
				});
			} else if (value.member_password == '') {
				//未设置密码
				uni.reLaunch({
					url: '/pages/registered/setpassword/setpassword'
				});
			} else if (value.member_card == '') {
				//未实名认证
				uni.reLaunch({
					url: '/pages/registered/reality/reality'
				});
			} else {
				//跳转首页
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}
		}
	}
};
</script>

<style>
.title {
	width: 630upx;
	color: #343434;
	font-size: 62upx;
	padding-top: 334upx;
}
.jian {
	width: 630upx;
	height: 72upx;
	line-height: 72upx;
	font-size: 24upx;
	color: #b1b1b1;
}
.verification {
	width: 630upx;
	height: 115upx;
	line-height: 115upx;
	font-size: 36upx;
	color: #cbcbcb;
	display: flex;
}
.verification .mlimbg {
	width: 157upx;
	height: 80upx;
	border-bottom: 1px solid #dcdcdc;
	margin-right: 12upx;
	line-height: 36px;
	text-align: center;
	font-size: 22px;
	padding-bottom: 20upx;
	font-weight: 500;
	z-index: 20;
}
.verification .mlimbgts {
	border-bottom: 1px solid #4e94ff;
}
.verification .move-ex {
	width: 150upx;
	height: 80upx;
	border-bottom: 1px solid #4e94ff;
	margin-right: 12upx;
	line-height: 36px;
	text-align: center;
	font-size: 22px;
	padding-bottom: 20upx;
	font-weight: 500;
	z-index: 30;
	position: absolute;
	opacity: 0;
}
.daos {
	width: 630upx;
	margin-top: 50upx;
}
.obtain {
	width: 120upx;
	text-align: center;
	font-size: 24upx;
	color: #b4b6bd;
	padding: 10upx 10upx;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
}
.n_border {
	width: 200upx;
	border: 1px solid #dddddd;
}
</style>
