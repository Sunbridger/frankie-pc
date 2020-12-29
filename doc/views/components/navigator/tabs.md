## tabs

#### props

| 属性          | 类型   | 默认 | 说明                          |
| ------------- | ------ | ---- | ----------------------------- |
| tabs          | Array  | []   | 数据展示字段：[String/Option] |
| defaultActive | Number | 0    | 默认显示某一个下标            |
| tabStyle      | Object | {}   | tab 样式                      |
| lineStyle     | Object | {}   | 滑块 样式                     |
| tagStyle      | Object | {}   | 标签 样式                     |

#### options

| 属性 | 类型   | 默认 | 说明         |
| ---- | ------ | ---- | ------------ |
| name | String | -    | 数据展示字段 |

#### events

| 事件名 | 说明                     | 返回值                                                                              |
| ------ | ------------------------ | ----------------------------------------------------------------------------------- |
| change | 当前激活的标签改变时触发 | index: 当前选择序号； value：当前项数据； this.\$refs.tag[index]：当前选择 tab 实例 |

:::demo 标签页
使用说明

```html
<template>
    <div class="pg-component-tab">
        <div class="content-block">
            <div class="fs14">基础用法</div>
            <f-tabs :tabs="tabs"></f-tabs>
            <div class="fs14 mt40">标签栏滚动</div>
            <f-tabs :tabs="tabs1"></f-tabs>
            <div class="fs14 mt40">外部控制</div>
            <f-tabs :tabs="tabs2" :defaultActive.sync="defaultActive"></f-tabs>
            <f-button class="mt15" @click="defaultActive = 2">tab:2</f-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tabs: ['大搜车', '弹个车', '举个手', '踢脚'],
                tabs1: ['大搜车', '弹个车', '举个手', '踢脚', '大搜车', '弹个车', '举个手', '踢脚'],
                tabs2: ['大搜车', '弹个车', '举个手', '踢脚', '大搜车', '弹个车', '举个手', '踢脚'],
                tabs3: [{ name: '大搜车' }, { name: '大搜车' }, { name: '大搜车' }, { name: '大搜车' }],
                defaultActive: 0
            };
        }
    };
</script>
<style lang="less" scoped>
    .content-block {
        width: 100%;
        margin: 20px;
    }
</style>
```

:::
