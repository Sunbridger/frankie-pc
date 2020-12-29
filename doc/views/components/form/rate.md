## rate

#### props

| 属性     | 类型    | 默认  | 说明                  |
| -------- | ------- | ----- | --------------------- |
| score    | number  | 0     | 最多显示 5 颗星，整数 |
| disabled | boolean | false | 禁止选择星星          |

#### events

| 事件名 | 说明     | 返回值 |
| ------ | -------- | ------ |
| change | 选择星星 | number |

:::demo 评分
使用说明

```html
<template>
    <div class="pg-component-rate">
        <div class="content-block">
            <div class="fs14 mb10">常规</div>
            <f-rate :score="score" @change="change"></f-rate>
            <p class="mb20"></p>
            <div class="fs14 mb10">禁止选择</div>
            <f-rate :score="score1" disabled @change="change1"></f-rate>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                score: 3,
                score1: 3
            };
        },
        methods: {
            change(value) {
                this.score = value;
            },
            change1(value) {
                this.score = value;
            }
        }
    };
</script>
```

:::
