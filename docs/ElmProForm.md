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
    text: '手机号码', // form 标签显示的文字
    type: 'input', // 对应的类型，上述几种类型可选
    field: 'mobile', // 对应的字段
    pattern: 'phone', // 校验的规则，可选类型 phone，email，number
    /*
    pathern: { // 校验的规则，可以是个对象的组合校验
      type: 'number',
      max: 99, // 最大值，当且仅当 type 为 number 有效
      min: 0, // 最小值，当且仅当 type 为 number 有效
      maxlen: 20, // 输入最大长度
      minlen: 6 // 输入最小长度
    }
    */
  }
]
```
