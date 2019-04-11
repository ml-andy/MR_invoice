<template lang="pug">
  section.invoice
    NoticeModal(
      :isNotice="isNotice"
      :onClose="()=> { onEditNoticeModal(false) }"
    )
    .invoice__header
      nav.invoice__title
        .columns
          .column.col-3
          .column.col-6
            .columns
              .column.col-2.text-sm.text-right.titledate
                a.prev.text-sm(
                  v-show="activeIndex > 0"
                  href="javascript:;"
                )
                  .icon.icon-caret.icon-caret-left
              .column.col-8.text-sm.text-center.titledate
                |{{ date.year }}年{{ date.month }}月
              .column.col-2.text-sm.titledate
                a.next.text-sm(
                  v-show="activeIndex + 1 < invoices.length"
                  href="javascript:;"
                )
                  .icon.icon-caret.icon-caret-right
          .column.col-3
      .invoice__subtitle.text-sm.text-center 共有 {{ invoices[activeIndex].list.length }} 張發票
    .invoice__main
      swiper(
        :options="swiperOption"
        ref="mySwiper"
      )
        swiper-slide(
          v-for="invoice in invoices"
          :key="invoice.month"
        )
          .list(v-if="invoice.list.length !== 0")
            .list__item(
              v-for="item in invoice.list"
              :key="item.month"
              @click="onDetail(item)"
            )
              .columns
                .column.col-7.name
                  span.text-sm.text-secondary.date {{ item.invMonth }}/{{ item.invDay }}
                  span.text-sm {{ item.invNum }}
                  p.h5 {{ item.sellerName }}
                .column.col-5.amount
                  .columns
                    .column.col-10.text-right
                      span.h3.text-primary $ {{ item.amount }}
                    .column.col-2.h4.text-right
                      i.icon.icon-arrow
          .invoice__empty.empty(v-else)
            .empty__photo
              i.icon.icon-noReciept
            p.text.text-center 目前尚無任何發票資料！
    .invoice__footer
      a.noticeBtn.text-sm(
        href="javascript:;"
        @click="onEditNoticeModal(true)"
      )
        i.icon.icon-info.icon-margin-right
        |注意事項
</template>

<script>
import * as routePath from '@/constant/routePath';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import NoticeModal from '@/components/containers/invoice/NoticeModal';

export default {
  name: 'invoice_list',
  data() {
    return {
      swiperOption: {
        autoHeight: true,
        initialSlide: 2,
        navigation: {
          nextEl: '.next',
          prevEl: '.prev',
        },
      },
      invoices: [
        {
          year: '108',
          month: '01-02',
          list: [
            {
              rowName: 1,
              invNum: 'BA123456',
              sellerName: '統一超商股份有限公司...',
              amount: '121,567',
              invPeriod: '10804',
              invYear: '108',
              invMonth: '03',
              invDay: '01',
              isWin: false,
            },
            {
              rowName: 2,
              invNum: 'BA123457',
              sellerName: 'COSTO 樹林店',
              amount: '1000',
              invPeriod: '10804',
              invYear: '108',
              invMonth: '03',
              invDay: '01',
              isWin: true,
            },
            {
              rowName: 1,
              invNum: 'BA123456',
              sellerName: '統一超商股份有限公司...',
              amount: '121,567',
              invPeriod: '10804',
              invYear: '108',
              invMonth: '03',
              invDay: '01',
              isWin: false,
            },
            {
              rowName: 2,
              invNum: 'BA123457',
              sellerName: 'COSTO 樹林店',
              amount: '1000',
              invPeriod: '10804',
              invYear: '108',
              invMonth: '03',
              invDay: '01',
              isWin: true,
            },
            {
              rowName: 1,
              invNum: 'BA123456',
              sellerName: '統一超商股份有限公司...',
              amount: '121,567',
              invPeriod: '10804',
              invYear: '108',
              invMonth: '03',
              invDay: '01',
              isWin: false,
            },
            {
              rowName: 2,
              invNum: 'BA123457',
              sellerName: 'COSTO 樹林店',
              amount: '1000',
              invPeriod: '10804',
              invYear: '108',
              invMonth: '03',
              invDay: '01',
              isWin: true,
            },
            {
              rowName: 1,
              invNum: 'BA123456',
              sellerName: '統一超商股份有限公司...',
              amount: '121,567',
              invPeriod: '10804',
              invYear: '108',
              invMonth: '03',
              invDay: '01',
              isWin: false,
            },
            {
              rowName: 2,
              invNum: 'BA123457',
              sellerName: 'COSTO 樹林店',
              amount: '1000',
              invPeriod: '10804',
              invYear: '108',
              invMonth: '03',
              invDay: '01',
              isWin: true,
            },
          ],
        },
        {
          year: '108',
          month: '03-04',
          list: [],
        },
        {
          year: '108',
          month: '05-06',
          list: [],
        },
      ],
      date: {
        year: '',
        month: '',
      },
      activeIndex: 2,
      isNotice: false,
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    this.swiper.on('slideChange', this.onSlideChange);
    this.onSlideChange();
  },
  methods: {
    onEditNoticeModal(visible) {
      this.isNotice = visible;
    },
    onDetail(item) {
      const {
        invNum,
        invYear,
        invMonth,
        invDay,
        amount,
        sellerName,
      } = item;
      const invDate = `${invYear}${invMonth}${invDay}`;
      console.log(invNum, invDate, sellerName, amount);
      this.$router.push(routePath.INVOICE_DETAIL);
    },
    onSlideChange() {
      this.activeIndex = this.$refs.mySwiper.swiper.activeIndex || 0;
      const { year, month } = this.invoices[this.activeIndex];
      this.date = { year, month };
    },
  },
  components: {
    swiper,
    swiperSlide,
    NoticeModal,
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.titledate {
  line-height: $fontSize3;
}

.swiper-slide {
  background-color: $light-color;

  .list {
    &__item {
      padding: #{convertUnit(20)} #{convertUnit(10)} #{convertUnit(20)} #{convertUnit(10)};
      box-shadow: 0 0 1px rgba(167,167,167,0.3);

      .columns {
        margin: 0;

        * {
          box-sizing: border-box;
        }
      }

      .name {
        padding-left: convertUnit(10);
        padding-right: 0;
      }

      .date {
        margin-right: $space;
      }

      .amount {
        padding: convertUnit(8) 0;

        .arrow {
          margin-top: convertUnit(5);
        }

        .column {
          padding: 0;
        }
      }
    }
  }

  .empty__photo {
    font-size: convertUnit(110);
    line-height: convertUnit(110);
    margin-bottom: convertUnit(40);
  }
}
</style>