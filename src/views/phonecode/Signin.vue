<template lang="pug">
  .phonecode-view
    StepBar(:step=2)
    |signin
</template>

<script>
import StepBar from '@/components/containers/StepBar';

export default {
  name: 'phonecodeSignin',
  components: {
    StepBar,
  },
};
</script>
