import WelcomeToast from '../src/components/WelcomeToast.vue';

export default {
  title: 'Welcome Toast',
  component: WelcomeToast,
};

export const Text = () => ({
  components: { WelcomeToast },
  template: '<WelcomeToast />',
});
