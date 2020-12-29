import ConfirmComponent from '../../components/feedback/confirm.vue';

export default Vue => {
    let $vm;
    let cancel;
    let sure;
    const Confirm = Vue.extend(ConfirmComponent);

    if (!$vm) {
        $vm = new Confirm({
            el: document.createElement('div')
        });
        document.body.appendChild($vm.$el);
    }

    const confirm = {
        show({ content = '', cancelBtn, sureBtn, onCancel, onSure }) {
            cancel = onCancel;
            sure = onSure;

            // 组件数据初始化
            $vm.content = content;
            cancelBtn && ($vm._props.cancelBtn = cancelBtn);
            sureBtn && ($vm._props.sureBtn = sureBtn);

            $vm._props.show = true;
        },
        hide() {
            $vm._props.show = false;
            sure = cancel = null;
        }
    };

    // 手动注册组件抛出事件
    $vm.$on('on-close', val => {
        if (cancel && typeof cancel === 'function') {
            cancel(val, confirm.hide, $vm);
        } else {
            confirm.hide();
        }
    });
    $vm.$on('on-sure', () => {
        if (sure && typeof sure === 'function') {
            sure($vm);
        } else {
            confirm.hide();
        }
    });

    if (!Vue.$fk) {
        Vue.$fk = {
            confirm
        };
    } else {
        Vue.$fk.confirm = confirm;
    }

    Vue.mixin({
        created: function() {
            this.$fk = Vue.$fk;
        }
    });
};
