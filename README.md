## td-elm
基于element-ui组件的简单二次封装，目前只支持更webpack搭配使用，不支持浏览器script引入。

- [ElmDataGrid](#elmdatagrid)
- [ElmProForm]()
- ElmInfoView

<!-- -------------------------------------- ElmDataGrid Start -------------------------------------- -->
## ElmDataGrid

#### `*`options.dataApi
`ElmDataGrid`获取数据的方法，接受的参数是`ElmDataGrid`组装后的`params`，要求返回值是`Promise`。

```javascript
dataApi: (params) => {
	// ... 可在这里对 params 参数再次处理
	return new Promise(function(resolve, reject) {
		// ... 
		resolve(result);
	});
}
```

#### `*`options.apiCallback 
`ElmDataGrid`调用`dataApi`后处理数据的函数，接受的参数是服务端接口返回的结果，要求返回一个带有`rows`和`total`属性的对象。

```javascript
apiCallback: (res) => {
	// ... 处理接口返回的结果
	return {
		rows: [], // ElmDataGrid 展示的数据
		total: 0
	}
}
```

#### `*`options.contents
`ElmDataGrid`的主体内容，配置显示的列数，以及每列的内容。要求是个数组。

```javascript
contents: [
	{
		text: '姓名', // 表头显示的文字
		width: '120px', // 该列的宽度，可不传
		content: 'userInfo.name' // 对应的字段
	},
	{
		text: '操作',
		button: true, // 设置该列为按钮
		content: [ // 当为按钮时，content 为数组
			{
				label: '删除', // 按钮显示的文字
				type: 'danger', // 按钮类型，非必传
				fn: this.delete.bind(this), // 点击该按钮触发的函数，函数参数为(index, row)
				condition: this.deleteCondition.bind(this) // 控制该按钮是否显示，不传为一直显示，函数参数为(item)，要求返回 Boolean 值
			}
		]	
	}
]
```


#### options.params
`ElmDataGrid`初始化额外的参数。可通过这个更改每页显示的条数。

```javascript
params: {
	size: 15 // 默认每页显示 20 条数据
}
```

#### options.search
配置是否显示搜索框，可赋值为`true`，显示默认的搜索框，也可自定义搜索框。

```javascript
search: {
	placeholder: '请输入搜索内容',
	width: '120px'
}
```

#### options.filters
`ElmDataGrid`的条件筛选框，目前均是支持输入搜索的下拉框，要求是数组，可以配置多个筛选框。

```javascript
filters: [{
	field: 'status', // 搜索的数据的字段，可在 params 初始化
	placeholder: '请选择培训状态',
	width: '160px',
	options: [ // 下拉的可选项
		{
			label: '未审核', // 选项显示文字
			value: '0' // 选中对应的值
		}
	]
}]
```

#### options.headBtns 
`ElmDataGrid`配置显示头部的按钮，要求是数组。

```javascript
headBtns: [{
	label: '添加',
	type: 'info',
	fn: this.add.bind(this)
}]
```

#### 组件方法
通过给组件设置`ref`属性，可以调用组件的方法。

- reload() 刷新当前数据。
- goPage(page) 跳转到指定页数。

```html
<elm-data-grid ref="my-data-grid" :options="options"></elm-data-grid>
```

```javascript
this.$refs['my-data-grid'].reload(); // 刷新数据
this.$refs['my-data-grid'].gotPage(3); // 显示第 3 页
```

<!-- -------------------------------------- ELmInfoView Start -------------------------------------- -->
## ELmInfoView

#### `*`options.data
用于填充`ELmInfoView`的数据，要求是个对象。

```javascript
data: {
	name: '张三',
	userInfo: {
		age: 24
	},
	desc: '这里是大段文字'
}
```

#### `*`options.fields
配置`ElmInfoView`显示的字段，要求是个数组。

```javascript
fields: [
	{
		label: '年龄', // 显示的标签
		field: 'userInfo.age', // 对应的字段
		colspan: 12 // 设置该Item的宽度，非必传，默认继承并且会覆盖全局的 colspan
	}
]
```

#### options.colspan
默认每个`Item`的宽度，会被`Item`里面的`colspan`属性覆盖。遵循`element-ui`的`Layout`布局，一行分`24`个单位。

```javascript
colspan: 8 // 一行显示 3 个 Item (24/8)
```

#### options.labelWidth
设置标签`label`的宽度，默认宽度为`120px`。

```javascript
labelWidth: '100px'
```

<!-- -------------------------------------- ELmInfoView Start -------------------------------------- -->
