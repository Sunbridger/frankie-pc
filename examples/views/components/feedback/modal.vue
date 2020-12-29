<template>
    <div class="pg-component-modal">
        <div class="content-block mt20">
            <div class="block-title fs18 pb16">Modal</div>
            <div>
                <f-button
                    type="default"
                    @click="modalShow = true"
                    style="width: 120px;height:36px;"
                    class="mr16 mb16"
                >Modal Center</f-button>
                <f-button
                    type="default"
                    @click="modalShow2 = true"
                    class="mr16 mb16"
                    style="width: 130px;height:36px;"
                >Modal Bottom</f-button>
                <f-button
                    type="default"
                    @click="modalShow3 = true"
                    class="mr16 mb16"
                    style="width: 130px;height:36px;"
                >Modal top</f-button>
            </div>
            <f-modal @close="modalShow = false" :show="modalShow"></f-modal>
            <f-modal @close="modalShow2 = false" placement="bottom" :show="modalShow2"></f-modal>
            <f-modal @close="modalShow3 = false" placement="top" :show="modalShow3"></f-modal>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modalShow: false,
            modalShow2: false,
            modalShow3: false
        };
    }
};
</script>
