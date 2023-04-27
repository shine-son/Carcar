// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const userEmail = document.querySelector('#user_email');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const postalCodeInput = document.querySelector('#postalCodeInput');
const mainAddressInput = document.querySelector('#mainAdressInput');
const detailAddressInput = document.querySelector('#detailAddressInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const saveButton = document.querySelector('#save_button');
const deleteUser = document.querySelector('#delete_user');

//회원정보 수정 기능

//에러메시지 정리
const errors = {
    nameError: '이름은 3자 이상이어야 합니다.',
    phoneNumberError: '올바른 전화번호를 입력해주세요.',
    passwordError: '비밀번호는 11자 이상이어야 합니다.',
    confirmPasswordError: '비밀번호가 일치하지 않습니다.',
};

addAllElements();
addAllEventListeners();

// 요소 삽입 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {}

//이름 검사 함수
function validateName() {
    const name = fullNameInput.value.trim();
    const error = document.querySelector('#fullNameInput + .error');
    error.textContent = name && name.length >= 3 ? '' : errors.nameError;
    return !!name && name.length >= 3;
}

//비밀번호 검사 함수
function validatePasswordConfirm() {
    const password = passwordConfirmInput.value.trim();
    const error = document.querySelector('#passwordConfirmInput + .error');
    if (password.length < 11) {
        error.textContent = errors.passwordError;
        return false;
    } else {
        error.textContent = '';
        return true;
    }
}

//비밀번호 일치여부 검사 함수
// function validatePasswordConfirm() {
//     const password = passwordInput.value.trim();
//     const passwordConfirm = passwordConfirmInput.value.trim();
//     const error = document.querySelector('#passwordConfirmInput + .error');
//     if (password !== passwordConfirm) {
//         error.textContent = errors.confirmPasswordError;
//         return false;
//     } else {
//         error.textContent = '';
//         return true;
//     }
// }

//전화번호 검사 함수
function validatePhoneNumber() {
    const phoneNumber = phoneNumberInput.value.trim();
    const error = document.querySelector('#phoneNumberInput + .error');
    const isValidPhoneNumber = /^[0-9]{10,11}$/.test(phoneNumber);
    error.textContent = isValidPhoneNumber ? '' : errors.phoneNumberError;
    return isValidPhoneNumber;
}

//빈값 검사
function validateOthers() {
    const postalCode = postalCodeInput.value.trim();
    const mainAdress = mainAddressInput.value.trim();
    const detailAddress = detailAddressInput.value.trim();
    if (!postalCode || !mainAdress || !detailAddress) {
        return false;
    }
    return true;
}

// 모든 조건 검사 함수
function validateAll() {
    const isNameValid = validateName();
    if (!isNameValid) {
        return;
    }
    const isPasswordConfirmValid = validatePasswordConfirm();
    if (!isPasswordConfirmValid) {
        return;
    }
    const isNumberValid = validatePhoneNumber();
    if (!isNumberValid) {
        return;
    }
    const isOthersValid = validateOthers();
    if (!isOthersValid) {
        return;
    }

    saveButton.disabled = false;
}

function addAllEventListeners() {
    const inputFields = [
        fullNameInput,
        passwordConfirmInput,
        phoneNumberInput,
        postalCodeInput,
        mainAddressInput,
        detailAddressInput,
    ];

    inputFields.forEach((input) => {
        input.addEventListener('input', validateAll);
        if (input.type === 'password') {
            input.addEventListener('change', validateAll);
        } else {
            input.addEventListener('blur', validateAll);
        }
    });
}

//저장하기 버튼 클릭 후 input값 초기화
function resetFields() {
    fullNameInput.value = '';
    passwordInput.value = '';
    passwordConfirmInput.value = '';
    phoneNumberInput.value = '';
    postalCodeInput.value = '';
    mainAddressInput.value = '';
    detailAddressInput.value = '';
}

const setUserData = (selector, text) => {
    document.querySelector(selector).textContent = text;
};

//기존 회원 정보 받아오기
async function insertUserData() {
    userData = await Api.get('http://34.22.74.213:5000/api/users/info');

    userData = {
        fullName,
        email,
        phoneNumber,
        address: {
            postalCode,
            addressMain,
            addressDetail,
        },
    };

    setUserData('.user_email', userData.email);
}

async function saveUserData(e) {
    e.prevent.value;

    const fullName = fullNameInput.value;
    //이전에 입력된 비밀번호 검사는 백엔드 단에서?
    const currentPassword = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    const phoneNumber = phoneNumberInput.value;
    const postalCode = postalCodeInput.value;
    const addressMain = addressMain.value;
    const addressDetail = addressDetail.value;

    const data = { currentPassword };

    if (fullName !== userData.fullName) {
        data.fullName = fullName;
    }

    if (passwordConfirm !== userData.password) {
        data.password = passwordConfirm;
    }

    if (phoneNumber !== userData.phoneNumber) {
        data.phoneNumber = phoneNumber;
    }

    if (postalCode !== userData.address.postalCode) {
        data.address.postalCode = postalCode;
    }

    if (addressMain !== userData.address.addressMain) {
        data.address.addressMain = addressMain;
    }

    if (addressDetail !== userData.address.addressDetail) {
        data.address.addressDetail = addressDetail;
    }

    try {
        const { _id } = userData;
        //db에 수정된 정보 저장
        await Api.put('http://34.22.74.213:5000/api/users/info', _id, data);

        alert('회원정보가 수정되었습니다.');
        resetFields();
    } catch (err) {
        alert(`회원정보 저장 과정에서 오류가 발생하였습니다: ${err}`);
    }
}

// //회원가입 수정 진행
// const getUserData = async () => {
//     try {
//         const response = await fetch('./userData.json');
//         const data = response.json;
//         return data[0];
//     } catch (error) {
//         return console.log(error);
//     }
// };

// const updateUserData = (newUserData) => {
//     getUserData()
//         .then((userData) => {
//             //기존 user 데이터와 새로 입력받은 데이터를 비교
//             const updatedUserData = {
//                 ...userData,
//                 ...newUserData,
//             };

//             //업데이트할 필요가 있는 경우 fetch API를 이용해 서버에 새로운 user 데이터를 보냄
//             if (JSON.stringify(updatedUserData) !== JSON.stringify(userData)) {
//                 fetch('/updateUserData', {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(updatedUserData),
//                 })
//                     .then((response) => response.json())
//                     .then((data) => console.log(data))
//                     .catch((error) => console.log(error));
//             }
//         })
//         .catch((error) => console.log(error));
// };

saveButton.addEventListener('click', saveUserData);

//------------------------------------------

//회원탈퇴 기능 구현

//회원탈퇴란 엔터키 입력시 실행되는 함수
// const handleEnterkey = (event) => {
//     if (event.key === 'Enter' && event.target.value === '회원탈퇴') {
//         console.log('회원탈퇴 실행');
//     }
// };

//회원탈퇴란에서 keyup 이벤트 발생시 handleEnterkey 함수 실행
deleteUser.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        deleteUserData(e);
    }
});

//db에서 회원정보 삭제
async function deleteUserData(e) {
    e.preventDefault();

    const password = passwordInput.value;
    const data = { password };

    try {
        // 우선 입력된 비밀번호가 맞는지 확인 (틀리면 에러 발생함)
        const userToDelete = await Api.post(
            'http://34.22.74.213:5000/api/users/info',
            data
        );
        const { _id } = userToDelete;

        // 삭제 진행
        await Api.delete('http://34.22.74.213:5000/api/users/info', _id);

        // 삭제 성공
        alert('회원 정보가 안전하게 삭제되었습니다.');

        // 토큰 삭제
        sessionStorage.removeItem('token');

        window.location.href = '/';
    } catch (err) {
        alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
    }
}
