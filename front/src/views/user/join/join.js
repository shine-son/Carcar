// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const postalCodeInput = document.querySelector('#postalCodeInput');
const mainAddressInput = document.querySelector('#mainAdressInput');
const detailAddressInput = document.querySelector('#detailAddressInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');
// const log = document.getElementById('log');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    submitButton.addEventListener('click', handleSubmit);
}

fullNameInput.addEventListener('change', function () {
    const value = fullNameInput.value;

    // 입력값이 3자 이하인 경우 error 클래스를 가진 p 태그를 생성하여 추가
    if (value.length < 3) {
        let error = fullNameInput.nextElementSibling;

        if (!error || !error.classList.contains('error')) {
            error = document.createElement('p');
            error.classList.add('error');
            fullNameInput.insertAdjacentElement('afterend', error);
        }

        error.textContent = '입력값이 너무 짧습니다.';
    } else {
        // 입력값이 4자 이상인 경우 error 클래스를 가진 p 태그를 삭제
        const error = fullNameInput.nextElementSibling;

        if (error && error.classList.contains('error')) {
            error.remove();
        }
    }
});

// 회원가입 진행
async function handleSubmit(e) {
    e.preventDefault();

    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const phoneNumber = phoneNumberInput.value;
    const postalCode = postalCodeInput.value;
    const addressMain = mainAddressInput.value;
    const addressDetail = detailAddressInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    // 잘 입력했는지 확인
    const isFullNameValid = fullName.length >= 2;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 11;
    const isPasswordSame = password === passwordConfirm;

    if (!isFullNameValid || !isPasswordValid) {
        return alert('이름은 2글자 이상, 비밀번호는 11글자 이상이어야 합니다.');
    }

    if (!isEmailValid) {
        return alert('이메일 형식이 맞지 않습니다.');
    }

    if (!isPasswordSame) {
        return alert('비밀번호가 일치하지 않습니다.');
    }

    //객체 만들기
    const data = {
        fullName,
        email,
        phoneNumber,
        postalCode,
        addressMain,
        addressDetail,
        password,
        passwordConfirm,
    };

    //JSON 만들기
    const dataJson = JSON.stringify(data);

    const apiUrl = '';

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: dataJson,
    });
    if (res.status === 201) {
        alert('회원가입에 성공하였습니다!');
    } else {
        alert('회원가입에 실패하였습니다...');
    }

    const result = await res.json();
    console.log(result);
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
