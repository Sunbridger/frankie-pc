import toast from './toast';
import confirm from './confirm';

export default Vue => {
    Vue.use(toast);
    Vue.use(confirm);
};
