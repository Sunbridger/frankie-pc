<template>
    <div class="pg-component-tag-close">
        <div>
            <p>点击可删除</p>
            <div class="co-current-filter-tags pt12 pl16 pr16 pb4 flex flex-justify-between">
                <f-tag-close filter-type="prepaidAmountRange" @delete-filter="deleteFilter" key="prepaidAmountRange" v-if="filterName.prepaidAmountRange">
                    {{ filterName.prepaidAmountRange }}
                </f-tag-close>
                <f-tag-close filter-type="prepaidAmountRange2" @delete-filter="deleteFilter" key="prepaidAmountRange2" v-if="filterName.prepaidAmountRange2">
                    {{ filterName.prepaidAmountRange2 }}
                </f-tag-close>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filterName: {
                prepaidAmountRange: '0-10000',
                prepaidAmountRange2: '0-10000'
            }
        };
    },
    methods: {
        // 删除某一项条件
        deleteFilter(type, value) {
            console.log(type, value);
        }
    }
};
</script>
