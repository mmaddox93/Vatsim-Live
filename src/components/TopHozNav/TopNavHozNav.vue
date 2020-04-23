<template>
  <div class="hoz-nav" v-click-outside="clickOutsideClose">
    <div class="nav-item">
      <div @click="toggle()" class="nav-item-content">
        <svg height="512" width="512" viewBox="0 0 320 512" class="dropdown-icon">
          <path
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          />
        </svg>
      </div>
      <div v-if="dropped" class="dropdown" ref="dropdown">
        <transition name="first-slide">
          <div ref="main" v-if="activeMenu === 'main'" class="dropdown-option">
            <div class="dropdown-item pointer" @click="activeMenu = 'map'">
              <div class="item-left">
                <div class="item-left-icon">
                  <inline-svg class="item-icon" :src="require('../../assets/img/svg/Map.svg')" />
                </div>
                <div>Map Options</div>
              </div>
              <inline-svg
                class="item-icon large"
                :src="require('./svg/chevron-forward-outline.svg')"
              />
            </div>
            <div class="dropdown-item">
              <div class="item-left">
                <div class="item-left-icon">
                  <inline-svg class="item-icon" :src="require('./svg/moon.svg')" />
                </div>
                <div>Dark Mode</div>
              </div>
              <toggle-button
                @change="changeMode"
                v-model="options.darkMode"
                color="#50fa7b"
                :sync="false"
                :labels="false"
                :height="28"
              />
            </div>
          </div>
        </transition>
        <transition name="second-slide">
          <div ref="map" v-if="activeMenu === 'map'" class="dropdown-option">
            <div @click="activeMenu = 'main'" class="dropdown-item header pointer">
              <div class="item-left">
                <div class="item-left-icon">
                  <inline-svg class="item-icon" :src="require('./svg/back.svg')" />
                </div>
                <div>Map Options</div>
              </div>
            </div>
            <div class="dropdown-item">
              <div class="item-left">
                <div class="item-left-icon">
                  <inline-svg class="item-icon" :src="require('./svg/cube.svg')" />
                </div>
                <div>Show SIGMETs</div>
              </div>
              <toggle-button
                v-model="options.map.sigmets"
                color="#50fa7b"
                :sync="true"
                :labels="false"
                :height="28"
              />
            </div>
            <div class="dropdown-item">
              <div class="item-left">
                <div class="item-left-icon">
                  <inline-svg class="item-icon" :src="require('./svg/tag.svg')" />
                </div>
                <div>Show Aircraft Labels</div>
              </div>
              <toggle-button
                v-model="options.map.labels"
                color="#50fa7b"
                :sync="false"
                :labels="false"
                :height="28"
              />
            </div>
            <div class="dropdown-item">
              <div class="item-left">
                <div class="item-left-icon">
                  <inline-svg class="item-icon" :src="require('../../assets/img/svg/Weather.svg')" />
                </div>
                <div>Show Rainfall Radar</div>
              </div>
              <toggle-button
                v-model="options.map.weather"
                color="#50fa7b"
                :sync="false"
                :labels="false"
                :height="28"
              />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from '@/directives/clickOutside';
import InlineSvg from 'vue-inline-svg';
import { ToggleButton } from 'vue-js-toggle-button';

export default {
  components: { InlineSvg, ToggleButton },
  directives: { ClickOutside },
  data() {
    return {
      activeMenu: 'main',
      dropped: false,
      options: {},
    };
  },
  created() {
    this.options = { ...this.$store.state.options };
  },
  methods: {
    clickOutsideClose() {
      this.activeMenu = 'main';
      this.dropped = false;
    },
    toggle() {
      if (!this.dropped) this.dropped = true;
      else this.clickOutsideClose();
    },
    changeMode() {
      this.$root.$emit('changeMode');
    },
  },
  watch: {
    options: {
      handler(newVal) {
        this.$store.commit('SET_OPTIONS', newVal);
      },
      deep: true,
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  height: 20px;
  width: 20px;
  fill: #fff;
  stroke: #fff;
}

.nav-item-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--tertiary);
  border-radius: 50%;
  height: 40px;
  width: 40px;
  transition: all 100ms linear;

  &:hover {
    filter: brightness(1.2);

    @media screen and (prefers-color-scheme: light) {
      filter: brightness(0.95);
    }
  }
}

.dropdown {
  display: flex;
  position: absolute;
  top: 55px;
  width: 300px;
  transform: translateX(-50%);
  background-color: var(--secondary);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 0.5rem;
  overflow: hidden;
  --animationSpeed: 200ms;
  --animationType: ease-in-out;
}

.dropdown-icon {
  height: 75%;
}

.dropdown-option {
  width: 300px;

  .header {
    font-size: 1.1rem;
    font-weight: 800;
  }
}

.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(300px - 1.125rem);
  padding: 1rem 0.75rem;
  transition: all 75ms linear;
  border-radius: 7px;

  &:hover {
    background-color: var(--secondaryHov);
  }

  &:active {
    background-color: var(--secondaryAct);
  }

  .item-left {
    display: flex;
    align-items: center;
  }

  .item-left-icon {
    margin-right: 0.5rem;
    background-color: var(--tertiary);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
  }

  .item-icon {
    height: 1.25rem;
    width: auto;
  }

  .large {
    height: 1.5rem;
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

<style lang="scss">
.dropdown-icon,
.item-icon > path,
.dropdown-icon,
.item-icon > ellipse,
.dropdown-icon,
.item-icon > line,
.dropdown-icon,
.item-icon > polyline {
  stroke: var(--lighter) !important;
  fill: var(--lighter);
}
</style>
