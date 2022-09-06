<template>
	<view>
		<view class="middle rewanr-bti1">
			<view class="jlt">奖励金额</view>
			<view class="qdjd">¥{{ instructions.bank_commission }}</view>
		</view>
		<view class="middle rewanr-bti2">
			<view class="jszq">结算周期</view>
			<view class="mis">
				<rich-text :nodes="instructions.bank_period"></rich-text>
			</view>
		</view>
		<view class="middle rewanr-bti3">
			<view class="jszq">结算规则</view>
			<view class="mis">
				<rich-text :nodes="instructions.bank_rule"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//说明数据
				instructions: []
			};
		},
		//监听页面加载
		onLoad(option) {
			this.pullData(option.id);
		},
		methods: {
			//拉取数据
			pullData: function(id) {
				api.apiPost('user/bankexplain?id=' + id, '', '', 'get', (status, credentials, res) => {
					if (status) {
						this.instructions = res.data;
					} else {
						if (credentials == 152) {
							//跳转首页
							uni.switchTab({
								url: '/pages/index/index'
							});
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			}
		}
	};
</script>

<style>
	/* body属性 */
	page {
		background-color: #f1f4f8;
	}

	.rewanr-bti1 {
		width: 690upx;
		height: 99upx;
		display: flex;
		background-color: #ffffff;
		margin-top: 30upx;
		margin-bottom: 10upx;
	}

	.jlt {
		width: 160upx;
		height: 99upx;
		font-size: 36upx;
		color: #1b1b1b;
		line-height: 99upx;
		font-weight: bold;
		margin-left: 30upx;
	}

	.qdjd {
		width: 150upx;
		height: 50upx;
		margin-top: 25upx;
		margin-left: 30upx;
		line-height: 50upx;
		background-color: #4b82f6;
		font-size: 30upx;
		color: #ffffff;
		text-align: center;
		-moz-border-radius: 30upx;
		-webkit-border-radius: 30upx;
		border-radius: 30upx;
	}

	.jszq {
		width: 100%;
		height: 99upx;
		font-size: 36upx;
		color: #1b1b1b;
		line-height: 99upx;
		font-weight: bold;
		margin-left: 30upx;
	}

	.mis {
		margin-left: 30upx;
		margin-right: 30upx;
		font-size: 28upx;
		color: #a2adc0;
		line-height: 42upx;
	}

	.rewanr-bti2 {
		width: 690upx;
		height: 199upx;
		background-color: #ffffff;
		margin-bottom: 10upx;
	}

	.rewanr-bti3 {
		width: 690upx;
		height: 828upx;
		background-color: #ffffff;
	}
</style>
