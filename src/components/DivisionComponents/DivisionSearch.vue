<template>
  <div class="search">
    <div class="search__content">
      <div class="search__top">
        <div class="search__title bold">Recent</div>
        <ButtonRound customClass="button-rounded" text="New">
          <PlusIcon size="18" />
        </ButtonRound>
      </div>
      <div class="search__inputs">
        <SearchIcon size="20" class="search__icon" />
        <input v-model="search" placeholder="Search 9 recent files" class="search__input" />
      </div>
      <div class="search__items">
        <DivisionItem v-for="item in recent" :item="item" :key="item.name" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ButtonRound from '@/components/DefaultElements/ButtonRound.vue';
import DivisionItem from '@/components/DivisionComponents/DivisionItem.vue';
import { PlusIcon, SearchIcon } from 'vue-feather-icons';

export default Vue.extend({
  name: 'DivisionSearch',
  components: {
    ButtonRound, DivisionItem, PlusIcon, SearchIcon,
  },
  data() {
    return {
      search: '',
      recent: [
        {
          name: 'Shannon Control - Bandbox', acc: 'VATEIR', type: 'Sector', lastEdit: 'Edited 5 minutes ago',
        },
        {
          name: 'Dublin Control - Upper North', acc: 'VATEIR', type: 'Sector', lastEdit: 'Edited 5 minutes ago',
        },
        {
          name: 'EIDW_APP', acc: 'VATEIR', type: 'Position', lastEdit: 'Edited 5 minutes ago',
        },
        {
          name: 'Dublin Tower', acc: 'VATEIR', type: 'Sector', lastEdit: 'Edited 5 minutes ago',
        },
        {
          name: 'Cork Approach', acc: 'VATEIR', type: 'Sector', lastEdit: 'Edited 5 minutes ago',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.search__content {
  width: 100%;
  max-width: 800px;
}

.search__top {
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search__title {
  font-size: 25px;
}

.search__icon {
  color: var(--grey);
}

.search__inputs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--divider);
  padding-bottom: 1.5rem;
}

.search__input {
  margin-left: 0.5rem;
  border: none;
  outline: none;
  background-color: inherit;
  font-family: inherit;
  font-size: 15px;
  color: var(--white);

  &::placeholder {
    color: var(--grey);
  }

  &:focus {
    &::placeholder {
      color: var(--white);
    }
  }
}

.search__items {
  margin-top: 2rem;
}

.button-rounded {
  width: 100px;
  height: 40px;
  min-height: auto;
  border-radius: 50px;
}
</style>
