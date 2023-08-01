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
}