<template lang="pug">
  .phonecode-view
    StepBar(:step=4)
    PhonecodeSuccess
</template>

<script>
import StepBar from '@/components/containers/StepBar';
import PhonecodeSuccess from '@/components/containers/phonecode/Success';

export default {
  name: 'phonecode_Success',
  components: {
    StepBar,
    PhonecodeSuccess,
  },
};
</script>
