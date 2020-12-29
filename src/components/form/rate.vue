<template>
    <div class="f-rate">
        <img class="mr8" v-for="(v, key) in sourceArr(score)" @click="change(key, true)" :key="key + 'h'" src="@/assets/icons/star.png" />
        <img class="mr8" v-for="(v, key) in sourceArr(5 - score)" @click="change(key, false)" :key="key + 'k'" src="@/assets/icons/star-no.png" />
    </div>
</template>

<script>
export default {
    name: 'FRate',
    props: {
        score: {
            type: Number,
            default: 0
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        sourceArr(len) {
            return new Array(len);
        },
        /**
         * value 选中的值
         * choose 选的类型
         */
        change(value, choose) {
            if (this.disabled) return;
            let chooseValue = value + 1;
            let cValue = choose ? chooseValue : this.score + chooseValue;
            this.$emit('change', cValue);
        }
    }
};
</script>
<style lang="less">
.f-rate {
    img {
        width: 16px;
        height: 16px;
    }
}
</style>
