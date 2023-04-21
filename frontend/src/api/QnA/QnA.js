export default class QnA {
  constructor(appClient) {
    this.httpClient = appClient;
  }
  getDetail(id) {
    return this.#detail(id);
  }

  #detail(id) {
    return this.httpClient.detail(id);
  }

  getList() {
    return this.#list();
  }

  #list() {
    return this.httpClient.list();
  }
}
