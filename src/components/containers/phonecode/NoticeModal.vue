<template lang="pug">
  Modals(
    :active="isNotice"
    :isCanClose="false"
    contentTextAlign="left"
    @close="onClose"
  )
    template(slot="header") 發票注意事項
    template(slot="body")
      |1.申請手機條碼之手機號碼，必須與註冊國泰優惠APP會員之手機號碼相同。
      br
      |2.如需修改您的Email請至財政部電子發票整合服務平台www.einvoice.nat.gov.tw
    template(slot="footer")
      button(
        class="btn btn-submit btn-block btn-sm"
        @click="onClose"
      ) 確定
</template>

<script>
import Modals from '@/components/units/Modals';

export default {
  name: 'noticeModal',
  props: {
    isNotice: {
      type: Boolean,
      required: true,
      default: false,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  components: {
    Modals,
  },
};
</script>
