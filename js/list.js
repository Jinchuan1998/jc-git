var vm = new Vue({
  el: '#refreshContainer',
  
  data: {
  	list: [], // 列表数据
  	page: 0, // 页码
  	pageSize: 2, // 每页显示条数
  },
  
  methods: {
  	/**
  	 * 下拉刷新
  	 */
  	downFn: function () {
  		// 做一个ajax请求
  		this.getList(function() {
  			mui('#refreshContainer').pullRefresh().endPulldown();
  		})
  	},
  	
  	/**
  	 * 上拉加载更多
  	 */
  	upFn: function () {
  		this.page++;
  		this.getList(function() {
  			mui('#refreshContainer').pullRefresh().endPullup();
  		}, true)
  	},
  	
  	/**
  	 * 获取数据
  	 * @param {Function} callback 回调函数
  	 * @param {Boolean} isMore 是否加载更多
  	 */
  	getList: function (callback, isMore) {
  		var that = this;
  		mui.get('https://www.daxunxun.com/douban', {
  			start: that.page,
  			count: that.pageSize
  		},
  		function (result) {
//			console.log(result)
//			that.list = result
        if (isMore) {
        	that.list = that.list.concat(result);
        } else {
        	that.list = result;
        }
  			
  			// 上面的操作做完了之后
  			callback();
  		})
  	}
  }
})

mui.init({
	pullRefresh: {
		container: '#refreshContainer',
		down: {
			height: 50, //可选,默认50.触发下拉刷新拖动距离,
			auto: true, //可选,默认false.首次加载自动下拉刷新一次
			contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			callback: vm.downFn //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		},
		up: {
			height: 50, //可选.默认50.触发上拉加载拖动距离
			auto: false, //可选,默认false.自动上拉加载一次
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: vm.upFn //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	}
})