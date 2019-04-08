<template lang="pug">
  .phonecode-view
    StepBar(:step=2)
    |signup
</template>

<script>
import StepBar from '@/components/containers/StepBar';

export default {
  name: 'phonecodeSignup',
  components: {
    StepBar,
  },
};
</script>
