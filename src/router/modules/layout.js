import * as routePath from '@/constant/routePath';
import Index from '@/views/Index';
import LayoutIndex from '@/views/layout/Index';
import LayoutButtons from '@/views/layout/Buttons';
import LayoutModals from '@/views/layout/Modals';
import LayoutLoading from '@/views/layout/Loading';

export default [
  {
    path: routePath.LAYOUT,
    name: 'Layout',
    redirect: routePath.LAYOUT_INDEX,
    component: Index,
    meta: {
      title: 'Layout',
    },
    children: [
      {
        path: routePath.LAYOUT_INDEX,
        name: 'Layout Index',
        meta: {
          title: '共用樣式',
        },
        component: LayoutIndex,
      },
      {
        path: routePath.LAYOUT_BUTTONS,
        name: 'Layout Button',
        meta: {
          title: '按鈕',
        },
        component: LayoutButtons,
      },
      {
        path: routePath.LAYOUT_MODALS,
        name: 'Layout Modals',
        meta: {
          title: 'Modals',
        },
        component: LayoutModals,
      },
      {
        path: routePath.LAYOUT_LOADING,
        name: 'Layout Loading',
        meta: {
          title: 'Loading',
        },
        component: LayoutLoading,
      },
    ],
  },
];
