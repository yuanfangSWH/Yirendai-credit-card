<template>
	<view>
		<view class="center">
			<view class="cus-div">
				<view class="cus-div-t">
					<view class="cus-div-a">已申卡客户数(人)</view>
					<view class="cus-div-b">{{ numberData1 }}</view>
				</view>
				<view class="cus-div-t">
					<view class="cus-div-a">未申卡客户数(人)</view>
					<view class="cus-div-b">{{ numberData2 }}</view>
				</view>
			</view>
			<view class="cus-tab">
				<view class="cus-tab-mk" :class="{ selected: conditions == 1 ? true : false }" @click="change(1)">已申卡客户</view>
				<view :class="{ selected: conditions == 2 ? true : false }" @click="change(2)">未申卡客户</view>
			</view>
			<!-- 已申卡客户 -->
			<view class="cus-nr" v-if="conditions == 1">
				<view v-for="(item, key) in customerData1" :key="key">
					<view class="cus-yk">
						<view class="cus-yk-xia middle">
							<view class="cus-yk-toux"><image :src="item.avatar" /></view>
							<view class="cus-yk-nic">{{ item.user_nickname }}</view>
							<view class="cus-yk-dh">{{ item.phone }}</view>
						</view>
						<view class="cus-yk-mi middle">通过我推荐申请的银行</view>
						<view class="cus-yk-xib middle" v-for="(second, index) in item.info" :key="index">
							<view class="cus-yk-img"><image :src="second.bank_logo" /></view>
							<view class="cus-yk-yh">{{ second.bank_name }}</view>
							<view class="cus-yk-zt">{{ second.apply_status }}</view>
							<view class="cus-yk-sj">{{ second.time }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 已申卡客户 -->
			<!-- 未申卡客户 -->
			<view class="cus-nr" v-if="conditions == 2">
				<view class="cus-wei" v-for="(item, key) in customerData2" :key="key">
					<view class="cus-wei-toux"><image :src="item.user_avatar" /></view>
					<view class="cus-wei-div">
						<view class="cus-wei-a">{{item.user_nickname}}</view>
						<view class="cus-wei-b">{{item.user_phone}}</view>
						<view class="cus-wei-c">{{item.time}}</view>
					</view>
				</view>
			</view>
			<!-- 未申卡客户 -->
			<view class="cus-null" v-if="cover">
				<image class="middle" src="../../../static/images/nulltb.png" />
				<view class="cus-null-wz">您还没有任何客户，赶紧去推广吧</view>
				<view class="cus-null-an middle" @click="Promote()">去推广</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '../../../common/api/api.js';
export default {
	data() {
		return {
			//用户数据
			userData: [],
			//申卡客户数据
			customerData1: [],
			//未申卡客户数据
			customerData2: [],
			//已申卡客户数
			numberData1: [],
			//未申卡客户数
			numberData2: [],
			//1申卡/2未申卡
			conditions: 1,
			//页数
			page: 1,
			//总页数
			pageCount: 1,
			//是否获取数量
			header: true,
			//是否显示推广
			cover:false
		};
	},
	//监听页面加载
	onLoad() {
		var stateData = uni.getStorageSync('state');
		if (stateData == '') {
			this.pullData();
		} else {
			this.Special('user/custmanage');
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
		//改变条件
		change: function(value) {
			if (this.conditions == value) {
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(function() {
					//隐藏加载框
					uni.hideLoading();
				}, 500);
			} else if (value == 2) {
				this.conditions = 2;
				this.pullData2();
			} else if (value == 1) {
				this.conditions = 1;
				this.pullData();
			}
		},
		//获取已经申卡客户数据
		// pullData: function() {
		// 	if(this.customerData1!=''){
		// 		this.header=false;
		// 	}
		// 	//初始化
		// 	this.customerData1 = [];
		// 	api.apiPost('user/custmanage?page=' + this.page + '&type=' + this.conditions + '&header=' + this.header, '', '', 'get', (status, credentials, res) => {
		// 		if (status) {
		// 			//是否显示推广
		// 			if(res.data.info==''){
		// 				this.cover=true;
		// 			}else{
		// 				this.cover=false;
		// 			}
		// 			var value = new Array();
		// 			for (var i = 0; i < res.data.info.length; i++) {
		// 				//银行卡数据
		// 				this.customerData1 = this.customerData1.concat(res.data.info[i].info);
		// 				for (var k = 0; k < res.data.info[i].info.length; k++) {
		// 					value[k] = {
		// 						user_id: res.data.info[i].user_id,
		// 						user_nickname: res.data.info[i].user_nickname,
		// 						avatar: res.data.info[i].avatar,
		// 						phone: res.data.info[i].phone
		// 					};
		// 				}
		// 				//用户数据
		// 				this.userData = this.userData.concat(value);
		// 			}
		// 			if(this.header){
		// 				//已申卡客户数
		// 				this.numberData1 = res.data.apply_count;
		// 				//未申卡客户数
		// 				this.numberData2 = res.data.not_apply_count;
		// 			}
		// 			//总页数
		// 			//this.pageCount = res.page.pageCount;
		// 		} else {
		// 			if (credentials == 152) {
		// 				uni.setStorageSync('state', '152');
		// 				this.Special('user/custmanage');
		// 			} else {
		// 				uni.showToast({
		// 					title: res.message,
		// 					icon: 'none',
		// 					duration: 2000
		// 				});
		// 			}
		// 		}
		// 	});
		// },
		pullData: function() {
			if(this.customerData1!=''){
				this.header=false;
			}
			//初始化
			this.customerData1 = [];
			api.apiPost('user/custmanage?page=' + this.page + '&type=' + this.conditions + '&header=' + this.header, '', '', 'get', (status, credentials, res) => {
				if (status) {
					//是否显示推广
					if(res.data.info==''){
						this.cover=true;
					}else{
						this.cover=false;
					}
					//银行卡数据
					this.customerData1 =res.data.info;
					if(this.header){
						//已申卡客户数
						this.numberData1 = res.data.apply_count;
						//未申卡客户数
						this.numberData2 = res.data.not_apply_count;
					}
				} else {
					if (credentials == 152) {
						uni.setStorageSync('state', '152');
						this.Special('user/custmanage');
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
		//获取未申卡客户数据
		pullData2: function() {
			if(this.customerData1!=''){
				this.header=false;
			}
			api.apiPost('user/custmanage?page=' + this.page + '&type=' + this.conditions + '&header=' + this.header, '', '', 'get', (status, credentials, res) => {
				if (status) {
					//是否显示推广
					if(res.data.info==''){
						this.cover=true;
					}else{
						this.cover=false;
					}
					this.customerData2 = res.data.info;
					if(this.header){
						//已申卡客户数
						this.numberData1 = res.data.apply_count;
						//未申卡客户数
						this.numberData2 = res.data.not_apply_count;
					}
					//总页数
					//this.pageCount = res.page.pageCount;
				} else {
					if (credentials == 152) {
						uni.setStorageSync('state', '152');
						this.Special('user/custmanage');
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
		//加载数据
		loadingData: function() {
			if (this.page >= this.pageCount) {
				uni.showToast({
					title: '没有更多记录了',
					icon: 'none',
					duration: 2000
				});
			}
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
		//海报推广
		Promote: function() {
			uni.navigateTo({
				url: '/pages/personal/promote/promote'
			});
		}
	}
};
</script>

<style>
@import '../../../common/css/customer.css';
/* body属性 */
page {
	background-color: #f1f4f8;
}
</style>
