<template lang="pug">
  div.modal.modal-sm(:class="{ 'active': active }")
    a.modal-overlay
    div.modal-container
      div.modal-header
        a.btn.btn-clear.float-right(
          v-if="isCanClose"
          @click="onClose"
        )
        div.modal-title.h4.text-center
          slot(name="header")
      div.modal-body
        div.content.text(:class="modalContentClass")
          slot(name="body")
      div.modal-footer
        slot(name="footer")
</template>

<script>

export default {
  name: 'Modals',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    isCanClose: {
      type: Boolean,
      default: true,
    },
    isOverlayClose: {
      type: Boolean,
      default: true,
    },
    contentTextAlign: {
      type: String,
      default: 'center',
    },
  },
  computed: {
    modalContentClass() {
      return {
        [`text-${this.contentTextAlign}`]: true,
      };
    },
  },
  methods: {
    onOverlayClose() {
      if (this.isOverlayClose) {
        this.$emit('close');
      }
    },
    onClose() {
      if (this.isCanClose) {
        this.$emit('close');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.modal {
  &-overlay {
    background: rgba(4,4, 15, 0.4) !important;
  }
  &-container {
    max-height: 55vh;
  }
}

</style>
