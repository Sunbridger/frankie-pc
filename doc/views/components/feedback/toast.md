## toast

### props

| 属性     | 类型           | 必填  | 默认   | 说明                        | 可选值            |
| -------- | -------------- | ----- | ------ | --------------------------- | ----------------- |
| value    | Boolean        | true  | false  | 是否显示, 使用 v-model 绑定 | --                |
| time     | Number、String | false | 2000   | 显示时间                    | --                |
| position | String         | false | middle | 显示位置                    | middle/top/bottom |

### slot

| name    | 说明               |
| ------- | ------------------ |
| default | 默认需要提示的内容 |

### events

| 事件名  | 说明           | 返回值 |
| ------- | -------------- | ------ |
| on-show | 提示弹出时触发 | true   |
| on-hide | 提示隐藏时触发 | false  |



:::demo 轻提示
基础使用

```html
<!-- <f-toast></f-toast> -->
```

:::

:::demo 轻提示 插件调用
基础使用

```js
// show
this.$fk.toast.show({
    text: '你提示的内容', // 必填
    time: 1000,
    position: 'top',
    onShow: () => {},
    onHide: () => {}
});

// close
this.$fk.toast.hide();
```
