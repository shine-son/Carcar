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

const productList = document.getElementById("new_product_area");
let productData = [];  // 상품데이터 배열로 받아오기

fetch("http://34.22.74.213:5000/api/product", { credential: false })
    .then(res => {
        return res.json();
    })
    .then((json) => {
        productData = json;
        console.log(productData);
        const newProductData = [];
        for (let i = 0; i < 6; i++) {
            newProductData.push(productData[i])
        }

        newProductData.forEach((product) => {
            // if (product === productData[6]) {
            //     // 강제로 에러를 생성하여 조건에 맞으면 catch로 넘어가도록
            //     throw new Error('forEach문 중단을 위한 강제 에러 생성');
            // }
            
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

        const productClick = document.querySelectorAll('.new_product');
        productClick.forEach((product) => {
            product.addEventListener('click', () => {

                const url = `http://localhost:8000/info/${product.product_id}`;
                // Navigate to new URL
                window.location.href = url;           
            })
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
   