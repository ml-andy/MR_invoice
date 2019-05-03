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
import { sendMixpanel } from '@/helpers/unit';

export default {
  name: 'Error_Modals',
  computed: {
    ...mapState('error', ['error']),
  },
  methods: {
    ...mapActions('error', ['closeModal', 'clickHandler']),
    onClickHandler() {
      sendMixpanel('eReceipt_query_fail_confirm', {
        tag: this.error.buttonTxt,
      });
      this.clickHandler();
    },
  },
  components: {
    Modals,
  },
  watch: {
    error: {
      handler() {
        if (!this.error.isErrorActive) return;
        sendMixpanel('eReceipt_query_fail', {
          tag: this.error.message,
        });
      },
      deep: true,
    },
  },
};
</script>
