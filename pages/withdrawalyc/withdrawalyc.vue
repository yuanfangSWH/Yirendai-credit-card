<template>
	<view>
		<view class="with-img middle"><image src="../../static/images/sbyc.png" /></view>
		<view class="with-bt">提现申请失败</view>
		<view class="with-mi">你的账户存在异常</view>
		<view class="with-yhk">
			<view class="at">储蓄卡</view>
			<view class="bt">{{card}}</view>
		</view>
		<view class="with-tx">
			<view class="at">提现金额</view>
			<view class="bt">¥{{money}}</view>
		</view>
		<view class="with-an middle" @click="determine()">确 认</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//银行卡
			card:'',
			//金额
			money:''
		};
	},
	//监听页面加载
	onLoad(option) {
		this.card = option.card;
		this.money = option.money;
	},
	methods: {
		determine:function(){
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style>
page {
	background-color: #f1f4f8;
}
.with-img {
	width: 142upx;
	height: 142upx;
	padding-top: 64upx;
	padding-bottom: 35upx;
}
.with-img image {
	width: 142upx;
	height: 142upx;
}
.with-bt {
	width: 100%;
	height: 40upx;
	font-size: 36upx;
	color: #000000;
	text-align: center;
}
.with-mi {
	width: 100%;
	height: 90upx;
	line-height: 90upx;
	font-size: 30upx;
	color: #A9AEB5;
	text-align: center;
	margin-bottom: 20upx;
}
.with-yhk {
	width: 100%;
	height: 94upx;
	line-height: 94upx;
	font-size: 32upx;
	background-color: #FFFFFF;
	display: flex;
	margin-bottom: 1px;
}
.with-tx {
	width: 100%;
	height: 94upx;
	line-height: 94upx;
	font-size: 32upx;
	background-color: #FFFFFF;
	display: flex;
}
.at{
	width: 160upx;
	height: 100%;
	color: #5F656F;
	margin-left: 60upx;
}
.bt{
	flex: 1;
	text-align: right;
	color: #5F656F;
	margin-right: 60upx;
}
.with-an {
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
