<template>
  <div class="sidebar">
    <div class="sidebar__top">
      <div class="sidebar__back align-center">
        <ArrowLeftIcon class="sidebar__arrow pointer" size="18" />
        <span class="bold small pointer">Back to Dashboard</span>
      </div>
      <div class="sidebar__content">
        <div class="sidebar__title bold big">Sector Editor</div>
        <div class="sidebar__info card">
          <div class="sidebar__input__cont">
            <input
              :style="{width: (sectorDescription.length + 1) + 'ch'}"
              v-model="sectorDescription"
              placeholder="Sector Description"
              class="edit__input bold"
              :class="{ 'edit__input-empty': sectorDescription.length === 0}"
            />
          </div>
        </div>
        <div class="sidebar__limits card">
          <div class="sidebar__card__title bold">Vertical Limits</div>
          <div class="sidebar__limit">
            <span class="sidebar__limit__text">
              Lower Limit:
              <span class="bold">{{toFlightLevel(lowerLimit)}}</span>
            </span>
            <vue-slider
              v-model="lowerLimit"
              :min="0"
              :max="60000"
              :interval="500"
              :tooltip-formatter="toFlightLevel"
            ></vue-slider>
          </div>
          <div class="divider"></div>
          <div class="sidebar__limit">
            <span class="sidebar__limit__text">
              Upper Limit:
              <span class="bold">{{toFlightLevel(upperLimit)}}</span>
            </span>
            <vue-slider
              v-model="upperLimit"
              :min="0"
              :max="60000"
              :interval="500"
              :tooltip-formatter="toFlightLevel"
            ></vue-slider>
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar__bottom">
      <ButtonRound class="sidebar__button" text="Save Sector" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueSlider from 'vue-slider-component';
import ButtonRound from '@/components/DefaultElements/ButtonRound.vue';
import { ArrowLeftIcon } from 'vue-feather-icons';
import 'vue-slider-component/theme/default.css';

export default Vue.extend({
  name: 'EditorSidebar',
  components: { ArrowLeftIcon, VueSlider, ButtonRound },
  data() {
    return {
      lowerLimit: 0,
      upperLimit: 0,
      sectorDescription: 'Shannon Control Bandbox',
    };
  },
  methods: {
    toFlightLevel(altitude: number): string {
      if (altitude === 0) {
        return 'SFC';
      }
      const alt = altitude.toString();
      if (alt.length === 4) {
        return `FL0${alt[0]}${alt[1]}`;
      } if (alt.length === 5) {
        return `FL${alt[0]}${alt[1]}${alt[2]}`;
      }
      return `${alt}ft`;
    },
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--secondary);
  width: 350px;
  height: 100%;
  padding: 1rem 1.875rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar__arrow {
  stroke: var(--grey);
  margin-right: 0.25rem;
}

.sidebar__title {
  margin-bottom: 1rem;
}

.sidebar__content {
  margin-top: 1.25rem;
}

.sidebar__limits {
  margin-top: 1rem;
}

.sidebar__card__title {
  padding-bottom: 0.5rem;
}

.sidebar__button {
  width: 100%;
  border-radius: 10px;
}
</style>

<style lang="scss">
.vue-slider {
  padding-top: 0.75rem !important;
}

.vue-slider-process {
  background-color: var(--highlightBlue);
}

.vue-slider-dot-tooltip-inner {
  border-color: var(--highlightBlue);
  background-color: var(--highlightBlue);
}
</style>
