<template>
	<view>
		<view class="rec-tab">
			<view class="rec-tab-mk" :class="{ mksta: conditions == 1 ? true : false }" @click="change(1)">收入记录</view>
			<view class="rec-tab-mk" :class="{ mksta: conditions == 2 ? true : false }" @click="change(2)">提现记录</view>
			<view class="rec-tab-shou"></view>
			<view class="rec-tab-shouwz" @click="Service()">搜索</view>
		</view>
		<!-- 收入记录 -->
		<view class="rec-nr" v-if="conditions == 1">
			<view class="rec-div middle" v-for="(item, key) in recordData1" :key="key">
				<!-- <view class="rec-div-title">
					<view class="title1">{{ item.money_record_time }}</view>
					<view class="title2">收入：¥{{ item.money_record_money }}</view>
				</view> -->
				<view class="rec-div-nr">
					<view class="rec-div-a">
						<view class="rec-div-bt">
							{{ item.type_name }}
							<text>[{{ item.money_record_remark }}]</text>
						</view>
						<view class="rec-div-xi">{{ item.money_order_name }} {{ item.money_order_phone }}</view>
						<view class="rec-div-sj">{{ item.money_record_time }}</view>
					</view>
					<view class="rec-div-b">
						<view class="rec-div-jine">+ {{ item.money_record_money }}</view>
					</view>
				</view>
			</view>
			<!-- 
			<view class="rec-div middle">
				<view class="rec-div-title">
					<view class="title1">2019-04-25</view>
					<view class="title2">收入：¥240</view>
				</view>
				<view class="rec-div-nr">
					<view class="rec-div-a">
						<view class="rec-div-bt">
							推荐鼓励奖
							<text>[浦发银行]</text>
						</view>
						<view class="rec-div-xi">**云 138*****868</view>
						<view class="rec-div-sj">04-25 10:24</view>
					</view>
					<view class="rec-div-b"><view class="rec-div-jine">+ 120</view></view>
				</view>
				<view class="rec-div-nr">
					<view class="rec-div-a">
						<view class="rec-div-bt">
							推荐鼓励奖
							<text>[浦发银行]</text>
						</view>
						<view class="rec-div-xi">**云 138*****868</view>
						<view class="rec-div-sj">04-25 10:24</view>
					</view>
					<view class="rec-div-b"><view class="rec-div-jine">+ 120</view></view>
				</view>
			</view> -->
		</view>
		<!-- 收入记录 -->
		<!-- 提现记录 -->
		<view class="rec-nr" v-if="conditions == 2">
			<view class="rec-div middle" v-for="(item, key) in recordData2" :key="key">
				<!-- <view class="rec-div-title">
					<view class="title1">{{ item.take_time }}</view>
				</view> -->
				<view class="rec-div-nr">
					<view class="rec-div-a">
						<view class="rec-div-bt">收入提现</view>
						<view class="rec-div-xi">提现到：{{ item.card }}</view>
						<view class="rec-div-sj">{{ item.take_time }}</view>
					</view>
					<view class="rec-div-b">
						<view class="rec-tbd1">-{{ item.take_money }}</view>
						<view class="rec-tbd2">{{ item.status }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提现记录 -->
		<!-- 暂无数据 -->
		<view class="tebzw" v-show="basis">
			<image class="middle" src="../../../static/images/wusj.png" />
			<view class="tbdwz">暂无<text v-show="conditions == 1">收入</text>
				<text v-show="conditions == 2">提现</text>记录</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				//收入记录数据
				recordData1: [],
				//提现记录数据
				recordData2: [],
				//1收入/2提现
				conditions: 1,
				//页数
				page: 1,
				//总页数
				pageCount: 1,
				//是否有无记录
				basis:false
			};
		},
		//监听页面加载
		onLoad() {
			var stateData = uni.getStorageSync('state');
			var errorData = uni.getStorageSync('errorurl');
			if (stateData == '') {
				this.pullData();
			} else {
				this.Special(errorData);
			}
		},
		//上拉加载
		onReachBottom() {
			if (this.conditions == 2) {
				uni.showLoading({
					title: '加载中'
				});
				this.loadingData();
			}
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
			//获取收入数据
			pullData: function() {
				api.apiPost('apply/incomerecord', '', '', 'get', (status, credentials, res) => {
					if (status) {
						//收入数据
						this.recordData1 = res.data.info;
						//总页数
						this.pageCount = res.page.pageCount;
						if(this.recordData1==''){
							this.basis=true;
						}else{
							this.basis=false;
						}
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							uni.setStorageSync('errorurl', 'apply/incomerecord');
							this.Special('apply/incomerecord');
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
			//获取提现数据
			pullData2: function() {
				api.apiPost('apply/takelist?page=1', '', '', 'get', (status, credentials, res) => {
					if (status) {
						//提现数据
						this.recordData2 = res.data.info;
						//总页数
						this.pageCount = res.page.pageCount;
						if(this.recordData2==''){
							this.basis=true;
						}else{
							this.basis=false;
						}
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							uni.setStorageSync('errorurl', 'user/takecard');
							this.Special('apply/takelist');
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
				this.page++;
				if (this.page > this.pageCount) {
					uni.showToast({
						title: '没有更多记录了',
						icon: 'none',
						duration: 2000
					});
				} else {
					api.apiPost('apply/takelist?page=' + this.page, '', '', 'get', (status, credentials, res) => {
						if (status) {
							this.recordData2 = this.recordData2.concat(res.data.info);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							});
						}
					});
				}
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
			//搜索
			Service: function() {
				uni.navigateTo({
					url: '/pages/personal/search/search'
				});
			}
		}
	};
</script>

<style>
	@import '../../../common/css/record.css';

	/* body属性 */
	page {
		background-color: #f1f4f8;
	}
</style>
