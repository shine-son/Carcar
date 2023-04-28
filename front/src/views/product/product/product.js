const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

// 이메일 형식인지 확인 (true 혹은 false 반환)
const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
const addCommas = n => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 13,000원, 2개 등의 문자열에서 쉼표, 글자 등 제외 후 숫자만 뺴냄
// 예시: 13,000원 -> 13000, 20,000개 -> 20000
const convertToNumber = string => {
  return parseInt(string.replace(/(,|개|원)/g, ''));
};

// ms만큼 기다리게 함.
const wait = ms => {
  return new Promise(r => setTimeout(r, ms));
};

import { addCommas } from '../../useful-function.js'
// import { convertToNumber } from '../../useful-function.js';

$('.carousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000
}); 

// 함수 적용 안 됨
// function count (type) {
//     const productAmountNum = document.querySelector('.product_amount'); // 결과 수량
//     let num = productAmountNum.innerHTML;
//         
//     if(type === 'plus') {
//         num = parseInt(num) + 1;
//     } else if(type === 'minus') {
//         num = parseInt(num) - 1;
//     }
// 
//     productAmountNum.innerText = num;
// }

/*--productData--*/
let productData = [];

fetch("http://34.22.74.213:5000/api/product?categories=bmw", { credential: false })
    .then(res => {
        return res.json();
    })
    .then((json) => {
        productData = json;
        console.log(productData);

        document.querySelector('.product_img1').src = productData[0].image[0];
        document.querySelector('.product_img2').src = productData[0].image[1];
        document.querySelector('.product_name').innerHTML = productData[0].name;
        document.querySelector('.product_price').innerHTML = "KRW " + addCommas(productData[0].price);
        document.querySelector('.main_description').innerHTML = productData[0].description;
        document.querySelector('.maker').innerHTML = "제조사 _ " + productData[0].maker;
        
    })
    .catch((error) => console.error(error));


/*--productData--*/
let changeBtn = document.querySelector('.amount_done');

changeBtn.addEventListener('click', function () {
let amountNum = document.querySelector('.product_amount').innerHTML;

document.querySelector('.total_price').innerHTML = "KRW " + addCommas(productData[0].price * amountNum);
});