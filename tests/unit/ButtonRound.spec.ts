import ButtonRound from '@/components/DefaultElements/ButtonRound.vue';
import { shallowMount } from '@vue/test-utils';

const wrapper = shallowMount(ButtonRound, {
  propsData: {
    text: 'Sample Value',
    customClass: 'sample__class',
  },
});

describe('ButtonRound', () => {
  it('Renders a text prop passed to it', () => {
    expect(wrapper.find('span').text()).toBe('Sample Value');
  });

  it('Attaches a passed class to the button', () => {
    expect(wrapper.find('button').classes()).toContain('sample__class');
  });
});
