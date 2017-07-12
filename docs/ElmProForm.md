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

##### input、password、textarea
```javascript
fields: [
  {
    text: '手机号码', // form 标签显示的文字
    type: 'input', // 对应的类型 input、password、textarea
    field: 'mobile', // 对应的字段
    change: this.change.bind(this), // @change 事件
    disabled: true, // 是否不可编辑
    required: true, // 是否必填
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

##### select、radio、checkbox
```javascript
fields: [
  {
    text: '备注',
    type: 'select', // select、radio、checkbox
    field: 'department', // 如果是 checkbox 类型的话，该字段在 initValues 里需初始化为数组
    change: this.change.bind(this),
    disabled: true,
    required: true,
    options: [
      {
        label: '人事部', // 选项显示的内容
        value: '1', // 选中对应的值
        disabled: true // 该选项是否禁选
      }
    ]
  }
]
```

##### tree
```javascript
fields: [
  {
    text: '权限',
    type: 'tree',
    field: 'permissions', // 该字段在 initValues 里需初始化为数组
    required: true,
    options: [ // 树型数据
      {
        id: 1,
        label: '用户管理',
        children: [
          {
            id: 2, // 选中的值
            label: '新增用户' // 显示是内容
          }
        ]
      }
    ]
  }
]
// 引入toTree
import { toTree } from 'td-elm/helpers';
```
`td-elm`也提供一些辅助函数，如`toTree`可在此搭配使用，把`list`转换为`tree`。详情见[源码](https://github.com/Devil-Cong/td-elm/blob/master/utils/to-tree.js)

##### transfer
```javascript
fields: [
  {
    text: '爱好',
    type: 'transfer',
    field: 'hobby', // 该字段在 initValues 里需初始化为数组
    required: true,
    options: [
      {
        label: '足球',
        value: '2',
        disabled: true
      }
    ]
  }
]
```

##### switch
```javascript
fields: [
  {
    text: '是否开放',
    type: 'switch',
    field: 'isOpen' // 该字段在 initValues 里需初始化为布尔值
  }
]
```

#### 组件方法
通过给组件设置`ref`属性，可以调用组件的方法。

- reset() 清空当前表单的数据。

```html
<elm-pro-form ref="my-pro-form" :options="options"></elm-pro-form>
```

```javascript
this.$refs['my-pro-form'].reset(); // 清空表单
`
