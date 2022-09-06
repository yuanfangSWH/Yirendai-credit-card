<template>
	<view>
		<view class="title middle">请开始您的实名认证</view>
		<view class="real-mis middle">根据监管合规政策，请您务必填写本人真实身份信 息，并确认无误，否则将无法提现。此信息一旦确 认不可修改</view>
		<view class="real-zi middle">真实姓名</view>
		<view class="input-div middle"><input class="child-input" type="text" placeholder="请输入您的真实姓名" placeholder-style="color:#CDCDCD" /></view>
		<view class="real-zi middle">身份证号</view>
		<view class="input-div middle"><input class="child-input" type="text" placeholder="请输入您的身份证号" placeholder-style="color:#CDCDCD" /></view>
		<view class="login-button middle">提交认证</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
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
	color: #bbbbbb;
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
</style>
