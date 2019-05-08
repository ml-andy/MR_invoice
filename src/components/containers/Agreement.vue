<template lang="pug">
  section.agreement.stepbarSpace
    .section__header
      h3.text-primary.text-center MR「綁定發票載具」同意條款
    .section__main.footerSpace.text
      |當您點選同意，即表示已詳閱並完全了解以下約定事項：
      br
      |為使您在國泰優惠APP享有查詢電子發票、消費明細等服務（下稱本服務），您同意國泰優惠APP提供您的手機號碼、電子郵件信箱、
      |欲綁定發票載具之信用卡卡片號碼、身分證字號及出生日期等資料予財政部電子發票整合服務平臺（下稱整合服務平臺），
      |並代您申請手機條碼及綁定發票載具。整合服務平臺為辦理電子發票業務（包括但不限於提供電子發票自動對獎、中獎通知、
      |已設定金融帳戶或電子支付帳戶者之獎金自動匯入等）、財稅行政、統計與分析、資（通）訊與資料庫管理等目的，
      |除自國泰優惠APP取得前揭資料外，並將蒐集您的發票號碼、消費時間、消費明細、店點等資料在中華民國境內利用，
      |若您未提供完整及正確之資料，將無法收到整合服務平臺產生之手機條碼及享受電子發票服務。您得依法向整合服務平臺行使請求查閱、
      |製給複製本、補充或更正、停止蒐集、處理、利用或刪除資料等權利。您得依法向整合服務平臺行使請求查閱、製給複製本、補充或更正、
      |停止蒐集、處理、利用或刪除等權利。如您的手機條碼有毀損、滅失或遺忘驗證碼或電子郵件信箱之情形，請參閱整合服務平臺公告之
      |「手機條碼申請、使用及相關注意事項」，或連繫整合服務平臺客服人員（免費客服專線 0800-521-988)。您知悉並同意國泰優惠APP蒐集、
      |處理及利用您的手機條碼及驗證碼，串接手機條碼之所有發票資料及消費明細至國泰優惠APP，以提供本服務。
      br
      br
      |國泰優惠APP將以自動化機器或其他非自動化之利用方式，於國內、外各地，依個人資料保護相關法規蒐集、處理、利用及國際傳輸個人資料。
      |敬請注意，您得依個人資料相關法規就前所提供之個人資料：(1)請求查詢、閱覽、製給複製本，而受請求單位得酌收必要成本費用；
      |(2)請求補充或更正個人資料，惟依法應先適當釋明原因及事實；(3)請求停止蒐集、處理或利用，惟於個人資料正確性有爭議時，
      |國泰優惠APP因執行職務或業務所必須，或經您書面同意並經註明其爭議時不在此限；(4)於前開蒐集之特定目的消失或期限屆滿時，
      |請求刪除、停止處理或利用本人之個人資料，惟國泰優惠APP因執行職務或業務所必須或經本人書面同意者，不在此限。
      br
      br
      |您得自由選擇是否提供完整資料，惟選擇不提供個人資料、或提供之個人資料不完全或不正確、或請求刪除或停止蒐集、處理與利用其個人資料者，將無法享有本服務。

    .section__footer.columns
      button.btn.btn-submit.column.col-12(
        @click="onAgree"
        :disabled="!isNext"
      ) 我同意上述條款

</template>

<script>
import * as routePath from '@/constant/routePath';
import { sendMixpanel } from '@/helpers/unit';
// import { isScrollEnd } from '@/helpers/unit';

export default {
  name: 'Agreement',
  data() {
    return {
      isNext: true,
    };
  },
  mounted() {
    // window.onscroll = this.onWindowScroll;
    // this.onWindowScroll();
    sendMixpanel('eReceipt_agreement_view');
  },
  // beforeDestroy() {
  //   window.onscroll = null;
  // },
  methods: {
    // onWindowScroll() {
    //   const {
    //     scrollTop,
    //     scrollHeight,
    //     clientHeight,
    //   } = document.documentElement;
    //   this.isNext = isScrollEnd(scrollTop, clientHeight, scrollHeight);
    // },
    onAgree() {
      sendMixpanel('eReceipt_agreement_agree');
      this.$router.push(routePath.PHONECODE);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.agreement {
  padding-left: #{convertUnit(30)};
  padding-right: #{convertUnit(30)};

  .section__footer {
    width: 100%;
    left: 0;
    bottom: 0;
    padding: #{convertUnit(10)} $space;
    background-color: $light-color;
    box-shadow: 0 1px 4px rgba(0,0,0,0.5);
  }
}
</style>

