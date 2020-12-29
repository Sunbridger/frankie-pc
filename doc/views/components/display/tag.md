## Tag 标签

### props

| 属性             | 类型    | 必填  | 默认    | 说明                                                                     |
| ---------------- | ------- | ----- | ------- | ------------------------------------------------------------------------ |
| type             | string  | false | primary | 标签类型, 取: default(灰色),primary(主题色),  success(绿色), link (蓝色) |
| color            | string  | false | -       | 自定义颜色, 直接传色值                                                   |
| filled           | boolean | false | false   | 填充模式和线框模式                                                       |
| background-color | string  | -     | -       | 指定背景色                                                               |
| border-color     | string  | -     | -       | 指定边框背景色                                                           |
| no-padding       | boolean | -     | -       | 取消padding                                                              |

:::demo 标签
默认类型的标签

```html
<template>
    <f-tag >默认标签</f-tag>
    <f-tag type="success" >默认标签</f-tag>
    <f-tag type="link" >默认标签</f-tag>
    <f-tag type="default" >默认标签</f-tag>
</template>
```
:::

:::demo 标签
自定义颜色

```html
<template>
    <f-tag color="#ffc53d">默认标签</f-tag>
    <f-tag color="#13c2c2">默认标签</f-tag>
    <f-tag color="#f759ab">默认标签</f-tag>
    <f-tag color="#52c41a">默认标签</f-tag>
</template>
```
:::

:::demo 标签
填充模式

```html
<template>
    <f-tag filled type="primary" >默认标签</f-tag>
    <f-tag filled type="success" >默认标签</f-tag>
    <f-tag filled type="link" >默认标签</f-tag>
    <f-tag filled color="#f759ab" >默认标签</f-tag>
    <f-tag filled type="default" >标签</f-tag>
</template>
```
:::
