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

const categoryName = document.getElementById("page_name_text");
const productList = document.getElementById("product_list_area");

let productData = [];  // 상품데이터 배열로 받아오기

fetch("http://34.22.74.213:5000/api/product?categories=bmw", { credential: false })
    .then(res => {
        return res.json();
    })
    .then((json) => {
        productData = json;
        console.log(productData);

        document.querySelector('#category_title').innerHTML = productData[0].category;
        
        productData.forEach((product) => {
            const productElement = document.createElement('div');
            productElement.className = 'product_list_item';
            // const productLink = document.createElement('a');
            const productImageArea = document.createElement('div');
            productImageArea.className = 'item_img';
            const productImage = document.createElement('img');
            const productTextArea = document.createElement('div');
            productTextArea.className = 'item_text';
            const productName = document.createElement('p');
            productName.className = 'list_name';
            const productDescription = document.createElement('p');
            productDescription.className = 'list_sub';
            const productPrice = document.createElement('p');
            productPrice.className = 'list_price';
            
            // productLink.href += '/' + product.product_id;
            productImage.src += product.image;
            productName.innerHTML += product.name;
            productDescription.innerHTML += product.description;
            productPrice.innerHTML += "KRW " + addCommas(product.price);
            
            productList.appendChild(productElement);
            productElement.append(productImageArea, productTextArea);
            productImageArea.appendChild(productImage);
            productTextArea.append(productName, productDescription, productPrice);
            
            console.log(productList);
        })
    })
    .catch((error) => console.error(error));
