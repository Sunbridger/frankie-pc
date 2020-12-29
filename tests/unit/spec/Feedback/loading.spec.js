import { mount } from '@vue/test-utils';
import Loading from 'main/components/base/loading.vue';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('loading', () => {
    it('渲染加载器组件', () => {
        const wrapper = mount(Loading);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
