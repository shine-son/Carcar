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
                //  html 동적 생성
                productData.forEach((product) => {
                    // 상품데이터 html과 연결하기
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
                    productPrice.innerHTML += product.price;

                    productList.appendChild(productElement);
                    productElement.appendChild(productImage);
                    productElement.append(productName, productDescription, productPrice);
                });

            })
            .catch((error) => console.error("error: ", error));