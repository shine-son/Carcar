const productList = document.getElementById("new_product_area");
let productData = [];  // 상품데이터 배열로 받아오기

fetch("http://localhost:8080/product", { credential: false })
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log("response: ", json);
        productData = json;
        console.log(productData);
        // html 동적 생성
        productData.forEach((product) => {
            // 상품데이터 html과 연결하기
            const productElement = document.createElement("div");
            productElement.className = 'new_product'
            const productImage = document.createElement('img');
            productImage.className = 'new_img'
            const productTextArea = document.createElement('div');
            productTextArea.className = 'new_product_info'  // 제품 정보 영역
            const productName = document.createElement('p');
            productName.className = 'list_name'     // 제품 이름
            const productDescription = document.createElement('p');
            productDescription.className = 'list_sub'   // 제품 설명
            const productPrice = document.createElement('p');
            productPrice.className = 'list_price'   // 제품 가격
            productImage.src += product.image;
            productName.innerHTML += product.name;
            productDescription.innerHTML += product.description;
            productPrice.innerHTML += product.price
            productList.appendChild(productElement);
            productElement.appendChild(productImage);
            productElement.append(productName, productDescription, productPrice);
        })
    })
    .catch((error) => console.error("error: ", error));


$(document).ready( function() {
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 3000
    });
})    


   