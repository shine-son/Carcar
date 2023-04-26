import { addCommas } from '../../useful-function.js';
// import * as Api from '../../api.js';

// const DATA = [
//   {
//     user_name: '정민규',
//     ordered_product: [
//       {
//         product_id: 'jR0LeuKBeRi5qSgkamCUo',

//         price: 60000,
//         image: 'http://via.placeholder.com/640x360',

//         name: 'G90',
//       },
//       {
//         product_id: 'jR0LeuKBeRi5qSgkamCUo',
//       },
//     ],
//     shipping_status: '배송 완료',
//     order_id: '1번',
//     total_price: '580000',
//     createdAt: '2023-04-25',
//   },
//   {
//     user_id: '손찬규',
//     ordered_product: [
//       {
//         product_id: 'jR0LeuKBeRi5qSgkamCUo',
//         image: 'http://via.placeholder.com/640x360',

//         name: 'G80',
//       },
//       {
//         product_id: '3',

//         image: 'http://via.placeholder.com/640x360',

//         name: '아반떼',
//       },
//     ],
//     shipping_status: '배송 전',

//     order_id: '2번',
//     createdAt: '2023-04-19',
//     total_price: '64500',
//   },
//   {
//     user_id: '김민성',
//     ordered_product: [
//       {
//         product_id: 'jR0LeuKBeRi5qSgkamCUo',
//         image: 'http://via.placeholder.com/640x360',
//         name: 'K5',
//       },
//       {
//         product_id: 'pR9LaaKNeRl1qIgbasEUz',
//         image: 'http://via.placeholder.com/640x360',
//         name: '쏘렌토',
//       },
//       {
//         product_id: 'pR9LaaKNeRl1qIgbasEUz',
//         image: 'http://via.placeholder.com/640x360',
//         name: 'K3',
//       },
//     ],
//     shipping_status: '배송 후',
//     order_id: '3번',
//     createdAt: '2023-04-30',
//     total_price: '71000',
//   },
// ];

fetch('http://34.22.74.213:5000/api/orders', {
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ3Y2IxYjFhZTZhMDkyNWVkYWJmZjYiLCJyb2xlIjoiYmFzaWMtdXNlciIsImlhdCI6MTY4MjQ4NjM2MX0.tJYowY4OfoYn-86GEAreez2u0fV5QHU5FhGL6Hbvf7E',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const orderList = function orderList(item, i) {
      return `
          <div class=listBox>
          <div class="orderList_product_order domain ">
          <p class="orderList_category_order_date">${data[item].createdAt}</p>
          <p class="orderList_category_order_number"><a href="#">${data[item]._id}</a></p>
      </div>
      <div class="orderList_product_info">
        <div class="orderList_product_info_image">
            <img src=${data[item].ordered_product[0].image}/>
        </div>
        <div class="orderList_product_info_text">
            <div class="orderList_product_info_name">${data[item].ordered_product[0].name} 포함 ${
        Object.keys(data[item].ordered_product).length
      }종</div>
    </div>
      </div>
      <div class="orderList_product_price domain">${addCommas(data[item].total_price)}</div>
      <div class="orderList_product_state domain">${data[item].shipping_status}</div>
          </div>
      `;
    };
    const orderList_product = document.querySelector('.orderList_product');
    for (let item = 0; item < data.length; item++) {
      let list = data[item];
      orderList_product.insertAdjacentHTML('beforeEnd', orderList(item));
    }
    console.log(Object.keys(data[1].ordered_product).length);
  });

// function deleteUser() {
//   if (answer) {
//     fetch(`/api/users/${_id}`, {
//       method: 'DELETE',
//       body: JSON.stringify({
//         cart_id: data.cart_id,
//       }),
//     })
//       .then(async res => {
//         const json = await res.json();

//         if (res.ok) {
//           return json;
//         }

//         return Promise.reject(json);
//       })
//       .then(data => {
//         alert('회원 정보가 삭제되었습니다.');
//         window.location.href = '/';
//       })
//       .catch(err => alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`));
//   }
// }

// deleteUserBtn.addEventListener('click', deleteUser);

// fetch(`/api/orders`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//
//   }),
// })
//   .then(async (res) => {
//     const json = await res.json();

//     if (res.ok) {
//       return json;
//     }

//     return Promise.reject(json);
//   })

//   .catch((err) => {
//     alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`);
//   });
