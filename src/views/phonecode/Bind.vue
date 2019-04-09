<template lang="pug">
  .phonecode-view
    StepBar(:step=3)
    PhonecodeSignin
</template>

<script>
import StepBar from '@/components/containers/StepBar';
import PhonecodeSignin from '@/components/containers/phonecode/Signin';

export default {
  name: 'phonecodeBind',
  components: {
    StepBar,
    PhonecodeSignin,
  },
};
</script>
