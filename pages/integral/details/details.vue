<template>
	<view>
		<!-- 恭喜您，抢购成功！弹框 -->
		<view class="kzzwtk" v-show="bounced1">
			<view class="tjbst">
				<image class="cjlkjltj" src="../../../static/images/cg01.png"></image>
				<view class="gjljlt">恭喜您，抢购成功！</view>
			</view>
			<view class="wcnmdbt middle">客服FM</view>
			<view class="nmdmsi middle">系统将在48小时内为您发放免单口令，商品为独家红包补贴，领取后可自行打开淘宝APP进行免单购物，如有问题可查看使用教程!</view>
			<view class="jldjbkcg middle">*邀请好友办卡成功，可再获得抢购机会</view>
			<view class="wdggyt">
				<view class="hga1" @click="ljgw">领劵购物</view>
				<view class="hga2" @click="fxgh">分享好友</view>
			</view>
		</view>
		<view class="zhezc" v-show="bounced1" @click="gbtkot"></view>
		<!-- 恭喜您，抢购成功！弹框结束 -->
		<!-- 次数不足！弹框 -->
		<view class="kzzwtk nmdjbd" v-show="bounced2">
			<view class="tjbst">
				<image class="cjlkjltj cjtbdhbimg" src="../../../static/images/cg01.png"></image>
				<view class="gjljlt">次数不足！</view>
			</view>
			<view class="wcnmdbt middle">客服FM</view>
			<view class="nmdmsi nmdntwz middle">您的剩余次数不足，邀请1位好友办卡成功或本人申请批卡成功，<span>可获得1次抢购机会奖励</span></view>
			<view class="wdggyt">
				<view class="hga1" @click="wybk">我要办卡</view>
				<view class="hga2" @click="ljyaoq">立即邀请</view>
			</view>
		</view>
		<view class="zhezc" v-show="bounced2" @click="gbtkot"></view>
		<!-- 次数不足！弹框结束 -->
		<view class="bgbdsimg">
			<image class="middle" :src="creditData.main_img"></image>
		</view>
		<view class="spdxing">
			<view class="bttto">
				<image class="tbjtimg" src="../../../static/images/mrtx.png"></image>
				<view class="jmdmz">{{creditData.name}}</view>
			</view>
			<view class="gdjhz">
				<view class="hzssdh">
					<view class="zltdmr">天猫价¥{{creditData.old_price}}</view>
					<view class="bsdnh">次数：{{creditData.jifen_num }}</view>
				</view>
				<view class="ddtd">
					<view class="weifen">分 享</view>
					<view class="gud">剩余{{creditData.shop_number}}件</view>
				</view>
			</view>
		</view>
		<view class="qiangoutis">
			<view class="djblxy">
				<view class="dtlbcnm">
					<view class="tmsbimg middle">
						<image class="middle" src="../../../static/images/tbdt1.png"></image>
					</view>
				</view>
				<view class="wxje">抢购提示</view>
			</view>
			<view class="tbjlh">
				<view class="bbldjt">* 购物卷领取后24小时未使用后会自动失效。</view>
				<view class="tijln">* 商品为独家红包补贴，领取后可打开手机淘宝</view>
				<view class="tijln tbdh">APP下单。</view>
			</view>
		</view>
		<view class="tuwtqxq">
			<view class="bdmjdx"></view>
			<view class="cnqnmtwxq">图文详情</view>
			<view class="bdmjdx"></view>
		</view>
		<view class="tbdntitm">
			<image class="spjbt middle" mode="widthFix" :src="creditData.desc_img"></image>
		</view>
		<!-- 悬浮底部 -->
		<view class="dibdtmd">
			<image class="tebdjbwaz" src="../../../static/images/hzgtt.png"></image>
			<view class="qiangsd">剩余抢购机会<span>{{snapUp}}</span>次</view>
			<view class="zmbdlteao" @click="qijqg(creditData.id)">立即抢购</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				//ID
				idData: '',
				//弹框1
				bounced1: false,
				//弹框2
				bounced2: false,
				//商品数据
				creditData: [],
				//抢购次数
				snapUp: 0
			}
		},
		//监听页面加载
		onLoad(option) {
			this.idData = option.id
			this.pullData();
		},
		methods: {
			//获取数据
			pullData: function(id) {
				var data = {
					id: this.idData
				};
				var parameter = '?id=' + this.idData;
				api.apiPost('shop/shopdetails', parameter, data, 'post', (status, credentials, res) => {
					if (status) {
						//商品数据
						this.creditData = res.data.shop;
						//抢购次数
						this.snapUp = res.data.usernumber;
					} else {
						if (credentials == 152) {
							//跳转首页
							uni.switchTab({
								url: '/pages/index/index'
							});
						} else {
							uni.showToast({
								title: '数据获取失败，请重试',
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			//立即抢购
			qijqg: function(id) {
				if (this.creditData.shop_number == 0 || this.creditData.shop_number == "") {
					uni.showToast({
						title: '商品已无剩余,下次再来看看',
						icon: 'none',
						duration: 2000
					});
				} else if (this.snapUp < this.creditData.jifen_num) {
					//次数不足！弹框
					this.bounced2 = true;
				} else {
					api.apiPost('shop/forgoods?shopid=' + id, '', '', 'get', (status, credentials, res) => {
						if (status) {
							//重新加载数据
							this.pullData();
							//抢购成功！弹框
							this.bounced1 = true;
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
			},
			//关闭弹框
			gbtkot: function() {
				this.bounced1 = false;
				this.bounced2 = false;
			},
			//我要办卡
			wybk: function() {
				//跳转首页
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			//领卷购物
			ljgw: function() {
				uni.navigateTo({
					url: '/pages/integral/qgrecord/qgrecord'
				});
			},
			//分享好友
			fxgh: function() {
				uni.navigateTo({
					url: '/pages/personal/promote/promote'
				});
			},
			//立即邀请
			ljyaoq: function() {
				var partner = uni.getStorageSync('partner');
				if (partner == 1) {
					uni.navigateTo({
						url: '/pages/personal/promote/promote'
					});
				} else {
					uni.navigateTo({
						url: '/pages/become/become'
					});
				}
			}
		}
	}
</script>

<style>
	@import '../../../common/css/integral.css';

	/* body属性 */
	page {
		background-color: #F1F4F8;
	}

	.dibdtmd {
		bottom: 0px;
	}

	/* 弹框 */
	.zhezc {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(33, 37, 41, 1);
		opacity: 0.7;
		z-index: 80;
	}

	.kzzwtk {
		width: 620upx;
		height: 510upx;
		background-color: #FFFFFF;
		position: fixed;
		border-radius: 30upx;
		top: 50%;
		margin-top: -255upx;
		left: 50%;
		margin-left: -310upx;
		z-index: 90;
		overflow: hidden;
	}

	.tjbst {
		width: 100%;
		height: 108upx;
		background-color: #2682FF;
		display: flex;
	}

	.cjlkjltj {
		width: 28upx;
		height: 28upx;
		display: block;
		margin-right: 20upx;
		margin-left: 150upx;
		margin-top: 40upx;
	}

	.gjljlt {
		height: 108upx;
		line-height: 108upx;
		color: #FFFFFF;
		font-size: 30upx;
	}

	.wcnmdbt {
		width: 520upx;
		height: 70upx;
		line-height: 70upx;
		font-size: 30upx;
		margin-top: 16upx;
	}

	.nmdmsi {
		width: 520upx;
		line-height: 40upx;
		font-size: 28upx;
		color: #575757;
	}

	.jldjbkcg {
		width: 520upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 24upx;
		color: #CBCBCB;
		margin-bottom: 10upx;
	}

	.wdggyt {
		width: 100%;
		height: 96upx;
		display: flex;
		border-top: 1px #DFE4EA solid;
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.hga1 {
		flex: 1;
		height: 96upx;
		line-height: 96upx;
		text-align: center;
		font-size: 30upx;
		color: #2682FF;
		border-right: 1px #DFE4EA solid;
	}

	.hga2 {
		flex: 1;
		height: 96upx;
		line-height: 96upx;
		text-align: center;
		font-size: 30upx;
		color: #FFA126;
	}

	.nmdjbd {
		height: 450upx;
	}

	.cjtbdhbimg {
		margin-left: 210upx;
	}

	.nmdntwz span {
		color: #FFA800;
	}

	.nmdntwz {
	}

	/* 弹框结束 */
	.tbdntitm {
		padding-bottom: 120upx;
	}

	.spjbt {
		width: 100%;
	}

	.zmbdlteao {
		width: 186upx;
		margin-left: 150upx;
	}

	.tuwtqxq {
		width: 100%;
		height: 100upx;
		display: flex;
		background-color: #FFFFFF;
	}

	.cnqnmtwxq {
		flex: 1;
		height: 100upx;
		text-align: center;
		font-size: 24upx;
		line-height: 80upx;
	}

	.bdmjdx {
		width: 120upx;
		height: 1px;
		background: rgba(229, 229, 229, 1);
		border-radius: 1px;
		margin-top: 40upx;
		margin-left: 90upx;
		margin-right: 90upx;
	}

	.djblxy {
		width: 214upx;
		height: 100%;
	}

	.dtlbcnm {
		padding-top: 30upx;
	}

	.tmsbimg {
		width: 90upx;
		height: 90upx;
		background: rgba(215, 229, 255, 1);
		border-radius: 50%;
	}

	.tmsbimg image {
		width: 58upx;
		height: 58upx;
		display: block;
		padding-top: 18upx;
	}

	.wxje {
		width: 100%;
		height: 54upx;
		line-height: 54upx;
		font-size: 20upx;
		color: #2A75FF;
		text-align: center;
	}

	.tbjlh {
		flex: 1;
		height: 100%;
	}

	.bbldjt {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		font-size: 24upx;
		padding-top: 40upx;
	}

	.tijln {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		font-size: 24upx;
	}

	.tbdh {
		text-indent: 20upx;
	}

	.qiangoutis {
		width: 100%;
		height: 186upx;
		background: rgba(227, 237, 255, 1);
		margin-top: 20upx;
		margin-bottom: 20upx;
		display: flex;
	}

	.gdjhz {
		width: 100%;
		display: flex;
	}

	.hzssdh {
		flex: 1;
	}

	.zltdmr {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		font-size: 22upx;
		color: #A2ADC0;
		text-decoration: line-through;
		text-indent: 32upx;
		margin-top: 10upx;

	}

	.bsdnh {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		font-size: 32upx;
		color: #E34D2A;
		text-indent: 32upx
	}

	.ddtd {
		width: 200upx;
	}

	.weifen {
		width: 170upx;
		height: 60upx;
		background: rgba(255, 168, 0, 1);
		border-radius: 30upx;
		line-height: 60upx;
		font-size: 26upx;
		color: #FFFFFF;
		text-align: center;
	}

	.gud {
		width: 170upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 22upx;
		color: #CACACA;
		text-align: center;
	}

	.bttto {
		width: 100%;
		height: 85upx;
		display: flex;
	}

	.tbjtimg {
		width: 32upx;
		height: 32upx;
		display: block;
		margin-left: 30upx;
		margin-top: 26upx;
		margin-right: 20upx;
	}

	.jmdmz {
		height: 85upx;
		line-height: 85upx;
		font-size: 32upx;
	}

	.bgbdsimg {
		width: 750upx;
		height: 700upx;
	}

	.bgbdsimg image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.spdxing {
		width: 100%;
		height: 222upx;
		background-color: #FFFFFF;
	}
</style>
