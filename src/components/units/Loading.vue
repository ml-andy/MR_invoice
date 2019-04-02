<template lang="pug">
    .loading-circular
      .loading-circular__spinner
      span.loading-circular__text
</template>

<script>

export default {
  name: 'Loading',
  data() {
    return {};
  },
  computed: {},
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

  @keyframes loading {
    0%{
      -webkit-transform:rotate(0deg);
      transform:rotate(0deg)
    }
    100%{
      -webkit-transform:rotate(1turn);
      transform:rotate(1turn)
    }
  }

  .loading-circular {
    box-sizing: border-box;
    text-align: center;
    padding: convertUnit(12);
    width: 100%;
    &__spinner {
      -webkit-animation: rotate 1s linear infinite;
      animation: loading 1s linear infinite;
      border: convertUnit(1.3) solid #009b4a;
      border-radius: 50%;
      border-right-color: transparent;
      border-top-color: transparent;
      height: convertUnit(13);
      width: convertUnit(13);
      display: inline-block;
      vertical-align: middle;
    }
    &__text {
      color: #464646;
      font-size: convertUnit(15);
      padding: 0 convertUnit(8);
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
