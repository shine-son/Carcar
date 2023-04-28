const usersContainerBox = document.querySelector('.user_info_category_content');

addAllElements();

function addAllElements() {
    insertUserData();
}

// 페이지 로드 시 실행, 삭제할 회원 id를 전역변수로 관리함
let userIdToDelete;

//사용자 정보 받아오기
async function insertUserData() {
    const apiUrl = 'http://34.22.74.213:5000/api/admin/users';
    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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

    // const usersContainer = document.createElement('div'); // 새로운 div 요소 생성
    // usersContainer.setAttribute('id', 'usersContainer'); // 요소에 id 속성 추가

    for (const user of users) {
        const { createdAt, full_name, email, phone_number } = user;
        const date = createdAt.split('T')[0];

        usersContainerBox.insertAdjacentHTML(
            'afterbegin',
            `<div class="user_info" id="usersContainer-${email}">
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
        <button id="deleteBtn-${email}"class="delete_btn">
            회원 정보 삭제
        </button>
    </div>`
        );
    }

    const deleteBtn = document.querySelector(`#deleteBtn-${email}`);

    async function deleteUserData(e) {
        e.preventDefault();

        const userIdToDelete = email;

        console.log(email);
        try {
            // 삭제 진행
            await fetch('http://34.22.74.213:5000/api/admin/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(userIdToDelete),
            });

            // 삭제 성공
            await alert('회원 정보가 안전하게 삭제되었습니다.');

            // 삭제한 아이템 화면에서 지우기
            const deletedItem = document.querySelector(
                `#usersContainer-${userIdToDelete}`
            );
            deletedItem.remove();

            // 전역변수 초기화
            userIdToDelete = '';
        } catch (err) {
            alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
        }
    }
    deleteBtn.addEventListener('click', deleteUserData);
}
