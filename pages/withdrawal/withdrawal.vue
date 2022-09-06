<template>
	<view>
		<view class="with-bai">
			<view class="with-jin middle">提现金额(元)</view>
			<view class="with-div middle">
				<view class="with-rm">¥</view>
				<view class="with-input"><input class="child-input" type="text" placeholder="请输入提现金额" placeholder-style="color:#CDCDCD"
					 v-model="goldData" /></view>
				<view class="with-tix" @click="allTc()">全部提现</view>
			</view>
			<view class="with-key middle">可提现金额：{{ userData.take_money }}元</view>
		</view>
		<view class="with-tj with-tesg" v-if="userData.bank !== ''" @click="Solutioncard()">
			<view class="with-niyh">{{xiansData}}</view>
		</view>
		<view class="with-tj" @click="Addcard()" v-else>
			<view class="with-jia">
				<image src="../../static/images/jiaimg.png" />
			</view>
			<view class="with-zi">添加提现银行卡账号</view>
			<view class="with-jt">
				<image src="../../static/images/tonyjt.png" />
			</view>
		</view>
		<view class="with-xiy middle">
			<radio style="transform:scale(0.7)" :checked="agreement" @click="switchKG()" />
			<text @click="yzhjsxy()">《“云账户”费用结算服务协议》</text>
		</view>
		<view class="with-an middle" @click="Withdrawal()">同意协议并确认</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	//银行卡号查询API
	import BIN from "bankcardinfo";
	export default {
		data() {
			return {
				//是否同意协议
				agreement: true,
				//用户数据
				userData: [],
				//提现金额
				goldData: '',
				//防重复提交
				submitData: true,
				//显示卡号信息
				xiansData:''
			};
		},
		//页面显示时加载
		onShow() {
			this.goldData = '';
			var stateData = uni.getStorageSync('state');
			var errorurl = uni.getStorageSync('errorurl');
			if (stateData == '') {
				this.pullData();
			} else {
				this.Special(errorurl);
			}
		},
		methods: {
			//获取数据
			pullData: function() {
				api.apiPost('user/takecard', '', '', 'get', (status, credentials, res) => {
					if (status) {
						//用户数据
						this.userData = res.data;
						var _this = this;
						BIN.getBankBin(res.data.bank)
							.then(data => {
								//处理显示信息
								_this.Chulxs(data);
							})
							.catch(err => {
								console.log(err);
							});

					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('user/takecard');
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
			//未登陆？ 我系内阿爸啊~
			Special: function(url) {
				api.ONONON_login(url, (status, res) => {
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
			//处理显示信息
			Chulxs:function(data){
				var bank = this.userData.bank;
				var bankData = bank.substring(bank.length-4);
				this.xiansData = data.bankName+"卡号 ("+bankData+") "+data.cardTypeName;
			},
			//确认提现
			Withdrawal: function() {
				var patrn = /^\d+(\.\d+)?$/;
				if (this.submitData) {
					if (this.agreement) {
						if (this.userData.bank == '') {
							uni.showToast({
								title: '未添加银行卡',
								icon: 'none',
								duration: 2000
							});
						} else if (this.goldData == '') {
							uni.showToast({
								title: '请输入要提现的金额',
								icon: 'none',
								duration: 2000
							});
						} else if (this.goldData <= 0) {
							uni.showToast({
								title: '提现金额不能小于1',
								icon: 'none',
								duration: 2000
							});
						} else if (parseInt(this.goldData) > parseInt(this.userData.user_money)) {
							uni.showToast({
								title: '请输入金额超过可提现',
								icon: 'none',
								duration: 2000
							});
						}
						if (!patrn.exec(this.goldData)) {
							this.goldData = '';
							uni.showToast({
								title: '请输入金额格式错误',
								icon: 'none',
								duration: 2000
							});
						} else {
							this.submitData = false;
							var data = {
								money: this.goldData
							};
							var parameter = '?money=' + this.goldData;
							api.apiPost('user/take', parameter, data, 'post', (status, credentials, res) => {
								if (status) {
									uni.navigateTo({
										url: '/pages/withdrawalcg/withdrawalcg?card=' + this.userData.bank + '&money=' + this.goldData
									});
								} else {
									if (credentials == 152) {
										uni.setStorageSync('state', '152');
										uni.setStorageSync('errorurl', 'user/take');
										this.Special('user/take');
									} else {
										this.submitData = true;
										uni.navigateTo({
											url: '/pages/withdrawalyc/withdrawalyc?card=' + this.userData.bank + '&money=' + this.goldData
										});
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
				}
			},
			//全部提现
			allTc: function() {
				this.goldData = this.userData.take_money;
			},
			//添加银行卡
			Addcard: function() {
				uni.navigateTo({
					url: '/pages/addcard/addcard'
				});
			},
			//解绑银行卡
			Solutioncard: function() {
				uni.navigateTo({
					url: '/pages/solutioncard/solutioncard'
				});
			},
			//同意是/否
			switchKG: function() {
				if (this.agreement) {
					this.agreement = false;
				} else {
					this.agreement = true;
				}
			},
			//云账户费用结算服务协议
			yzhjsxy: function() {
				uni.navigateTo({
					url: '/pages/login/agreementyun/agreementyun'
				});
			}
		}
	};
</script>

<style>
	page {
		background-color: #f1f4f8;
	}

	.with-niyh {
		flex: 1;
		height: 100%;
		font-size: 32upx;
		color: #000000;
		padding-left: 80upx;
	}

	.with-tj {
		width: 100%;
		height: 155upx;
		background-color: #ffffff;
		display: flex;
	}

	.with-tesg {
		height: 94upx;
		line-height: 94upx;
	}

	.with-jia {
		width: 28upx;
		height: 155upx;
		padding-left: 70upx;
		padding-top: 55upx;
	}

	.with-jia image {
		width: 28upx;
		height: 28upx;
	}

	.with-zi {
		flex: 1;
		height: 155upx;
		padding-left: 50upx;
		line-height: 155upx;
		font-size: 32upx;
		color: #404b5e;
	}

	.with-jt {
		width: 90upx;
		height: 155upx;
	}

	.with-jt image {
		width: 24upx;
		height: 29upx;
		margin-top: 66upx;
	}

	.with-xiy {
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		color: #257bff;
	}

	.with-an {
		width: 630upx;
		height: 90upx;
		background: #257bff;
		text-align: center;
		line-height: 90upx;
		font-size: 34upx;
		color: #ffffff;
		margin-top: 20upx;
		-moz-border-radius: 50upx;
		-webkit-border-radius: 50upx;
		border-radius: 50upx;
	}

	.with-bai {
		width: 100%;
		margin-top: 35upx;
		margin-bottom: 20upx;
		background-color: #ffffff;
	}

	.with-jin {
		width: 650upx;
		height: 95upx;
		line-height: 95upx;
		font-size: 28upx;
		color: #000000;
		border-bottom: 1px #eef3f8 solid;
	}

	.with-div {
		width: 650upx;
		height: 160upx;
		border-bottom: 1px #eef3f8 solid;
		display: flex;
	}

	.with-rm {
		flex: 1.5;
		height: 160upx;
		line-height: 160upx;
		font-size: 72upx;
		color: #000000;
	}

	.with-input {
		flex: 5;
		height: 160upx;
	}

	.child-input {
		width: 100%;
		height: 160upx;
		line-height: 160upx;
		font-size: 44upx;
		color: #182130;
	}

	.with-tix {
		flex: 2;
		height: 160upx;
		line-height: 160upx;
		font-size: 28upx;
		color: #257bff;
		text-align: center;
	}

	.with-key {
		width: 650upx;
		height: 84upx;
		line-height: 84upx;
		font-size: 28upx;
		color: #cfd0d4;
	}
</style>
