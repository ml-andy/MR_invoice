<template lang="pug">
  .form-group(:class="groupClass")
    .form-label(for="input") {{ label }}
    input#input.form-input(
      type="text"
      ref="input"
      :value="value"
      @input="onUpdateValue($event.target.value)"
      @blur="onBlur($event.target.value)"
      placeholder="必填"
      :disabled="disabled"
    )
    p.form-input-hint(v-if="hint") {{ hint }}
</template>

<script>

export default {
  name: 'InputComponent',
  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      default: '',
    },
    onInput: {
      type: Function,
      default: () => {},
    },
    onBlur: {
      type: Function,
      default: () => {},
    },
    placeholder: {
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    groupClass() {
      return {
        'has-error': this.hint !== '',
      };
    },
  },
  methods: {
    onUpdateValue(value) {
      const resultValue = this.onInput(value);
      this.$refs.input.value = resultValue;
      this.$emit('input', resultValue);
    },
  },
};
</script>
