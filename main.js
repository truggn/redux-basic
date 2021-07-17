
//state
// reducer
//store
const { createStore } = window.Redux

const initialState = JSON.parse(localStorage.getItem('hobby-list')) || []

const soThichs = (state = initialState, action) => {
    // check action.type 
    switch (action.type) {
        case 'ADD_SOTHICH': {
            const newList = [...state];  // tạo state mới clone từ state hiện tại (clone mảng mới, tránh dính tham chiếu)
            newList.push(action.payload);
            return newList;
        };

        default: state // sẽ là state hiện tại
    }

    return state
};

const store = createStore(soThichs);

// tạo 1 function render sở thích từ list sở thích

const renderListSoThich = (listSoThich) => {
    if (!Array.isArray(listSoThich) || listSoThich.length === 0) return;

    const ulElement = document.querySelector('#hobby-list')
    if (!ulElement) return;

    // reset lần render trước đó
    ulElement.innerHTML = ''

    // lặp qua cái mảng listSoThich
    for (let elSoThich of listSoThich) {
        const liElment = document.createElement('li');
        liElment.textContent = elSoThich
        // sau khi lặp qua list thì appen vào thẻ ul cha
        ulElement.appendChild(liElment)
    }
};

// render initial list sở thích 
const initialListSoThich = store.getState();

renderListSoThich(initialListSoThich);

//handle form submit 

const formSubmitSoThich = document.querySelector('#add-hobby-list');

if (formSubmitSoThich) {
    const handleformSubmit = (e) => {
        e.preventDefault();

        const hobbyText = formSubmitSoThich.querySelector('#hobby-text')
        if (!hobbyText) return;

        // dispath action để add vào redux
        const action = {
            type: 'ADD_SOTHICH',
            payload: hobbyText.value // value user nhập
        };

        // gọi store sau đó dispath gửi lên store để xử lý.
        store.dispatch(action);

        formSubmitSoThich.reset();

    }
    formSubmitSoThich.addEventListener('submit', handleformSubmit)
};

// mỗi lần state thay đổi thì mình update UI
store.subscribe(() => {
    const newListSoThich = store.getState();
    renderListSoThich(newListSoThich);

    // luu el vào localstorage

    localStorage.setItem('hobby-list', JSON.stringify(newListSoThich))
});


