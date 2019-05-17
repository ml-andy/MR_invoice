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
      @input="onUpdateValue"
      @blur="onBlur($event.target.value)"
      @focus="onFocus"
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
    onFocus: {
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
      const pattern = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/;
      if (pattern.test(e.data)) return;
      const position = e.target.selectionEnd;
      const resultValue = this.onInput(e.target.value);
      this.$refs.input.value = resultValue;
      this.$emit('input', resultValue);
      e.target.setSelectionRange(position, position);
    },
  },
};
</script>
