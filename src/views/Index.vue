<template lang="pug">
  #layout
    aside.layout-aside
      LayoutSidebar
    .wraper
      main.content
        .content__inner
          router-view
</template>

<script>
import LayoutSidebar from '@/components/containers/LayoutSidebar';

export default {
  name: 'Layout_Index',
  components: {
    LayoutSidebar,
  },
};
</script>

<style>
body {
  background-color: #ffffff;
  margin: 0;
}
</style>

<style lang="scss" scoped>
#layout {
  box-sizing: border-box;
}

.layout-aside {
  overflow: auto;
  position: fixed;
  box-sizing: border-box;
  width: convertUnit(224);
  height: 100vh;
  z-index: 2;
  background-color: #f7f8f9;
}

.wraper {
  width: 100%;
  box-sizing: border-box;
  padding-left: convertUnit(224);
}

.content {
  padding: convertUnit(15);
  display: block;
  &__inner {
    background-color: #ffffff;
    min-height: calc(100vh - convertUnit(168));
    padding: convertUnit(10);
  }
}

</style>
