<template lang="pug">
  section.page-container
    .wraper
      button(
        class="btn btn-submit btn-lg"
        @click="onOpenModals"
      ) Open Modals
      Modals(
        :active="isModalsActive"
        @close="onCloseModals"
      )
        template(slot="header") This is title
        template(slot="body") bodybodybodybodybodybody
        template(slot="footer")
          button(
            class="btn btn-submit btn-block btn-lg"
            @click="onClickHandler"
          ) 按鈕
</template>

<script>
import Modals from '@/components/units/Modals';

export default {
  name: 'Layout_Modals',
  data() {
    return {
      isModalsActive: false,
    };
  },
  methods: {
    onOpenModals() {
      this.isModalsActive = true;
    },
    onCloseModals() {
      this.isModalsActive = false;
    },
    onClickHandler() {
      console.log('onClickHandler');
    },
  },
  components: {
    Modals,
  },
};
</script>
