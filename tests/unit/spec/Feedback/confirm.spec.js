import { mount } from '@vue/test-utils';
import Confirm from 'main/components/base/confirm.vue';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('confirm', () => {
    it('渲染确认框组件', () => {
        const wrapper = mount(Confirm);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
