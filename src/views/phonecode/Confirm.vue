<template lang="pug">
  .phonecode-view
    StepBar(:step=2)
    PhonecodeConfirm
</template>

<script>
import StepBar from '@/components/containers/StepBar';
import PhonecodeConfirm from '@/components/containers/phonecode/Confirm';

export default {
  name: 'phonecodeSignup',
  components: {
    StepBar,
    PhonecodeConfirm,
  },
};
</script>
