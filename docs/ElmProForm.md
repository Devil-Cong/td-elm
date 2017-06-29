## ElmProForm

#### `*`options.submitFn
表单提交的函数，接受的参数是`ElmProForm`组装好后的数据。

```javascript
submitFn: (formData) => {
  // ... 可在这里对最终提交参数做再次处理
  // 进行接口请求，Ajax
}
```

#### `*`options.initValues
`ElmProForm`每个字段的初始化值。要求所有字段都需要显示声明，不然可能无法正常双向绑定。要求是个对象。

```javascript
initValues: {
  name: '',
  hobby: []
}
```

#### `*`options.fields
配置`ElmProForm`的字段。目前支持`input`，`password`，`textarea`，`select`，`radio`，`checkbox`，`tree`，`transfer`，`switch`。

##### input、password
```javascript
fields: [
  {
    type: 'input',

  }
]
```
