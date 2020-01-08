export default {
  items: [
    {
      name: 'Dashboard',
      url: '/maindashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Customer',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Customer List',
      url: '/shop/customers',
      icon: 'icon-user',
    },
    {
      title: true,
      name: 'Product',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Product List',
      url: '/shop/products',
      icon: 'cil-3d',
    },
    {
      title: true,
      name: 'Order'
    },
    {
      name: 'Order List',
      url: '/shop/orders',
      icon: 'cil-cart'
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Extras',
    },
    {
      name: 'Pages',
      //url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
  ],
};
