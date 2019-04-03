<template lang="pug">
  .agreement-view
    StepBar(:step=1)
    Agreement
</template>

<script>
import StepBar from '@/components/containers/StepBar';
import Agreement from '@/components/containers/user/Agreement';

export default {
  name: 'IntroductionIndex',
  components: {
    StepBar,
    Agreement,
  },
};
</script>
