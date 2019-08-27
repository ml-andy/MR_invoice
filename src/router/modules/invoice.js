import * as routePath from '@/constant/routePath';
import Page from '@/views/Page';
import InvoiceList from '@/views/invoice/List';
import InvoiceDetail from '@/views/invoice/Detail';

export default [
  {
    path: routePath.INVOICE,
    name: 'invoice',
    redirect: routePath.INVOICE_LIST,
    component: Page,
    children: [
      {
        path: routePath.INVOICE_LIST,
        name: 'phonecode index(list)',
        component: InvoiceList,
      },
      {
        path: routePath.INVOICE_DETAIL,
        name: 'phonecode detail',
        component: InvoiceDetail,
      },
    ],
  },
];
