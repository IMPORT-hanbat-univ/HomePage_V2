export default class QnA {
  constructor(appClient) {
    this.httpClient = appClient;
  }

  getList() {
    return this.#list();
  }

  #list() {
    return this.httpClient.list();
  }
}
