## modal

### props 

| 属性         | 类型            | 必填  | 默认   | 说明                              |
| ------------ | --------------- | ----- | ------ | --------------------------------- |
| show         | boolean         | false | false  | 控制显示或者隐藏                  |
| contentClass | string          | false | -      | modal 框的样式                    |
| placement    | string          | false | center | 可选值: 'center', 'bottom', 'top' |
| marginTop    | `string|number` | false | -      | modal的marginTop                  |
| minHeight    | `string|number` | false | 200    | modal的minHeight                  |

### slot

| name    | 说明           |
| ------- | -------------- |
| default | modal 框的内容 |

### emit 

| name        | params | 说明                     |
| ----------- | ------ | ------------------------ |
| update:show | false  | 关闭时触发, 生命周期钩子 |
| close       | -      | 关闭时触发               |