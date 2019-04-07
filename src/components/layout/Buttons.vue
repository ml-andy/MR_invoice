<template lang="pug">
  main
    h1.text-dark 按鈕
    h3.text-primary 隨佈局改變寬度的按鈕
    div.columns
      button(
        class="btn btn-submit column col-12"
        type="submit"
      ) Submit 按鈕
</template>

<script>

export default {
  name: 'Layout_Buttons',
  data() {
    return {};
  },
  computed: {},
  components: {},
};
</script>
