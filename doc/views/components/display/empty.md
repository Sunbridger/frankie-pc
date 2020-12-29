## empty

### props

| 属性        | 类型   | 必填  | 默认               | 说明           |
| ----------- | ------ | ----- | ------------------ | -------------- |
| title       | string | false | 这里似乎什么也没有 | 图片下放的文案 |
| emptySource | string | false | -                  | 空图片链接     |
| imageStyle  | string | false | -                  | 图片样式       |
| imageClass  | string | false | -                  | 图片的类名     |


### slots

| 名称    | 说明                                             |
| ------- | ------------------------------------------------ |
| default | title下方位置slot, 可以选择不传title, 自定义内容 |

:::demo 空状态
使用说明

```html
<template>
    <f-empty></f-empty>
</template>
```
:::
