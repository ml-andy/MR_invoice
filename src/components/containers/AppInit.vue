<template lang="pug">
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App_init',
  mounted() {
    this.appInit();
  },
  methods: {
    ...mapActions('app', ['appInit']),
  },
};
</script>
