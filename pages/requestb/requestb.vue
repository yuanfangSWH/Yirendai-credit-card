<template>
	<view>
		<view class="input-div middle">
			<view class="div-bt">申请人</view>
			<view class="div-input">
				<view class="child-input">{{ applicant.apply_user_name }}</view>
			</view>
		</view>
		<view class="input-div middle">
			<view class="div-bt">身份证</view>
			<view class="div-input">
				<view class="child-input">{{ applicant.apply_user_phone }}</view>
			</view>
		</view>
		<view class="input-div middle">
			<view class="div-bt">手机号</view>
			<view class="div-input">
				<view class="child-input">{{ applicant.apply_user_idcard }}</view>
			</view>
		</view>
		<view class="input-xy middle">
			<radio style="transform:scale(0.7)" :checked="agreement" @click="switchKG()" />
			我同意
			<text>《使用协议》</text>
			<text>《隐私授权协议》</text>
		</view>
		<view class="input-an middle" @click="TJinvitation()">提 交 申 请</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//客户ID
				userID: '',
				//银行id
				yhId: '',
				//卡id
				cardId: '',
				//申请人数据
				applicant: [],
				//是否同意协议
				agreement: false,
				//防重复提交
				submitData: true
			};
		},
		//监听页面加载
		onLoad(option) {
			this.userID = option.id;
			this.cardId = option.cardid;
			this.yhId = option.yhid;
			this.pullData();
		},
		methods: {
			//拉取数据
			pullData: function() {
				var data = {
					applyuid: this.userID
				};
				var parameter = '?applyuid=' + this.userID;
				api.apiPost('bank/othersapplydetails', parameter, data, 'post', (status, credentials, res) => {
					if (status) {
						this.applicant = res.data;
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
			},
			//提交申请
			TJinvitation: function() {
				if (this.agreement) {
					if (this.submitData) {
						var data = {
							applyuid: this.userID,
							cid: this.cardId,
							bid: this.yhId
						};
						var parameter = '?applyuid=' + this.userID + '&cid=' + this.cardId + '&bid=' + this.yhId;
						api.apiPost('bank/othersapplysave', parameter, data, 'post', (status, credentials, res) => {
							if (status) {
								this.submitData = true;
								//#ifdef H5
								window.location.assign(res.data.url);
								//#endif
							} else {
								if (credentials == 152) {
									//跳转首页
									uni.switchTab({
										url: '/pages/index/index'
									});
								} else {
									this.submitData = true;
									uni.showToast({
										title: res.message,
										icon: 'none',
										duration: 2000
									});
								}
							}
						});
					}
				} else {
					uni.showToast({
						title: '是/否同意协议内容',
						icon: 'none',
						duration: 2000
					});
				}
			},
			//同意是/否
			switchKG: function() {
				if (this.agreement) {
					this.agreement = false;
				} else {
					this.agreement = true;
				}
			}
		}
	};
</script>

<style>
	.input-xy {
		width: 640upx;
		height: 80upx;
		line-height: 100upx;
		font-size: 24upx;
		color: #a8a8a8;
	}

	.input-xy text {
		color: #257bff;
	}

	.input-div {
		width: 640upx;
		height: 100upx;
		display: flex;
		padding-top: 40upx;
	}

	.div-bt {
		flex: 1;
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		color: #000000;
	}

	.div-input {
		width: 500upx;
		height: 100upx;
		margin-left: 30upx;
		border-bottom: 1px #dcdcdc solid;
	}

	.child-input {
		width: 500upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		color: #182130;
	}

	.input-an {
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
