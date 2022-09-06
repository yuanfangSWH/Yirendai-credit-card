<script>
	import api from 'common/api/api.js';
	export default {
		//初始化完成时触发（全局只触发一次）
		onLaunch: function() {
			//初始验证状态
			//api.failurePlan();
		},
		//启动或从后台进入前台显示
		onShow: function() {},
		//从前台进入后台
		onHide: function() {}
	};
</script>

<style>
	/*每个页面公共css */
	.middle {
		margin-left: auto;
		margin-right: auto;
	}

	.placeholder {
		padding-bottom: 60upx;
	}

	/* 暂无数据 */
	.tebzw {
		width: 100%;
	}

	.tebzw image {
		padding-top: 180upx;
		width: 238upx;
		height: 238upx;
		display: block;
	}

	.tebzw .tbdwz {
		padding-top: 30upx;
		font-size: 28upx;
		text-align: center;
		color: #C6D0DD;
	}
</style>
