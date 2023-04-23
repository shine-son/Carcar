import { addCommas } from '../../useful-function.js';

const DATA = [
  {
    user_id: '정민규',
    ordered_product: [
      {
        amount: 3,
        price: 60000,
        image: 'http://via.placeholder.com/640x360',
        brand: '현대',
        name: 'G90',
        desc: '좋은차',
      },
      {
        amount: 10,
        price: 40000,
        image: 'http://via.placeholder.com/640x360',
        brand: '현대',
        name: '소나타',
        desc: '좋은차',
      },
    ],
    shipping_status: '배송 완료',
    address: '성수동 성수낙낙',
    order_id: '1번',
    createdAt: '2023-04-25',
  },
  {
    user_id: '손찬규',
    ordered_product: [
      {
        amount: 9,
        price: 500,
        image: 'http://via.placeholder.com/640x360',
        brand: '현대',
        name: 'G80',
        desc: '좋은차',
      },
      {
        amount: 1,
        price: 60000,
        image: 'http://via.placeholder.com/640x360',
        brand: '현대',
        name: '아반떼',
        desc: '좋은차',
        _id: '64423401a5cdc9fb12ec0042',
      },
    ],
    shipping_status: '배송 전',
    address: '성수동 성수낙낙',
    order_id: '2번',
    createdAt: '2023-04-19',
  },
  {
    user_id: '김민성',
    ordered_product: [
      {
        product_id: 'jR0LeuKBeRi5qSgkamCUo',
        amount: 3,
        price: 500,
        image: 'http://via.placeholder.com/640x360',
        brand: '기아',
        name: 'K5',
        desc: '좋은차',
        _id: '64423401a5cdc9fb12ec0041',
      },
      {
        product_id: 'pR9LaaKNeRl1qIgbasEUz',
        amount: 6,
        price: 7400,
        image: 'http://via.placeholder.com/640x360',
        brand: '기아',
        name: '쏘렌토',
        desc: '좋은차',
      },
    ],
    shipping_status: '배송 후',
    address: '성수동 성수낙낙',
    order_id: '3번',
    createdAt: '2023-04-30',
  },
];

fetch('')
  .then(res => {
    return DATA;
  })
  .then(data => {
    const orderList = function orderList(item, i) {
      return `
      <div class=listBox>
      <div class="orderList_product_order domain">
      <p class="orderList_category_order_date">${data[item].createdAt}</p>
      <p class="orderList_category_order_number"><a href="#">${data[item].order_id}</a></p>
  </div>
  <div class="orderList_product_img domain"></div>
  <div class="orderList_product_info">
      <div class="orderList_product_info_brand">${data[item].ordered_product[i].brand}</div>
      <div class="orderList_product_info_name">${data[item].ordered_product[i].name}</div>
      <div class="orderList_product_info_desc">${data[item].ordered_product[i].desc}</div>
  </div>
  <div class="orderList_product_amount domain">
      
          <div class="orderList_product_amount_count">
              <button class="orderList_product_amount_count_plus">+</button>
              <div class="product_amount">${data[item].ordered_product[i].amount}</div>
              <button class="orderList_product_amount_count_minus">-</button>
              
          </div>
          <button class="orderList_product_amount_change">변경</button>
      
     
  </div>
  <div class="orderList_product_price domain">${addCommas(
    data[item].ordered_product[i].amount * data[item].ordered_product[i].price,
  )}</div>
  <div class="orderList_product_state domain">${data[item].shipping_status}</div>
  <div class="orderList_product_delete domain">
      <button class="orderList_product_delete_box">주문취소</button>
  </div>
      </div>
      
    
  `;
    };

    const orderList_product = document.querySelector('.orderList_product');
    for (let item = 0; item < data.length; item++) {
      let list = data[item];
      for (let i = 0; i < list.ordered_product.length; i++) {
        orderList_product.insertAdjacentHTML('beforeEnd', orderList(item, i));
      }
    }
    const plus = orderList_product.querySelectorAll('.orderList_product_amount_count_plus');

    for (let i = 0; i < plus.length; i++) {
      plus[i].addEventListener('click', plusAmount);

      function plusAmount() {
        const amount = plus[i].parentNode.querySelector('.product_amount');
        amount.innerHTML = Number(amount.innerHTML) + 1;
      }

      const minus = document.querySelectorAll('.orderList_product_amount_count_minus');
      minus[i].addEventListener('click', minusAmount);

      function minusAmount() {
        const amount = minus[i].parentNode.querySelector('.product_amount');
        if (Number(amount.innerHTML) > 1) {
          amount.innerHTML = Number(amount.innerHTML) - 1;
        }
      }

      const cancel = document.querySelectorAll('.orderList_product_delete_box');
      const cancelTarget = cancel[i].parentNode.parentNode;

      const state = cancelTarget.querySelector('.orderList_product_state');

      cancel[i].addEventListener('click', cancelExecute);

      function cancelExecute(e) {
        if (state.innerHTML === '배송 전') cancelTarget.remove();
      }
    }
  });
