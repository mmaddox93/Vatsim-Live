<template>
  <div class="sidebar-manager">
    <transition name="slide">
      <SideBar v-on:closeSidebar="closeSidebar" v-if="sidebarContent" :content="sidebarContent" />
    </transition>
  </div>
</template>

<script>
import SideBar from '@/components/SideBarComponents/SideBar.vue';

export default {
  components: {
    SideBar,
  },
  computed: {
    sidebarContent() {
      return this.$store.state.sidebarContent;
    },
  },
  methods: {
    closeSidebar() {
      this.$store.commit('setSideBarContent', null);
      this.$store.commit('setTrailLayer', null);
    },
  },
};
</script>

<style lang="scss">
.sidebar-manager {
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

.slide-enter-active {
  animation: slide-in 300ms;
}

.slide-leave-active {
  animation: slide-out 300ms;
}

@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slide-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
