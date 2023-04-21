// import * as Api from '/api.js';
// import { validateEmail } from '/useful-functions.js';

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

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    submitButton.addEventListener('click', handleSubmit);
}

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

    // 회원가입 api 요청
    // try {
    //     // const data = { fullName, email, password };
    //     const data = {
    //         fullName,
    //         email,
    //         phoneNumber,
    //         postalCode,
    //         addressMain,
    //         addressDetail,
    //         password,
    //         passwordConfirm,
    //     };

    //     await Api.post('/api/join', data);

    //     alert(`정상적으로 회원가입되었습니다.`);

    //     // 로그인 페이지 이동
    //     window.location.href = '/login';
    // } catch (err) {
    //     console.error(err.stack);
    //     alert(
    //         `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
    //     );
    // }

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
