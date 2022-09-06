<template>
	<view>
		<view class="answer-title">
			<view class="answer-imag"><image src="../../static/images/mrtx.png" /></view>
			<view class="answer-zi">浦发银行</view>
		</view>
		<view class="answer-bt">
			<view class="answer-yu">···</view>
			<view>暂未收到您的申请信息</view>
		</view>
		<view class="answer-div middle">
			<view class="answer-wz">说 明</view>
			<view class="answer-mi">请确认您已完善填写申请资料并成功 提交。银行录入系统和反馈会有一定 时间滞后, 般会再3~10个工作日完成 审批。请耐心等候。</view>
		</view>
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
.answer-div {
	width: 670upx;
	display: flex;
}
.answer-wz {
	width: 90upx;
	height: 150upx;
	margin-right: 50upx;
	color: #adb4be;
	font-size: 30upx;
}
.answer-mi {
	flex: 1;
	color: #6c727c;
	line-height: 40upx;
	font-size: 30upx;
}
.answer-bt {
	width: 100%;
	height: 170upx;
	color: #ff9023;
	line-height: 170upx;
	font-size: 42upx;
	display: flex;
}
.answer-yu {
	width: 42upx;
	height: 42upx;
	background: linear-gradient(90deg, rgba(234, 145, 53, 1), rgba(243, 187, 64, 1));
	text-align: center;
	color: #ffffff;
	line-height: 42upx;
	font-size: 40upx;
	-moz-border-radius: 50upx;
	-webkit-border-radius: 50upx;
	border-radius: 50upx;
	margin-left: 42upx;
	margin-top: 66upx;
	margin-right: 26upx;
}
.answer-title {
	width: 100%;
	height: 169upx;
	background-color: #2c7fff;
	display: flex;
}
.answer-imag {
	width: 91upx;
	height: 90upx;
	padding-top: 40upx;
	padding-left: 220upx;
}
.answer-imag image {
	width: 91upx;
	height: 90upx;
}
.answer-zi {
	flex: 1;
	height: 90upx;
	padding-top: 40upx;
	padding-left: 20upx;
	line-height: 90upx;
	font-size: 44upx;
	font-weight: bold;
	color: #ffffff;
}
</style>
