import { mount } from '@vue/test-utils';
import Empty from 'main/components/base/empty.vue';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('empty', () => {
    it('渲染空状态组件', () => {
        const wrapper = mount(Empty);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
