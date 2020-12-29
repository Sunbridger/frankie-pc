import ToastComponent from '../../components/feedback/toast.vue';

let $vm;
let watcher;

const plugin = {
    install(Vue) {
        const Toast = Vue.extend(ToastComponent);

        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            });
            document.body.appendChild($vm.$el);
        }

        const defaults = {};
        for (let i in $vm.$options.props) {
            if (i !== 'value') {
                defaults[i] = $vm.$options.props[i].default;
            }
        }

        const toast = {
            show({ time = 2000, position = 'middle', text, onShow, onHide }) {
                if (!text) return;
                watcher && watcher();

                watcher = $vm.$watch('show', val => {
                    if (val) {
                        typeof onShow === 'function' && onShow(val);
                    } else {
                        typeof onHide === 'function' && onHide(val);
                    }
                });

                $vm.show = true;
                $vm.position = position;
                $vm.time = time;
                $vm.text = text;
            },
            hide() {
                $vm.show = false;
            }
        };

        if (!Vue.$fk) {
            Vue.$fk = {
                toast
            };
        } else {
            Vue.$fk.toast = toast;
        }

        Vue.mixin({
            created: function() {
                this.$fk = Vue.$fk;
            },
            beforeDestroy() {
                watcher && watcher();
            }
        });
    }
};

export default plugin;
export const install = plugin.install;
