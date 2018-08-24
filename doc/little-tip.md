#语法说明1

```angular2html
// 修饰器
// @Form.create()
// class Register {}
// 等于
// class Register {}
// Register = Form.create()(Register) || Register;
// 创建组件的的表单属性

// @connect(({ register, loading }) => ({
//   register,
//   submitting: loading.effects['register/submit'],
// }))
// 等于
// @connect(({ register, loading }) => ({
//   register,
//   submitting: loading.effects['register/submit'],
// }))(Register)
// 不redux里面的数据绑定到组件
// { register, loading }等于是redux里面的state 复制给register(本组件)的pros

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
export default class Register extends Component {
    state = {
      count: 0,
      confirmDirty: false,
      visible: false,
      help: '',
      prefix: '86',
    };
}
```
