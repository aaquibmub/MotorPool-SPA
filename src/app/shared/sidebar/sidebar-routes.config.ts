import { RouteInfo } from './sidebar.metadata';

// Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  // home
  {
    path: '/home',
    title: 'Home',
    icon: 'home-icon',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: []
  },

  // dashboard
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'dashboard-icon',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: []
  },

  // sales
  {
    path: '/sales',
    title: 'Sales',
    icon: 'sales-icon',
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [

      // quotation
      {
        path: '/sales/quotations',
        title: 'Quotations',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/sales/quotations/new',
            title: 'New Quotation',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/sales/quotations',
            title: 'All Quotations',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // sale order
      {
        path: '/sales/sale-orders',
        title: 'Sale Orders',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/sales/sale-order/new',
            title: 'New Sale Order',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/sales/sale-orders',
            title: 'All Sale Orders',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // sale invoice
      {
        path: '/sales/sale-invoice',
        title: 'Sale Invoices',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/sales/sale-invoice/new',
            title: 'New Invoice',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/sales/sale-invoices',
            title: 'All Invoices',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // customer
      {
        path: '/sales/customers',
        title: 'Customers',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/sales/customer/new',
            title: 'New Customer',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/sales/customers/all',
            title: 'All Customers',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },
    ]
  },

  // purchases
  {
    path: '/purchases',
    title: 'Purchases',
    icon: 'purchases-icon',
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [

      // request for quotation
      {
        path: '/purchases/request-for-quotations',
        title: 'Requests for Quotation',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/purchases/request-for-quotation/new',
            title: 'New RFQ',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/purchases/request-for-quotations',
            title: 'All RFQs',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // purchase order
      {
        path: '/purchases/purchase-orders',
        title: 'Purchase Orders',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/purchases/purchase-order/new',
            title: 'New Purchase Order',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/purchases/purchase-orders',
            title: 'All Purchase Orders',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // purchase receipt
      {
        path: '/purchases/receipts',
        title: 'Receipts',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/purchases/receipts/all',
            title: 'All Receipts',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/purchases/receipts/purchase',
            title: 'Purchase Receipts',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/purchases/receipts/return',
            title: 'Return Receipts',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // supplier
      {
        path: '/purchases/suppliers',
        title: 'Suppliers',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/purchases/supplier/new',
            title: 'New Supplier',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/purchases/suppliers/all',
            title: 'All Suppliers',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },
    ]
  },

  // inventory
  {
    path: '/inventory',
    title: 'Inventory',
    icon: 'inventory-icon',
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      // products
      {
        path: '/inventory/products',
        title: 'Products',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/inventory/products/new',
            title: 'New Product',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/inventory/products',
            title: 'All Products',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // stock
      {
        path: '/inventory/stock',
        title: 'Stocks',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          // Stock Ajudstment
          {
            path: '/inventory/stock-adjustment/new',
            title: 'New Stock Adjustment',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/inventory/stock/stock-adjustments',
            title: 'Stock Adjustments',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },

          // low stock
          {
            path: '/inventory/low-stocks',
            title: 'Low Stocks',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // transfer
      {
        path: '/inventory/transfer',
        title: 'Transfer',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/inventory/transfer-edit/new',
            title: 'New Transfer',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/inventory/transfer/transfer-list',
            title: 'All Transfer',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      }
    ]
  },

  // shipments
  {
    path: '/shipments',
    title: 'Shipments',
    icon: 'shipments-icon',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/shipments/10',
        title: 'Customer Shipments',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/shipments/10/requests',
            title: 'Shipment Requests',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/shipments/10/orders/all',
            title: 'All Shipment Orders',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/shipments/10/orders/due-today',
            title: 'Due Today',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/shipments/10/orders/not-shipped',
            title: 'Not Shipped',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/shipments/10/orders/delayed',
            title: 'Delayed',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/shipments/10/orders/completed',
            title: 'Completed',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },
      {
        path: '/shipments/20',
        title: 'Store Shipments',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/shipments/20/requests',
            title: 'Shipment Requests',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/shipments/20/orders/all',
            title: 'All Shipment Orders',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/shipments/20/orders/due-today',
            title: 'Due Today',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/shipments/20/orders/not-shipped',
            title: 'Not Shipped',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/shipments/20/orders/delayed',
            title: 'Delayed',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/shipments/20/orders/completed',
            title: 'Completed',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },
      {
        path: '/shipments/couriers',
        title: 'Couriers',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/shipments/courier/new',
            title: 'New Courier',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/shipments/couriers/list',
            title: 'All Couriers',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },
    ]
  },

  // finance
  {
    path: '/finance',
    title: 'Finance',
    icon: 'finance-icon',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [

      // payments
      {
        path: '/finance/payments',
        title: 'Payments',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/finance/payment/new',
            title: 'New Payment',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/finance/payments/all',
            title: 'All Payments',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // accounts
      {
        path: '/finance/chart-of-account',
        title: 'Chart of Account',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/finance/account/new',
            title: 'New Account',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/finance/chart-of-account',
            title: 'Chart of Account',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // account types
      {
        path: '/finance/chart-of-account/account-types',
        title: 'Account Types',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/finance/account-type/new',
            title: 'New Account Type',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/finance/chart-of-account/account-types',
            title: 'Account Types',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // transactions
      {
        path: '/finance/transactions',
        title: 'Transactions',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/finance/transaction/new',
            title: 'New Transaction',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/finance/transactions/all',
            title: 'Transactions',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },
    ]
  },

  // reports
  {
    path: '/reports',
    title: 'Reports',
    icon: 'reports-icon',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/reports/reports-by-category',
        title: 'Transactions',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/reports/report/new',
            title: 'New Report',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/reports-by-category',
            title: 'All Reports',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },
      {
        path: '/reports/logs/system',
        title: 'Logs',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/reports/logs/system',
            title: 'System Report',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/logs/activity',
            title: 'Activity Log',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      }
    ]
  },
  // {
  //   path: '/pos',
  //   title: 'POS',
  //   icon: 'fa fa-usd',
  //   class: '',
  //   badge: '',
  //   badgeClass: '',
  //   isExternalLink: false,
  //   submenu: []
  // },
];
