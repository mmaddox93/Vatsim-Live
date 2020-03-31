<template>
  <div class="toast-container">
    <transition name="slidevert">
      <div v-if="showToast" @click="toggleToast()" class="toast">
        <div class="emoji-cont">👋🏻</div>
        <div class="text-cont">
          <div class="toast-header">Welcome to the official VATSIM Map!</div>
          <div class="toast-body">Click on a feature to view more information about it</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'WelcomeToast',
  mounted() {
    document.addEventListener('click', () => this.showToast = false);
  },
  data() {
    return {
      showToast: true,
    };
  },
  methods: {
    toggleToast() {
      this.showToast = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.toast-container {
  z-index: 3;
  position: absolute;
  bottom: 0;
  width: 100vw;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toast {
  cursor: pointer;
  min-width: 600px;
  background-color: $secondary;
  color: white;
  padding: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  display: flex;
  align-items: center;
}

.emoji-cont {
  font-size: 2.5rem;
  padding-right: 1rem;
}

.toast-header {
  font-size: 120%;
  font-weight: 700;
}

.toast-body {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  color: #8a8a8a;
}

.slidevert-leave-active {
  animation: slide-out 200ms;
}

@keyframes slide-out {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(150%);
  }
}
</style>
