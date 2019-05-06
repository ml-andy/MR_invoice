<template lang="pug">
  .form-group(:class="groupClass")
    div(v-if="$slots.default")
      .form-label(for="input")
        .columns
          .column.col-6 {{ label }}
          .column.col-6.text-sm.text-right
            slot
    div(v-else)
      .form-label(for="input") {{ label }}
    input#input.form-input(
      type="text"
      ref="input"
      :value="value"
      @keyup="onUpdateValue"
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
      default: value => (value),
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
    onUpdateValue(e) {
      const position = e.target.selectionStart;
      const resultValue = this.onInput(e.target.value);
      this.$refs.input.value = resultValue;
      this.$emit('input', resultValue);
      e.target.setSelectionRange(position, position);
    },
  },
};
</script>
