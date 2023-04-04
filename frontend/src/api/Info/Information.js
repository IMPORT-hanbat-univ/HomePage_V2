export default class Information {
  constructor(appClient) {
    this.httpClient = appClient;
  }

  getDevList() {
    return this.#devlist();
  }

  getDevDetail(id) {
    return this.#devDetail(id);
  }

  #devDetail(id) {
    return this.httpClient.devDetail(id);
  }

  #devlist() {
    return this.httpClient.devList();
  }
}
