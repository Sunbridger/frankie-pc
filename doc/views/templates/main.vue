<style lang="less">
.pg-templates-main {
    .main-wrapper {
        padding: 32px;
    }
}
</style>

<template>
    <vue-scrollbar
        class="pg-templates-main flex flex-column"
        ref="scrollbar">
        <div class="main-wrapper flex1">
            <transition name="doc-fade" mode="out-in">
                <router-view @transitionend.native="scrollbarUpdate($refs.scrollbar)"></router-view>
            </transition>
        </div>
        <co-footer></co-footer>
    </vue-scrollbar>
</template>

<script>
import CoFooter from 'components/common/footer';
import scrollbarMixin from 'doc/core/mixins/scrollbar';

export default {
    mixins: [scrollbarMixin],
    components: {
        CoFooter
    }
};
</script>
