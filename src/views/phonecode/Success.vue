<template lang="pug">
  .phonecode-view
    StepBar(:step=4)
    PhonecodeSignin
</template>

<script>
import StepBar from '@/components/containers/StepBar';
import PhonecodeSignin from '@/components/containers/phonecode/Signin';

export default {
  name: 'phonecodeSuccess',
  components: {
    StepBar,
    PhonecodeSignin,
  },
};
</script>
