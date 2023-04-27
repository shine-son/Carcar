import * as Api from '../../api.js';

addAllElements();

function addAllElements() {
    insertUserData();
}

const setUserData = (selector, text) => {
    document.querySelector(selector).textContent = text;
};

//사용자 정보 받아오기
async function insertUserData() {
    const userData = await Api.get('http://34.22.74.213:5000/api/users/info');
    const { createdAt, full_name, email, phone_number } = userData;

    // console.log(userData);
    setUserData('.register_date', createdAt);
    setUserData('.user_name', full_name);
    setUserData('.user_email', email);
    setUserData('.user_phone_number', phone_number);
}
