const DATA = [
  {
    id: 1,
    userId: 'jihyun219',
    userName: 'jihyun',
    src: '/images/jihyunLee/profile.jpg',
  },
  {
    id: 2,
    userId: 'jihyun123',
    userName: 'jihyun',
    src: '/images/jihyunLee/profile.jpg',
  },
  {
    id: 3,
    userId: 'jiyoung999',
    userName: 'jihyun',
    src: '/images/jihyunLee/profile.jpg',
  },
];

function loadItems() {
  return fetch('')
    .then(res => DATA)
    .then(json => {
      console.log(json);
    });
}

loadItems().then(items => {
  console.log(items);
});
