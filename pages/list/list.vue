<template>
	<view>
		<!-- 遮罩层 -->
		<view class="box-hei" v-if="coverdiv"></view>
		<!-- 遮罩层结束-->
		<view class="list-yh">
			<view class="list-img">
				<image :src="creditData.bank_logo" />
			</view>
			<view class="list-wz">
				<view class="list-xm">{{creditData.bank_name}}</view>
				<view class="list-mi">{{creditData.bank_describe}}</view>
			</view>
			<!-- <view class="list-an" @click="Query(creditData.bank_id)">进度查询</view> -->
		</view>
		<view class="list-div middle">

			<view class="list-sp" v-for="(item, key) in creditData.cards" :key="key" @click="Request(item.bank_card_id,item.bank_card_name)">
				<view class="sp-img">
					<image :src="item.img" />
				</view>
				<view class="sp-nr">
					<view class="sp-bt">{{item.bank_card_name}}</view>
					<view class="sp-jis">{{item.bank_card_desc}}</view>
					<view class="sp-bqk">
						<view class="sp-bi" v-for="(abc, index) in item.tab" :key="index">{{item.tab[index].lablename}}</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 推荐分享 -->
		<view class="list-fx">
			<view class="list-button middle" v-if="share" @click="Promote()">推荐分享</view>
		</view>
		<!-- 登录弹框 -->
		<view class="list-login" v-if="loginbox">
			<view class="login-bt middle">
				<view class="login-x" @click="Shutdown()">
					<image src="../../static/images/jibx.png" />
				</view>
				登录/注册
			</view>
			<view class="login-sj middle"><input class="child-input" type="text" placeholder="您的手机号" /></view>
			<view class="login-yzm middle">
				<input class="child-input" type="text" placeholder="短信验证码" />
				<view class="input-hq" @click="takeGL()">{{ animation }}</view>
			</view>
			<view class="login-tx middle">
				<input class="child-input" type="text" placeholder="图形验证码" />
				<view class="tx-img"></view>
			</view>
			<view class="login-an middle">下一步</view>
		</view>
		<!-- 实名认证弹框 -->
		<view class="list-real" v-if="real">
			<view class="real-sm">
				<view class="real-x" @click="Shutdown()">
					<image src="../../static/images/jibx.png" />
				</view>
				<view class="sm-wzi middle">为全面落实《信用卡业务管理暂行办 法》，在本平台进行申请信用卡等操 作必须实名，请完善一下本人信息</view>
			</view>
			<view class="real-xm middle">
				<view class="real-zi">姓名</view>
				<view class="real-input"><input class="real-text" type="text" placeholder="请输入本人真实姓名" /></view>
			</view>
			<view class="real-sfz middle">
				<view class="real-zi">身份证号</view>
				<view class="real-input"><input class="real-text" type="text" placeholder="请输入本人真实身份证号" /></view>
			</view>
			<view class="real-an middle">确定</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//产品数据
				creditData: [],
				//推荐分享
				share: false,
				//登录弹框
				loginbox: false,
				//实名认证弹框
				real: false,
				//遮罩层
				coverdiv: false,
				//倒数动画
				animation: '获取验证码',
				//倒数
				yzmZJ: true,
				countdown: 60
			};
		},
		//监听页面加载
		onLoad(option) {
			uni.showLoading({
				title: '加载中'
			});
			//是否是合伙人
			var value = uni.getStorageSync('partner');
			if (value == 1) {
				this.share = true;
			}
			this.pullData(option.id);
		},
		methods: {
			//拉取数据
			pullData: function(id) {
				api.apiPost('bank/bankcardlist?id=' + id, '', '', 'get', (status, credentials, res) => {
					if (status) {
						//信用卡
						this.creditData = res.data;
						//设置当前标题
						uni.setNavigationBarTitle({
							title: this.creditData.bank_name
						});
						setTimeout(function() {
							//隐藏加载框
							uni.hideLoading();
						}, 300);
					} else {
						if (credentials == 152) {
							//跳转首页
							uni.switchTab({
								url: '/pages/index/index'
							});
						} else {
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			//关闭弹框
			Shutdown: function() {
				this.loginbox = false;
				this.real = false;
				this.coverdiv = false;
			},
			//验证
			takeGL: function() {
				if (this.yzmZJ == true) {
					this.obtainYZ();
				}
			},
			//获取验证码
			obtainYZ: function() {
				//验证码倒数动画
				this.setTime();
				// var data = {
				// 	mobile: this.mobile
				// };
				// var parameter = '?mobile=' + this.mobile;
				// api.apiPost('/member/forgetstep1', parameter, data, 'post', (status, res) => {
				// 	if (status) {
				// 		//验证码倒数动画
				// 		this.setTime();
				// 		this.mobile = res.data.mobile;
				// uni.showToast({
				// 	title: '验证码发送成功',
				// 	icon: 'none',
				// 	duration: 2000
				// });
				// 	} else {
				// 		uni.showToast({
				// 			title: '获取验证码错误，请重试',
				// 			icon: 'none',
				// 			duration: 2000
				// 		});
				// 	}
				// });
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
			//进度查询
			Query: function() {
				uni.navigateTo({
					url: '/pages/query/query'
				});
			},
			//申请信用卡
			Request: function(id, title) {
				uni.navigateTo({
					url: '/pages/request/request?id=' + id + '&title=' + title
				});
			},
			//银行海报
			Promote: function() {
				uni.navigateTo({
					url: '/pages/promoteyh/promoteyh?id=' + this.creditData.bank_id + '&itle=' + this.creditData.bank_name
				});
			}
		}
	};
</script>

<style>
	@import '../../common/css/list.css';
</style>
