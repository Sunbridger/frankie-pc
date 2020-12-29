### confirm

### API

#### \$fk.confirm

| 属性 | 说明           | 参数    | 返回值 |
| ---- | -------------- | ------- | ------ |
| show | 调用确认框显示 | options | void   |
| hide | 关闭弹窗       | -       | void   |

#### Options

| 参数      | 类型     | 默认值       | 说明                                          | 事件返回值                                     |
| --------- | -------- | ------------ | --------------------------------------------- | ---------------------------------------------- |
| content   | string   | -            | 显示内容，可以直接用字符串标签（v-html 渲染） |                                                |
| sureBtn   | string   | false        | 显示确认按钮文案                              |                                                |
| cancelBtn | string   | false        | 显示取消按钮文案                              |                                                |
| onCancel  | function | confirm.hide | 取消按钮事件                                  | () => (false, confirm.hide, \$vm<当前弹框实例> |
| onSure    | function | confirm.hide | 确认按钮事件                                  | () => (\$vm<当前弹框实例>                      |

#### props

| 属性      | 类型    | 默认  | 说明                                          |
| --------- | ------- | ----- | --------------------------------------------- |
| show      | boolean | false | 确认框是否显示                                |
| content   | string  | -     | 显示内容，可以直接用字符串标签（v-html 渲染） |
| sureBtn   | string  | 确认  | 显示确认按钮文案                              |
| cancelBtn | string  | 取消  | 显示取消按钮文案                              |

#### events

| 事件名 | 说明         | 返回值 |
| ------ | ------------ | ------ |
| close  | 点击取消按钮 | false  |
| sure   | 点击确认按钮 | void   |

### slot

| name    | 说明         |
| ------- | ------------ |
| default | content 内容 |

:::demo confirm

```html
<template>
    <div class="pg-component-confirm">
        <div class="wrap">
            <f-button @click="show = true">基础用法</f-button>
            <f-button class="mt20" @click="show2 = true">基础用法:slot</f-button>
            <f-button class="mt20" @click="show1 = true">基础用法: .sync</f-button>
            <f-button class="mt20" @click="handle">全局调用:基础用法</f-button>
            <f-button class="mt20" @click="handle1">全局调用: 手动赋值关闭</f-button>
            <f-confirm
                :show="show"
                @on-close="show = false"
                @on-sure="show = false"
                content="请拨打服务热线反馈您的问题</br>服务时间：09:00～18:00"
            ></f-confirm>
            <f-confirm :show="show2" @on-close="show2 = false" @on-sure="show2 = false"
                ><p>请拨打服务热线反馈您的问题，服务时间：09:00～18:00</p></f-confirm
            >
            <f-confirm
                :show.sync="show1"
                @on-sure="show1 = false"
                content="请拨打服务热线反馈您的问题</br>服务时间：09:00～18:00"
            ></f-confirm>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show: false,
                show1: false,
                show2: false
            };
        },
        methods: {
            handle() {
                this.$fk.confirm.show({ content: '函数调用' });
            },
            handle1() {
                this.$fk.confirm.show({
                    content: '函数调用1',
                    cancelBtn: '取消哈',
                    sureBtn: '点击哈',
                    onCancel(val, hide) {
                        console.log(val);
                        hide();
                    },
                    onSure() {
                        console.log('干嘛');
                    }
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .wrap {
        width: 100%;
        margin: 16px;
    }
</style>
```
