<template lang="pug">
  Modals(
    :active="error.isErrorActive"
    :isCanClose="error.isCanClose"
    @close="closeModal"
  )
    template(slot="header") {{ error.message }}
    template(slot="body") {{ error.txt }}
    template(slot="footer")
      button(
        v-if="error.isButton"
        class="btn btn-submit btn-block btn-sm"
        @click="onClickHandler"
      ) {{ error.buttonTxt }}
</template>

<script>
import Modals from '@/components/units/Modals';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Error_Modals',
  computed: {
    ...mapState('error', ['error']),
  },
  methods: {
    ...mapActions('error', ['closeModal', 'clickHandler']),
    onClickHandler() {
      this.clickHandler();
    },
  },
  components: {
    Modals,
  },
};
</script>
