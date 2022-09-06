<template>
	<view>
		<view class="input-bt2 middle">更换申请人</view>
		<view class="input-div middle">
			<!-- <view class="div-bt">申请人</view> -->
			<view class="div-input"><input class="child-input" type="text" placeholder="申请人名字" placeholder-style="color:#CDCDCD"
				 v-model="invitation.user" /></view>
		</view>
		<view class="input-div middle">
			<!-- <view class="div-bt">身份证</view> -->
			<view class="div-input"><input class="child-input" type="idcard" placeholder="申请人身份证号" placeholder-style="color:#CDCDCD"
				 v-model="invitation.idcard" /></view>
		</view>
		<view class="input-div middle">
			<!-- <view class="div-bt">手机号</view> -->
			<view class="div-input"><input class="child-input" type="number" placeholder="申请人手机号" placeholder-style="color:#CDCDCD"
				 v-model="invitation.phone" /></view>
		</view>
		<view class="input-div middle">
			<!-- <view class="div-bt">验证码</view> -->
			<view class="div-input input-yz">
				<input class="child-input child-yzm" type="text" placeholder="手机验证码" placeholder-style="color:#CDCDCD" v-model="verification" />
				<view class="input-hq" @click="takeGL()">{{ animation }}</view>
			</view>
		</view>
		<view class="input-xy middle">
			<radio style="transform:scale(0.7)" :checked="agreement" @click="switchKG()" />
			我同意
			<text>《使用协议》</text>
			<text>《隐私授权协议》</text>
		</view>
		<view class="input-an middle" @click="validation()">保存并申请</view>
		<view class="input-bt middle">申请人记录</view>
		<view class="input-jl middle" v-for="(item, key) in historyData" :key="key" @click="History(item.apply_user_id)">
			<view class="jl-xm middle">姓名：{{ item.apply_user_name }}</view>
			<view class="jl-div middle">
				<view class="jl-sjh">手机号：{{ item.apply_user_phone }}</view>
				<view class="jl-jt">
					<image src="../../static/images/tonyjt.png" />
				</view>
			</view>
			<view class="jl-sfz middle">身份证：{{item.apply_user_idcard}}</view>
		</view>
		
		
		<!-- <view class="input-jl middle">
			<view class="jl-xm middle">姓名：546456</view>
			<view class="jl-div middle">
				<view class="jl-sjh">手机号：45645654654</view>
				<view class="jl-jt">
					<image src="../../static/images/tonyjt.png" />
				</view>
			</view>
			<view class="jl-sfz middle">身份证：456546546456</view>
		</view> -->
		
		<!-- 暂无数据 -->
		<view class="tebzw" v-show="historyData==''">
			<image class="middle" src="../../static/images/wusj.png" />
			<view class="tbdwz">暂无历史记录</view>
		</view>
		<view class="jl-zwf"></view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//历史记录
				historyData: [],
				//银行id
				yhId: '',
				//卡id
				cardId: '',
				//申请信息数据
				invitation: {
					//申请人
					user: '',
					//身份证
					idcard: '',
					//手机号
					phone: ''
				},
				//验证码
				verification: '',
				//是否同意协议
				agreement: false,
				//倒数动画
				animation: '获取验证码',
				//倒数
				yzmZJ: true,
				countdown: 60,
				//防重复提交
				submitData: true,
				//验证正则表达式
				re: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
				reg: /^[\u4E00-\u9FA5]{2,4}$/
			};
		},
		//监听页面加载
		onLoad(option) {
			this.yhId = option.id;
			this.cardId = option.card;
			this.pullData();
		},
		methods: {
			//记录
			pullData: function() {
				api.apiPost('bank/othersapply?key=' + this.cardId + '&value=' + this.yhId, '', '', 'get', (status, credentials,
					res) => {
					if (status) {
						//历史记录
						this.historyData = res.data.userlist;
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
			//从历史记录申请
			History: function(id) {
				uni.navigateTo({
					url: '/pages/requestb/requestb?id=' + id + '&cardid=' + this.cardId + '&yhid=' + this.yhId
				});
			},
			//验证
			validation: function() {
				if (this.agreement) {
					if (this.submitData) {
						if (this.invitation.user == '') {
							uni.showToast({
								title: '申请人不能为空',
								icon: 'none',
								duration: 2000
							});
						} else if (!this.reg.test(this.invitation.user)) {
							uni.showToast({
								title: '申请人名字格式错误',
								icon: 'none',
								duration: 2000
							});
						} else if (this.invitation.idcard == '') {
							uni.showToast({
								title: '身份证不能为空',
								icon: 'none',
								duration: 2000
							});
						} else if (!this.re.test(this.invitation.idcard)) {
							uni.showToast({
								title: '身份证格式错误',
								icon: 'none',
								duration: 2000
							});
						} else if (this.invitation.phone == '') {
							uni.showToast({
								title: '手机号不能为空',
								icon: 'none',
								duration: 2000
							});
						} else if (this.verification == '') {
							uni.showToast({
								title: '验证码不能为空',
								icon: 'none',
								duration: 2000
							});
						} else {
							this.submitData = false;
							this.TJinvitation();
						}
					}
				} else {
					uni.showToast({
						title: '是/否同意协议内容',
						icon: 'none',
						duration: 2000
					});
				}
			},
			//提交申请
			TJinvitation: function() {
				var data = {
					cid: this.cardId,
					bid: this.yhId,
					phone: this.invitation.phone,
					idcard: this.invitation.idcard,
					name: this.invitation.user,
					smscode: this.verification
				};
				var parameter =
					'?cid=' +
					this.cardId +
					'&bid=' +
					this.yhId +
					'&phone=' +
					this.invitation.phone +
					'&idcard=' +
					this.invitation.idcard +
					'&name=' +
					this.invitation.user +
					'&smscode=' +
					this.verification;
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
			},
			//验证码方法
			takeGL: function() {
				if (this.yzmZJ) {
					if (this.invitation.user == '') {
						uni.showToast({
							title: '申请人名字不能为空',
							icon: 'none',
							duration: 2000
						});
					} else if (!this.reg.test(this.invitation.user)) {
						uni.showToast({
							title: '申请人名字格式错误',
							icon: 'none',
							duration: 2000
						});
					} else if (this.invitation.idcard == '') {
						uni.showToast({
							title: '身份证不能为空',
							icon: 'none',
							duration: 2000
						});
					} else if (!this.re.test(this.invitation.idcard)) {
						uni.showToast({
							title: '身份证格式错误',
							icon: 'none',
							duration: 2000
						});
					} else if (this.invitation.phone == '') {
						uni.showToast({
							title: '手机号不能为空',
							icon: 'none',
							duration: 2000
						});
					} else {
						this.obtainYZ();
					}
				}
			},
			//获取验证码
			obtainYZ: function() {
				//验证码倒数动画
				this.setTime();
				var data = {
					phone: this.invitation.phone
				};
				var parameter = '?phone=' + this.invitation.phone;
				api.apiPost('bank/applysendsms', parameter, data, 'post', (status, credentials, res) => {
					if (status) {
						//验证码倒数动画
						this.setTime();
						this.invitation.phone = res.data.phone;
						uni.showToast({
							title: '验证码发送成功',
							icon: 'none',
							duration: 2000
						});
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//验证码倒数动画
			setTime: function() {
				let _this = this;
				if (this.countdown == 0) {
					this.countdown = 60;
					this.yzmZJ = true;
					this.animation = '获取验证码';
				} else {
					this.animation = this.countdown + '秒';
					this.countdown--;
					this.yzmZJ = false;
					setTimeout(function() {
						_this.setTime();
					}, 1000);
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
	/* body属性 */
	page {
		background-color: #f1f4f8;
	}

	.tebzw image {
		padding-top: 80upx;
	}

	.jl-zwf {
		width: 100%;
		height: 80upx;
	}

	.child-yzm {
		width: 260upx;
	}

	.input-hq {
		width: 240upx;
		height: 68upx;
		background: #257bff;
		color: #ffffff;
		font-size: 26upx;
		line-height: 68upx;
		text-align: center;
		-moz-border-radius: 40upx;
		-webkit-border-radius: 40upx;
		border-radius: 40upx;
	}

	.input-yz {
		display: flex;
	}

	.jl-xm {
		width: 585upx;
		height: 55upx;
		line-height: 55upx;
		font-size: 32upx;
		color: #182130;
		padding-top: 8upx;
	}

	.jl-div {
		width: 585upx;
		height: 55upx;
		display: flex;
	}

	.jl-sjh {
		width: 555upx;
		height: 55upx;
		line-height: 55upx;
		font-size: 26upx;
		color: #99a8bc;
	}

	.jl-jt {
		flex: 1;
		height: 55upx;
	}

	.jl-jt image {
		width: 24upx;
		height: 26upx;
		padding-top: 16upx;
	}

	.jl-sfz {
		width: 585upx;
		height: 55upx;
		line-height: 55upx;
		font-size: 26upx;
		color: #99a8bc;
	}

	.input-jl {
		width: 660upx;
		height: 177upx;
		margin-bottom: 15upx;
		box-shadow: 0px 2px 15px 1px rgba(235, 244, 255, 1);
		background-color: #FFFFFF;
		border-radius: 16upx;
	}

	.input-bt {
		width: 640upx;
		height: 86upx;
		line-height: 86upx;
		font-size: 36upx;
		color: #000000;
		padding-top: 140upx;
		padding-bottom: 20upx;
		font-weight: bold;
	}

	.input-bt2 {
		width: 640upx;
		height: 86upx;
		line-height: 86upx;
		font-size: 36upx;
		color: #000000;
		padding-top: 40upx;
		font-weight: bold;
	}

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
		padding-top: 20upx;
	}

	.div-bt {
		flex: 1;
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		color: #000000;
	}

	.div-input {
		width: 630upx;
		height: 80upx;
		/* margin-left: 30upx; */
		border-bottom: 1px #dcdcdc solid;
	}

	.child-input {
		width: 500upx;
		height: 80upx;
		line-height: 80upx;
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
