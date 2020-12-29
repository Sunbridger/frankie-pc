## Button 按钮

### props

| 属性     | 类型    | 必填  | 默认    | 说明                                                                         |
| -------- | ------- | ----- | ------- | ---------------------------------------------------------------------------- |
| type     | string  | false | primary | 按钮的主色, 取值: default(灰色), success(绿色), link(蓝色) , primary(主题色) |
| size     | string  | false | normal  | 按钮的大小, 取值: normal(44), small(36), xsmall(32)                          |
| mode     | string  | false | default | 模式, 取值: default(普通), line(线框) text(文字)                             |
| inline   | boolean | false | false   | 设置宽度为auto                                                               |
| disabled | boolean | false | false   | 是否为disabled                                                               |


:::demo 按钮
使用说明

```html
<template>
    <f-button inline size="small">按钮(inline, small)</f-button>
    <f-button style="margin-left:16px;" inline size="small" type="default">按钮(default)</f-button>
</template>
```
:::


:::demo 按钮
disabled状态

```html
<template>
    <f-button inline size="small" disabled>按钮(inline, small)</f-button>
     <f-button inline size="small" style="margin-left:16px;" type="default" disabled>按钮(inline, small)</f-button>
    <f-button style="margin-left:16px;" inline size="small" line disabled>按钮(inline, small)</f-button>
</template>
```
:::