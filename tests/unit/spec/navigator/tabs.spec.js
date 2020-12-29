import { mount } from '@vue/test-utils';
import Tabs from 'main/components/base/tabs.vue';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('tabs', () => {
    it('渲染标签页组件', () => {
        const wrapper = mount(Tabs);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
