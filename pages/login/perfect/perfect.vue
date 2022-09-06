<template>
	<view>
		<view class="per-tg"><view class="tgan">跳过</view></view>
		<view class="title middle">完善个人信息</view>
		<view class="per-toux middle">
			<image class="tou-img" src="../../../static/images/mrtx.png" />
			<image class="tou-x" src="../../../static/images/jiadidi.png" />
		</view>
		<view class="input-div middle"><input class="child-input" type="text" placeholder="请输入用户名" placeholder-style="color:#CDCDCD" /></view>
		<view class="login-button middle">下一步</view>
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
	width: 182upx;
	height: 182upx;
	padding-top: 116upx;
	position: relative;
}
.per-toux .tou-img {
	width: 182upx;
	height: 182upx;
}
.per-toux .tou-x {
	width: 42upx;
	height: 42upx;
	position: absolute;
	bottom: 0;
	right: 10upx;
}
.input-div {
	margin-top: 54upx;
	width: 300upx;
	height: 115upx;
	border-bottom: 1px #dcdcdc solid;
}
.input-div .child-input {
	width: 300upx;
	height: 115upx;
	text-align: center;
	line-height: 115upx;
	font-size: 34upx;
	color: #bbbbbb;
}
.per-tg {
	width: 100%;
	height: 60upx;
	padding-top: 70upx;
	position: relative;
}
.per-tg .tgan {
	width: 72upx;
	height: 60upx;
	color: #257bff;
	font-size: 34upx;
	position: absolute;
	right: 60upx;
}
.title {
	width: 630upx;
	color: #343434;
	font-size: 48upx;
	padding-top: 40upx;
}
.login-button {
	width: 630upx;
	height: 90upx;
	background: #257bff;
	text-align: center;
	line-height: 90upx;
	font-size: 34upx;
	color: #ffffff;
	margin-top: 90upx;
	-moz-border-radius: 50upx;
	-webkit-border-radius: 50upx;
	border-radius: 50upx;
}
</style>
