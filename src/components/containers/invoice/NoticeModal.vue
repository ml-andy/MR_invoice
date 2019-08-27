<template lang="pug">
  Modals(
    :active="isNotice"
    :isCanClose="false"
    contentTextAlign="left"
    @close="onClose"
  )
    template(slot="header") 發票注意事項
    template(slot="body")
      |1.依財政部規定，商家須在開立發票後的48小時內上傳資料，如尚未顯示您欲查詢的發票資訊， 請耐心等待。
      br
      |2.國泰優惠APP只提供您持有並綁定之國泰世華銀行信用卡發票資訊，如欲查詢其他載具之發票資訊，或有更多發票問題，請洽財政部電子發票整合服務平台https://www.einvoice.nat.gov.tw/
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
