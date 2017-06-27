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