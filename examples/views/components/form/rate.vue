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
