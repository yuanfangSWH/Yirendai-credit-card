<template>
	<view class="placeholder">
		<view class="b-bt middle">微信号</view>
		<view class="b-input middle"><input class="child-input" type="text" placeholder="请输入本人微信号" v-model="WechatData" /></view>
		<view class="b-gj middle">
			<radio style="transform:scale(0.7)" :checked="agreement" @click="switchKG()" />我同意<text>《用户注册协议》</text></view>
		<view class="b-an middle" @click="validation()">提 交</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//微信号
				WechatData: '',
				//是否同意协议
				agreement: false,
				//防重复提交
				submitData: true
			}
		},
		//监听页面加载
		onLoad() {
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
			} else {
				this.Special('user/registervip');
			}
		},
		methods: {
			//验证
			validation: function() {
				if (this.agreement) {
				if (this.submitData) {
					if(this.WechatData==''){
						uni.showToast({
							title: '微信号不能为空',
							icon: 'none',
							duration: 2000
						});
					}else{
						this.submitData =false;
						this.Submit();
					}
				}
				}else{
					uni.showToast({
						title: '是/否同意协议内容',
						icon: 'none',
						duration: 2000
					});
				}
				},
			//提交
			Submit:function(){
				var data = {
					wx: this.WechatData
				};
				var parameter= "?wx="+this.WechatData;
				api.apiPost('user/registervip', parameter, data, 'post', (status, credentials, res) => {
						if (status) {
							uni.reLaunch({
								url: '/pages/registeredcg/registeredcg'
							});
						} else {
							if (credentials == 152) {
								uni.setStorageSync('state', '152');
								this.Special('user/registervip');
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
			},
			//未登陆？ 我系内阿爸啊~
			Special: function(url) {
				api.ONONON_login(url, (status,res) => {
					if (status) {
						this.pullData();
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						});
					}
				});
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
	}
</script>

<style>
	.b-bt {
		width: 630upx;
		font-size: 30upx;
		color: #474E58;
		padding-top: 40upx;
		padding-bottom: 10upx;
	}

	.b-input {
		width: 630upx;
		height: 100upx;
		border-bottom: 1px #dcdcdc solid;
	}

	.child-input {
		width: 500upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		color: #182130;
	}

	.b-gj {
		width: 630upx;
		font-size: 26upx;
		color: #B1B1B1;
		margin-top: 30upx;
		margin-bottom: 20px;
	}

	.b-gj text {
		color: #257BFF;
	}

	.b-an {
		width: 630upx;
		height: 87upx;
		background: rgba(37, 123, 255, 1);
		border-radius: 44upx;
		line-height: 87upx;
		font-size: 34upx;
		color: #FFFFFF;
		text-align: center;
	}
</style>
