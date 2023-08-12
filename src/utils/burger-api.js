export class Api {
  constructor(url) {
    this.url = url;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getIngredients() {
    return fetch(`${this.url}/ingredients`)
      .then((res) => this._handleServerResponse(res))
  }

  postOrder(order) {
    return fetch(`${this.url}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ingredients: order}),
    })
    .then((res) => this._handleServerResponse(res))
  }
}