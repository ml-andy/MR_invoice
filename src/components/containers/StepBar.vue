<template lang="pug">
  section.stepbar
    .stepbar__column.columns
      .column.col-3.text-center(:class="getStepStatus(1, step)")
        span.column__num 1
        span.column__text 同意條款
      .column.col-3.text-center(:class="getStepStatus(2, step)")
        span.column__num 2
        span.column__text 手機條碼
      .column.col-3.text-center(:class="getStepStatus(3, step)")
        span.column__num 3
        span.column__text 發票載具
      .column.col-3.text-center(:class="getStepStatus(4, step)")
        span.column__num 4
        span.column__text 完成
    .stepbar__line

</template>

<script>
export default {
  name: 'StepBar',
  props: {
    step: Number,
  },
  methods: {
    getStepStatus(item = 0, step) {
      if (item === step) return 'on';
      else if (item < step) return 'prev';
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.stepbar {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  background-color: rgb(235,235,235);
  box-shadow: 0px 1px 1px rgba(0,0,0,0.3);
  z-index: 99;

  &__column {
    position: relative;
    padding: convertUnit(10) 0;
    color: rgb(103,103,103);
    z-index: 1;

    .column {
      &__num {
        position: relative;
        width: convertUnit(26);
        height: convertUnit(26);
        line-height: convertUnit(20);
        border-radius: convertUnit(13);
        border: #{convertUnit(3)} solid rgb(235,235,235);
        background-color: $light-color;
        display: inline-block;

        &:before {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          border-radius: 50%;
          border: 1px solid $gray-color-dark;
        }

        &:after {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          border-radius: 50%;
          background-image: url(~@/assets/images/icon_done.png);
          background-repeat: no-repeat;
          background-position: center;
          background-size: #{convertUnit(12)} #{convertUnit(10)};
          background-color: $secondary-color;
          z-index: 1;
          display: none;
        }
      }
      &__text {
        width: 100%;
        display: inline-block;
      }

      &.on {
        color: $secondary-color;

        .column {
          &__num {
            color: $light-color;
            background-color: $secondary-color;

            &:before {
              border-color: $secondary-color;
            }
          }
        }
      }
      &.prev {
        color: $secondary-color;

        .column {
          &__num {
            color: $light-color;
            background-color: $secondary-color;

            &:before {
              border-color: $secondary-color;
            }
            &:after {
              display: block;
            }
          }
        }
      }
    }
  }
  &__line {
    position: absolute;
    width: calc(100% - #{convertUnit(80)});
    height: 1px;
    left: convertUnit(40);
    top: convertUnit(25);
    background-color: rgb(180,180,180);
    z-index: 0;
  }
}
</style>

