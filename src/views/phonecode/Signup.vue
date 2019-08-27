<template lang="pug">
  .phonecode-view
    StepBar(:step=2)
    PhonecodeSignup
</template>

<script>
import StepBar from '@/components/containers/StepBar';
import PhonecodeSignup from '@/components/containers/phonecode/Signup';

export default {
  name: 'phonecodeSignup',
  components: {
    StepBar,
    PhonecodeSignup,
  },
};
</script>
