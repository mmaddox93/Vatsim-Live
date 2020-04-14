<template>
  <div class="NavList">
    <div ref="header" @click="toggleNav()" :class="{ 'no-border': showNav }" class="list-header">
      <div class="header-name-cont">
        <inline-svg
          class="route-icon icon active-icon"
          :src="require(`../assets/img/svg/${currentRouteIcon}.svg`)"
        ></inline-svg>
        {{currentRouteIcon}}
      </div>
      <svg
        class="nav-icon icon"
        xmlns="http://www.w3.org/2000/svg"
        width="512"
        height="512"
        viewBox="0 0 512 512"
      >
        <path
          class="nav-path"
          d="M98,190.06,237.78,353.18a24,24,0,0,0,36.44,0L414,190.06c13.34-15.57,2.28-39.62-18.22-39.62H116.18C95.68,150.44,84.62,174.49,98,190.06Z"
        />
      </svg>
    </div>
    <div v-show="showNav" class="routes">
      <router-link to="/">
        <div @click="toggleNav()" class="route">
          <inline-svg class="route-icon icon" :src="require('../assets/img/svg/Map.svg')"></inline-svg>Map
        </div>
      </router-link>
      <router-link to="/data">
        <div @click="toggleNav()" class="route">
          <inline-svg class="route-icon icon" :src="require('../assets/img/svg/Data.svg')"></inline-svg>Data
        </div>
      </router-link>
      <router-link to="/weather">
        <div @click="toggleNav()" class="route">
          <inline-svg class="route-icon icon" :src="require('../assets/img/svg/Weather.svg')"></inline-svg>Weather/ATIS
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import InlineSvg from 'vue-inline-svg';

export default {
  components: { InlineSvg },
  data() {
    return {
      showNav: false,
    };
  },
  mounted() {
    document.addEventListener('click', this.hideNav);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideNav);
  },
  computed: {
    currentRouteIcon() {
      switch (this.$route.name) {
        case 'Statistics':
          return 'Data';
        case 'Pilots':
          return 'Data';
        case 'Controllers':
          return 'Data';
        default:
          return this.$route.name;
      }
    },
  },
  methods: {
    toggleNav() {
      this.$store.commit('setSideBarContent', null);
      this.showNav = !this.showNav;
      if (!this.showNav) this.$refs.header.blur();
    },
    hideNav(e) {
      if (!this.$el.contains(e.target)) {
        this.showNav = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.NavList {
  width: 20%;
  min-width: 200px;
  max-width: 300px;
  position: relative;
  z-index: 5;

  @media screen and (max-width: 400px) {
    width: 100%;
    max-width: 0;
  }
}

.list-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border: 1px solid #343536;
  border-radius: 4px;
  width: auto;
  height: 100%;
  z-index: 5;
}

.header-name-cont {
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-border {
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid transparent;
}

.routes {
  z-index: 7;
  background-color: var(--secondary);
  position: absolute;
  box-sizing: border-box;
  border: 1px solid #343536;
  border-top: none;
  width: 100%;
  border-radius: 0 0 4px 4px;
  padding-bottom: 1rem;
}

.route {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;

  &:hover {
    background-color: #272729;
  }
}

.disabled {
  cursor: not-allowed;
}

.route-icon {
  stroke: #fff;
  fill: #fff;
  height: 1rem;
  margin-right: 0.5rem;
}

.nav-icon {
  height: 1rem;
}

.nav-path {
  stroke: #343536;
  fill: #343536;
}

.icon {
  width: auto;
}

.route-path {
  stroke: #fff;
  fill: #fff;
}
</style>

<style lang="scss">
.active-icon > path,
.active-icon > ellipse,
.active-icon > line {
  stroke: var(--highlight);
  fill: var(--highlight);
}
</style>
