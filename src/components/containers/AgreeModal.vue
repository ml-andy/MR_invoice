<template lang="pug">
  Modals(
    :active="!isAgree"
    :isCanClose="false"
    :contentTextAlign="'left'"
  )
    template(slot="header") {{ agreementHeader }}
    template(slot="body") {{ agreementBody }}
    template(slot="footer")
      button(
        class="btn btn-submit btn-block btn-lg"
        @click="onClickHandler"
      ) 我知道了
</template>

<script>
import Modals from '@/components/units/Modals';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Agree_Modal',
  computed: {
    ...mapState({
      agreementHeader: state => state.app.thirdParty.agreement.header,
      agreementBody: state => state.app.thirdParty.agreement.body,
      isAgree: state => state.app.isAgree,
    }),
  },
  methods: {
    ...mapActions('app', ['editAgreement']),
    onClickHandler() {
      this.editAgreement();
    },
  },
  components: {
    Modals,
  },
};
</script>
