const config = {
  URL: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  },
}

//Проверка ответа от сервера
function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//Запрос на получение ингредиентов
export function getData() {
  return fetch(`${config.URL}/ingredients`, {
    method: 'GET',
    headers: config.headers,
  })
    .then((res) => handleServerResponse(res))
}

//Запрос на отправку заказа
export function postOrder(order) {
  return fetch(`${config.URL}/orders`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ ingredients: order }),
  })
    .then((res) => handleServerResponse(res))
}