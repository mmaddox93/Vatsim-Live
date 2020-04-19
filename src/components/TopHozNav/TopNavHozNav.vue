<template>
  <div class="hoz-nav flex-row" v-click-outside="clickOutsideClose">
    <div class="nav-item">
      <div class="nav-item-content">I</div>
    </div>
    <div class="nav-item">
      <div class="nav-item-content">I</div>
    </div>
    <div class="nav-item">
      <div @click="dropped = !dropped" class="nav-item-content">I</div>
      <div v-if="dropped" class="dropdown">
        <transition name="first-slide">
          <div key="main" v-if="activeMenu === 'main'" class="dropdown-option">
            <div @click="activeMenu = 'settings'" class="dropdown-item">Settings</div>
            <div @click="activeMenu = 'map'" class="dropdown-item">Map Options</div>
            <div class="dropdown-item">My Profile</div>
          </div>
        </transition>
        <transition name="second-slide">
          <div key="settings" v-if="activeMenu === 'settings'" class="dropdown-option">
            <div @click="activeMenu = 'main'" class="dropdown-item">back</div>
            <div class="dropdown-item">username</div>
            <div class="dropdown-item">map theme</div>
            <div class="dropdown-item">stats</div>
          </div>
        </transition>
        <transition name="second-slide">
          <div key="map" v-if="activeMenu === 'map'" class="dropdown-option">
            <div @click="activeMenu = 'main'" class="dropdown-item">back</div>
            <div class="dropdown-item">sigmets</div>
            <div class="dropdown-item">aicraft labels</div>
            <div class="dropdown-item">weather radar</div>
            <div class="dropdown-item">weather radar</div>
            <div class="dropdown-item">weather radar</div>
            <div class="dropdown-item">weather radar</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from '@/Directives/clickOutside';

export default {
  directives: { ClickOutside },
  data() {
    return {
      activeMenu: 'main',
      dropped: true,
    };
  },
  methods: {
    clickOutsideClose() {
      this.dropped = false;
    },
  },
};

</script>

<style lang="scss" scoped>
.hoz-nav {
  display: flex;
  justify-content: center;
}

.nav-item {
  margin: 0 0.25rem;
}

.nav-item-content {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  background-color: var(--tertiary);
  border-radius: 50%;
  padding: 1rem;
  transition: all 100ms linear;

  &:hover {
    filter: brightness(1.2);
  }
}

.dropdown {
  display: flex;
  position: absolute;
  top: 50px;
  width: 300px;
  transform: translateX(-95%);
  background-color: var(--secondary);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 1rem;
  overflow: hidden;
  transition: height var(--speed) ease;
  --animationSpeed: 100ms;
  --animationType: ease-in-out;
}

.dropdown-option {
  width: 300px;
}

.dropdown-item {
  width: calc(300px - 2rem);
  padding: 1rem;
  transition: all 75ms linear;
  cursor: pointer;
  border-radius: 7px;

  &:hover {
    background-color: var(--secondaryHov);
  }
}

.first-slide-enter {
  opacity: 0;
  transform: translatex(-100%);
  transition: all var(--animationSpeed) var(--animationType);
}
.first-slide-enter-to {
  opacity: 1;
  transform: translatex(0);
  transition: all var(--animationSpeed) var(--animationType);
}
.first-slide-leave-to {
  opacity: 0;
  transform: translatex(-100%);
  transition: all var(--animationSpeed) var(--animationType);
}

.second-slide-enter {
  opacity: 0;
  transform: translatex(0);
  transition: all var(--animationSpeed) var(--animationType);
}
.second-slide-enter-to {
  opacity: 1;
  transform: translatex(-100%);
  transition: all var(--animationSpeed) var(--animationType);
}
.second-slide-leave-to {
  opacity: 0;
  transform: translatex(0);
  transition: all var(--animationSpeed) var(--animationType);
}
.second-slide-leave {
  transform: translatex(-100%);
}
</style>
