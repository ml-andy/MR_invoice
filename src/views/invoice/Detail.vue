<template lang="pug">
  .invoice-view
    InvoiceDetail
</template>

<script>
import InvoiceDetail from '@/components/containers/invoice/Detail';

export default {
  name: 'Invoice_Detail',
  components: {
    InvoiceDetail,
  },
};
</script>
