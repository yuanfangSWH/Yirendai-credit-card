<template>
	<view>
		<view class="title middle">您已通过实名认证</view>
		<view class="jian middle">现在您可以开始使用代呗客</view>
		<view class="per-toux middle"><image class="tou-img" src="../../../static/images/tu.png" /></view>
		<view class="login-button middle">完成</view>
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
.per-toux {
	width: 284upx;
	height: 284upx;
	padding-top: 80upx;
	position: relative;
}
.per-toux .tou-img {
	width: 284upx;
	height: 284upx;
}
.title {
	width: 630upx;
	color: #343434;
	font-size: 48upx;
	padding-top: 120upx;
}
.jian {
	width: 630upx;
	height: 80upx;
	line-height: 80upx;
	font-size: 28upx;
	color: #c2c1c6;
}
.login-button {
	width: 630upx;
	height: 90upx;
	background: #257bff;
	text-align: center;
	line-height: 90upx;
	font-size: 34upx;
	color: #ffffff;
	margin-top: 100upx;
	-moz-border-radius: 50upx;
	-webkit-border-radius: 50upx;
	border-radius: 50upx;
}
</style>
