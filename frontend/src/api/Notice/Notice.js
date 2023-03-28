export default class Notice {
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
