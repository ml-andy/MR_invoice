<template lang="pug">
  .phonecode-view
    StepBar(:step=3)
    PhonecodeBind
</template>

<script>
import StepBar from '@/components/containers/StepBar';
import PhonecodeBind from '@/components/containers/phonecode/Bind';

export default {
  name: 'phonecodeBind',
  components: {
    StepBar,
    PhonecodeBind,
  },
};
</script>
