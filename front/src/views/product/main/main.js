import { addCommas } from '../../useful-function.js';

const productList = document.getElementById("new_product_area");
let productData = [];  // 상품데이터 배열로 받아오기

fetch("http://34.22.74.213:5000/api/product", { credential: false })
    .then(res => {
        return res.json();
    })
    .then((json) => {
        productData = json;
        console.log(productData);

        productData.forEach((product) => {
            if (product === productData[6]) {
                // 강제로 에러를 생성하여 조건에 맞으면 catch로 넘어가도록
                throw new Error('forEach문 중단을 위한 강제 에러 생성');
            }
            
            const productElement = document.createElement("div");
            productElement.className = 'new_product';
            const productImage = document.createElement('img');
            productImage.className = 'new_img';
            const productTextArea = document.createElement('div');
            productTextArea.className = 'new_product_info';
            const productName = document.createElement('p');
            productName.className = 'list_name';
            const productDescription = document.createElement('p');
            productDescription.className = 'list_sub';
            const productPrice = document.createElement('p');
            productPrice.className = 'list_price';

            productImage.src += product.image;
            productName.innerHTML += product.name;
            productDescription.innerHTML += product.description;
            productPrice.innerHTML += "KRW " + addCommas(product.price);

            productList.appendChild(productElement);
            productElement.append(productImage, productTextArea);
            productTextArea.append(productName, productDescription, productPrice);
        })
    })
.catch((error) => console.error(error));

$('.carousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000
});
   