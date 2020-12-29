## loading 

### props

| 属性            | 类型    | 必填  | 默认  | 说明                                         |
| --------------- | ------- | ----- | ----- | -------------------------------------------- |
| loading         | Boolean | false | false | 是否loading                                  |
| delay           | Number  | false | 0     | 延迟loadding的时间                           |
| full            | Boolean | false | false | 是否全屏loading                              |
| mask-back-color | String  | false | #FFF  | 遮罩的颜色, 需要的时候需要自己传入透明背景色 |

### slot

| name    | 说明                      |
| ------- | ------------------------- |
| default | 默认被覆盖的内容          |
| title   | gif下方的文字或者其他内容 |


:::demo 加载器
基础使用

```html
<template>
    <div class="pg-component-loading">
        <div class="padding16">
            <f-loading :loading="true"></f-loading>
        </div>
    </div>
</template>
```
:::

:::demo 加载器
覆盖div内容

```html
<template>
    <div class="pg-component-loading">
            <f-loading :loading="true" mask-back-color="rgba(255,255,255,0.68)">
                <div>
                    <h1>这里是大标题</h1>
                </div>
            </f-loading>
    </div>
</template>
```
:::

:::demo 加载器
延迟加载(2s后开始加载)

```html
<template>
    <div class="pg-component-loading">
            <f-loading :loading="true" :delay="2000" mask-back-color="rgba(255,255,255,0.68)">
                <div>
                    <h1>这里是大标题</h1>
                </div>
            </f-loading>
    </div>
</template>
```
:::
