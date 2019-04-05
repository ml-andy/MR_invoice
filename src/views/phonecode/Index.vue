<template lang="pug">
  .phonecode-view
    StepBar(:step=2)
    Phonecode
</template>

<script>
import StepBar from '@/components/containers/StepBar';
import Phonecode from '@/components/containers/phonecode/Index';

export default {
  name: 'phonecodeIndex',
  components: {
    StepBar,
    Phonecode,
  },
};
</script>
