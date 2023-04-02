export default class Information {
    constructor(appClient) {
      this.httpClient = appClient;
    }
  
    getDevList() {
      return this.#devlist();
    }
  
    #devlist() {
      return this.httpClient.devList();
    }
  }
  