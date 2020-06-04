<template>
  <div class="login">
    <div class="dots"></div>
    <div class="dots dots-lower"></div>
    <div class="center flex-col">
      <div class="login__title bold">Sign in to VATSIM Developer Portal</div>
      <ButtonRound @click.native="login" text="Sign in with VATSIM Connect" />
    </div>
    <router-link to="/" class="back">
      <ArrowLeftIcon class="back__icon" />
      <div class="back__text bold">Didn't mean to go here?</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ButtonRound from '@/components/DefaultElements/ButtonRound.vue';
import { ArrowLeftIcon } from 'vue-feather-icons';

export default Vue.extend({
  name: 'DevLogin',
  components: { ButtonRound, ArrowLeftIcon },
  methods: {
    login() {
      setTimeout(() => { this.$router.push('/developer/sector'); }, 500);
    },
  },
});
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login__title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;

  @media (max-width: 600px) {
    text-align: center;
    font-size: 1.25rem;
  }
}

.dots {
  top: 0;
  left: 0;
  position: absolute;
  height: 140px;
  width: 140px;
  background: radial-gradient(var(--white) 1px, transparent 1px);
  background-size: 16px 16px;

  @media (max-width: 600px) {
    display: none;
  }
}

.dots-lower {
  top: auto;
  left: auto;
  bottom: 0px;
  right: 0px;
}

.back {
  cursor: pointer;
  position: absolute;
  bottom: 2rem;
  left: 1.5rem;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    top: 2rem;
    bottom: auto;
  }
}

.back__icon {
  margin-right: 0.5rem;
  stroke: var(--grey);
}
</style>
