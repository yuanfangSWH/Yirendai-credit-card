<template>
	<view>
		<view class="sear-div">
			<view class="sear-shous">
				<view class="sear-tub"><image src="../../../static/images/shoutb.png" /></view>
				<view class="sear-in"><input class="child-input" type="text" placeholder="输入用户手机号或银行号" placeholder-style="color:#CDCDCD" /></view>
			</view>
			<view class="sear-an">搜索</view>
		</view>
		<!-- <view class="sear-bt middle">热门搜索</view>
		<view class="sear-rem middle">
			<view class="sear-mk">交通银行</view>
			<view class="sear-mk">交通银行</view>
			<view class="sear-mk">交通银行</view>
			<view class="sear-mk">交通银行</view>
			<view class="sear-mk">交通银行</view>
		</view> -->
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
.sear-div {
	width: 100%;
	height: 133upx;
	display: flex;
	background: rgba(255, 255, 255, 1);
	border: 1px solid rgba(231, 238, 248, 1);
	box-shadow: 0px 4px 17px 3px rgba(239, 246, 255, 1);
}
.sear-shous {
	width: 557upx;
	height: 66upx;
	background: rgba(255, 255, 255, 1);
	border: 1px solid rgba(200, 212, 229, 1);
	border-radius: 33upx;
	margin-top: 30upx;
	margin-left: 40upx;
	display: flex;
}
.sear-tub {
	width: 30upx;
	height: 30upx;
	padding-top: 8upx;
	padding-left: 20upx;
	margin-right: 20upx;
}
.sear-tub image {
	width: 30upx;
	height: 30upx;
}
.sear-in {
	flex: 1;
	height: 56upx;
	margin-top: 8upx;
}
.child-input {
	width: 100%;
	height: 56upx;
	line-height: 56upx;
	font-size: 26upx;
}
.sear-an {
	flex: 1;
	height: 133upx;
	line-height: 133upx;
	text-align: center;
	font-size: 30upx;
	color: #7e8691;
}
.sear-bt {
	width: 680upx;
	height: 145upx;
	line-height: 145upx;
	font-size: 30upx;
	color: #67707e;
}
.sear-rem {
	width: 680upx;
	display: flex;
	flex-wrap: wrap;
}
.sear-mk {
	width: 180upx;
	height: 80upx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 2px 15px 1px rgba(239, 246, 255, 1);
	border-radius: 6upx;
	line-height: 80upx;
	text-align: center;
	font-size: 30upx;
	color: #414953;
	margin-left: 20upx;
	margin-right: 20upx;
	margin-bottom: 30upx;
}
</style>
