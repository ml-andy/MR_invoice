<template lang="pug">
  .phonecode-view
    StepBar(:step=2)
    PhonecodeSignin
</template>

<script>
import StepBar from '@/components/containers/StepBar';
import PhonecodeSignin from '@/components/containers/phonecode/Signin';

export default {
  name: 'phonecodeSignin',
  components: {
    StepBar,
    PhonecodeSignin,
  },
};
</script>
