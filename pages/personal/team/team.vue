<template>
	<view>
		<view class="center">
			<view class="team-title">我的团队业绩</view>
			<view class="team-tuan-div">
				<view class="team-tuan-ta">
					<view class="team-tuan-tb">
						<view class="team-tuan-wz1">本月总业绩(元)</view>
						<view class="team-tuan-wz2">{{ headData.total_money==''||headData.total_money==null ? 0 : headData.total_money }}</view>
					</view>
					<view class="team-tuan-tb">
						<view class="team-tuan-wz1">本月团队核卡数(张)</view>
						<view class="team-tuan-wz2">{{ headData.total_order==''||headData.total_order==null ? 0 : headData.total_order }}</view>
					</view>
				</view>
				<view class="team-tuan-ta">
					<view class="team-tuan-tb">
						<view class="team-tuan-wz1">直推合伙人(人)</view>
						<view class="team-tuan-wz2">{{ headData.sub_user==''||headData.sub_user==null ? 0 : headData.sub_user }}</view>
					</view>
					<view class="team-tuan-tb">
						<view class="team-tuan-wz1">团队总人数(人)</view>
						<view class="team-tuan-wz2">{{ headData.team_num==''||headData.team_num==null ? 0 : headData.team_num }}</view>
					</view>
				</view>
			</view>
			<view v-if="superior">
				<view class="team-title">我的推荐人</view>
				<view class="team-tj-div">
					<view class="team-tj-tx">
						<image :src="superiorData.user_avatar==''||superiorData.user_avatar==null? '../../../static/images/default.png':superiorData.user_avatar" />
					</view>
					<view class="team-tj-nic">{{superiorData.user_nickname}}</view>
					<view class="team-tj-wx" :data-clipboard-text="superiorData.user_wx" @click="copy()">
						<image src="../../../static/images/wxtb.png" />
					</view>
					<view class="team-tj-dh" @click="dialDH()">
						<image src="../../../static/images/dhtb.png" />
					</view>
				</view>
				<view class="team-tj-mi">专属客服会详细解答您的问题，快和他联系吧</view>
			</view>
			<view class="team-title">直推及其团队业绩</view>
			<view class="team-td-div" v-for="(item, key) in teamData" :key="key">
				<view class="team-td-a">
					<view class="team-td-toux">
						<image :src="item.user_avatar==''||item.user_avatar==null? '../../../static/images/default.png':item.user_avatar" />
					</view>
					<view class="team-td-wz">
						<view class="team-wz-a">{{ item.user_nickname }}</view>
						<view class="team-wz-b">{{ item.user_phone }}</view>
						<view class="team-wz-c">加入时间：{{ item.user_reg_time }}</view>
					</view>
					<view class="team-td-zk" @click="opeN(item.user_id)">
						<view>团队业绩</view>
						<image src="../../../static/images/zkl2.png" v-if="messageData[key].isShow" />
						<image src="../../../static/images/zkl1.png" v-else />
					</view>
				</view>
				<view class="team-td-nr" v-show="messageData[key].isShow">
					<view class="team-td-lm">
						<view class="team-lm-a">
							团队人数
							<text class="lm-text">{{ item.team_num==''||item.team_num==null ? 0 : item.team_num}}</text>
							人
						</view>
						<view class="team-lm-b">
							本月核卡
							<text class="lm-text">{{ item.success_card==''||item.success_card==null ? 0 :item.success_card }}</text>
							张
						</view>
					</view>
					<view class="team-td-lm ml-tes">
						<view class="team-lm-a">
							本月业绩
							<text class="lm-text">{{ item.month_money==''||item.month_money==null ? 0 :item.month_money }}</text>
							元
						</view>
						<view class="team-lm-b">
							昨日业绩
							<text class="lm-text">{{ item.yesterDay_money==''||item.yesterDay_money==null ? 0 :item.yesterDay_money }}</text>
							元
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	//clipboard插件
	import Clipboard from '../../../common/clipboard/clipboard.min.js';
	export default {
		data() {
			return {
				//上级数据
				superiorData: [],
				//头部数据
				headData: [],
				//团队数据
				teamData: [],
				//消息内容
				messageData: [],
				//页数
				page: 1,
				//最大页数
				pageCount: 1,
				//头部数据条件
				header: 1,
				//是否显示上级
				superior: false
			};
		},
		//监听页面加载
		onLoad() {
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
				this.pullData();
			} else {
				this.Special('user/myteam');
			}
		},
		//上拉加载
		onReachBottom() {
			uni.showLoading({
				title: '加载中'
			});
			this.loadingData();
		},
		methods: {
			//获取数据
			pullData: function() {
				api.apiPost('user/myteam?page=' + this.page + '&header=' + this.header, '', '', 'get', (status, credentials, res) => {
					if (status) {
						if (res.data.p_user != '') {
							//上级数据
							this.superiorData = res.data.p_user;
							this.superior = true;
						}
						//头部数据
						this.headData = res.data.team;
						//团队数据
						this.teamData = res.data.subuser;
						//最大页数
						this.pageCount = res.page.pageCount;
						for (var i = 0; i < this.teamData.length; i++) {
							this.messageData.push({
								user_id: this.teamData[i].user_id,
								isShow: false
							});
						}
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('user/myteam');
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
			//加载数据
			loadingData: function() {
				this.page++;
				if (this.page > this.pageCount) {
					uni.showToast({
						title: '没有更多记录了',
						icon: 'none',
						duration: 2000
					});
				} else {
					api.apiPost('user/myteam?page=' + this.page + '&header=0', '', '', 'get', (status, credentials, res) => {
						if (status) {
							this.teamData = this.teamData.concat(res.data.subuser);
							for (var i = 0; i < this.teamData.length; i++) {
								this.messageData.push({
									t_id: this.teamData[i].m_notice_id,
									isShow: false
								});
							}
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						} else {
							uni.showToast({
								title: '数据获取失败',
								icon: 'none',
								duration: 2000
							});
						}
					});
				}
			},
			//展开
			opeN: function(id) {
				for (var i = 0; i < this.messageData.length; i++) {
					if (this.messageData[i].user_id == id) {
						if (!this.messageData[i].isShow) {
							this.messageData[i].isShow = true;
						} else {
							this.messageData[i].isShow = false;
						}
					}
				}
			},
			//复制微信号
			copy: function() {
				//#ifdef APP-PLUS
				//设置系统剪切板内容 ----仅兼容APP/小程序
				uni.setClipboardData({
					data: this.superiorData.user_wx,
					success: function() {
						uni.showToast({
							title: '微信号复制成功',
							icon: 'none',
							duration: 2000
						});
					},
					fail: function() {
						uni.showToast({
							title: '复制失败',
							icon: 'none',
							duration: 2000
						});
					}
				});
				//#endif

				//#ifdef H5
				//注意要使用let或者const，不能使用var，否则会出现复制次数叠加的问题，即复制不止一次。----仅兼容H5
				let clipboard = new Clipboard('.team-tj-wx');
				clipboard.on('success', function(e) {
					uni.showToast({
						title: '微信号复制成功',
						icon: 'none',
						duration: 2000
					});
				});

				clipboard.on('error', function(e) {
					uni.showToast({
						title: '复制失败',
						icon: 'none',
						duration: 2000
					});
				});
				//#endif
			},
			//拨打电话
			dialDH: function() {
				var phone = this.superiorData.user_phone;
				uni.makePhoneCall({
					phoneNumber: phone
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
			}
		}
	};
</script>

<style>
	@import '../../../common/css/team.css';

	/* body属性 */
	page {
		background-color: #f1f4f8;
	}
</style>
