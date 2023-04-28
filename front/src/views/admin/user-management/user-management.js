addAllElements();

function addAllElements() {
    insertUserData();
    deleteBtn.addEventListener('click', deleteUserData);
}

// 페이지 로드 시 실행, 삭제할 회원 id를 전역변수로 관리함
let userIdToDelete;

//사용자 정보 받아오기
async function insertUserData() {
    const apiUrl = 'http://34.22.74.213:5000/api/admin/users';
    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            // Authorization: `Bearer ${localStorage.getItem('token')}`,
            Authorization: `Bearer ${token}`,
        },
    });

    // 응답 코드가 4XX 계열일 때 (400, 403 등)
    if (!res.ok) {
        const errorContent = await res.json();
        const { reason } = errorContent;

        throw new Error(reason);
    }

    const users = await res.json();
    console.log(users);

    for (const user of users) {
        const { createdAt, full_name, email, phone_number } = user;
        const date = createdAt.split('T')[0];

        usersContainer.insertAdjacentHTML(
            'beforeend',
            `<div class="user_info" id="usersContainer">
        <div id="registerDate" class="register_date">
            ${date}
        </div>
        <div id="fullName" class="user_name">${full_name}</div>
        <div id="email" class="user_email">
            ${email}
        </div>
        <div id="phoneNumber" class="user_phone_number">
            ${phone_number}
        </div>
        <button id="deleteBtn" class="delete_btn">
            회원 정보 삭제
        </button>
    </div>`
        );
    }
}

const deleteBtn = document.querySelector('#deleteBtn');

async function deleteUserData(e) {
    e.preventDefault();

    try {
        // 삭제 진행
        await fetch('http://34.22.74.213:5000/api/users/info', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${localStorage.getItem('token')}`,
                Authorization: `Bearer ${token}`,
                // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRhMGJkNmMyZDFmNzgxYzVlZDIyNGEiLCJyb2xlIjoiYmFzaWMtdXNlciIsImlhdCI6MTY4MjU3NDMwM30.bgUqu4-l9mveMUFdPxVR4A0CbWVzuuuzQMk1_OF0aFE`,
            },
            body: JSON.stringify(userIdToDelete),
        });

        // 삭제 성공
        alert('회원 정보가 안전하게 삭제되었습니다.');

        // 삭제한 아이템 화면에서 지우기
        const deletedItem = document.querySelector(`#user-${userIdToDelete}`);
        deletedItem.remove();

        // 전역변수 초기화
        userIdToDelete = '';
    } catch (err) {
        alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
    }
}
