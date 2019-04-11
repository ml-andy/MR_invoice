<template lang="pug">
  .invoice-view
    InvoiceList
</template>

<script>
import InvoiceList from '@/components/containers/invoice/List';

export default {
  name: 'Invoice_List',
  components: {
    InvoiceList,
  },
};
</script>
