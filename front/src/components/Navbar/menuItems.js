export const menuItems = [
  { path: '/admin-panel', item: 'پنل ادمین', roles: ['admin'] },
  { path: '/seller-panel', item: 'پنل فروشنده', roles: ['seller'] },
  { path: '/sellers-mng', item: 'مدیریت فروشندگان', roles: ['admin'] },
  { path: '/customers-mng', item: 'مدیریت مشتری‌ها', roles: ['admin'] },
  { path: '/bills', item: 'مشاهده فاکتور‌ها', roles: ['admin', 'seller'] },
  { path: '/products', item: 'محصولات', roles: ['admin', 'seller'] },
  { path: '/ordering', item: 'ثبت سفارش', roles: ['admin', 'seller'] },
]