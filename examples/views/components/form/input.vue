<template>
    <div class="pg-component-input">
        <div class="content-block">
            <div class="fs14 title">常规</div>
            <f-input v-model="value" placeholder="v-model"></f-input>
            <f-input :value="value1" @change="change" placeholder=":value"></f-input>
            <div class="fs14 title">带属性</div>
            <f-input v-model="value2" label="姓名" placeholder="请输入姓名"></f-input>
            <f-input v-model="value1" label="姓名" disabled placeholder="disabled" @click="show = true"></f-input>
            <f-modal :show="show" @close="show = false">
                <div style="text-align: center;line-height: 100px">干嘛？</div>
            </f-modal>
            <div class="fs14 title">多行输入框</div>
            <f-input label="textarea" type="textarea" v-model="value3" placeholder="常规"></f-input>
            <f-input label="textarea" type="textarea" v-model="value4" rows="1" maxlength="10" placeholder="输入框自定义属性"></f-input>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: '',
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            show: false
        };
    },
    methods: {
        change(v) {
            this.value1 = v;
        },
        click() {}
    }
};
</script>
<style lang="less" scoped>
.pg-component-input {
    background: #f2f3f5;
    min-height: 100vh;
    padding-bottom: 40px;

    .title {
        margin: 20px;
    }

    .content-block {
        margin: 0;
    }
}
</style>
