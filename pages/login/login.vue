<template>
	<view>
		<view class="title middle">欢迎登录信用卡超市</view>
		<view class="input-div middle"><input class="child-input" type="text" placeholder="请输入手机号" placeholder-style="color:#CDCDCD" /></view>
		<view class="jian middle">未注册的手机号验证后自动创建账户</view>
		<view class="login-button middle" @click="validation()">获取验证码</view>
		<view class="bottom-gj">
			注册即同意
			<text @click="zcxy()">《用户注册协议》</text>
			和
			<text @click="sygf()">《软件使用规范》</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//手机号
			mobile: '13481914993'
		};
	},
	methods: {
		validation: function() {
			var re = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
			if (this.mobile == '') {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none',
					duration: 2000
				});
			} else if (!re.test(this.mobile)) {
				uni.showToast({
					title: '请输入正确的手机号码',
					icon: 'none',
					duration: 2000
				});
			} else {
				uni.navigateTo({
					url: '/pages/login/validation/validation?mobile=' + this.mobile
				});
			}
		},
		//用户注册协议
		zcxy: function() {
			uni.navigateTo({
				url: '/pages/login/agreement/agreement'
			});
		},
		//软件使用规范
		sygf: function() {
			uni.navigateTo({
				url: '/pages/login/stipulate/stipulate'
			});
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
.input-div {
	margin-top: 54upx;
	width: 630upx;
	height: 115upx;
	border-bottom: 1px #dcdcdc solid;
}
.input-div .child-input {
	width: 630upx;
	height: 115upx;
	line-height: 115upx;
	font-size: 36upx;
	color: #cbcbcb;
}
.jian {
	width: 630upx;
	height: 72upx;
	line-height: 72upx;
	font-size: 24upx;
	color: #b1b1b1;
}
.login-button {
	width: 630upx;
	height: 90upx;
	background: #257bff;
	text-align: center;
	line-height: 90upx;
	font-size: 34upx;
	color: #ffffff;
	margin-top: 60upx;
	-moz-border-radius: 50upx;
	-webkit-border-radius: 50upx;
	border-radius: 50upx;
}
.bottom-gj {
	width: 100%;
	height: 32upx;
	text-align: center;
	line-height: 32upx;
	font-size: 26upx;
	color: #b1b1b1;
	position: absolute;
	bottom: 30upx;
}
.bottom-gj text {
	color: #257bff;
}
</style>
