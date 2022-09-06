<template>
	<view>
		<view class="cg-img middle">
			<image src="../../static/images/cgbk.png" />
		</view>
		<view class="cg-wz">已解绑银行卡</view>
		<view class="cg-an middle" @click="complete()">完 成</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			complete: function() {
				uni.reLaunch({
					url: '/pages/withdrawal/withdrawal'
				});
			}
		}
	};
</script>

<style>
	.cg-img {
		width: 166upx;
		height: 166upx;
		padding-top: 70upx;
	}

	.cg-img image {
		width: 166upx;
		height: 166upx;
	}

	.cg-wz {
		width: 100%;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		color: #000000;
		font-size: 36upx;
	}

	.cg-an {
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
