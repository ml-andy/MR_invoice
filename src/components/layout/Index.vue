<template lang="pug">
  main
    h1.text-dark 共用樣式
    div
      h3.text-primary Headings
      h1 H1 Heading
      h2 H2 Heading
      h3 H3 Heading
      h4 H4 Heading
      h5 H5 Heading
    div
      h3.text-primary Text Colors
      div.text.text-primary primary
      div.text.text-dark dark
      div.text.text-gray gray
    div
      h3.text-primary Bg Colors
      div.shape.bg-gray gray
</template>

<script>

export default {
  name: 'Layout_Index',
  data() {
    return {};
  },
  computed: {},
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

  .shape {
    width: convertUnit(68);
    height: convertUnit(68);
    display: inline-block;
    text-align: center;
    line-height: convertUnit(68);
    margin: 0 convertUnit(7) 0 convertUnit(7);
  }
</style>
