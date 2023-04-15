export default class Patchnote {
  constructor(appClient) {
    this.httpClient = appClient;
  }

  getList(projectId) {
    return this.#list(projectId);
  }

  getDetail(patchnoteId) {
    return this.#detail(patchnoteId);
  }

  #detail(patchnoteId) {
    return this.httpClient.detail(patchnoteId);
  }
  #list(projectId) {
    return this.httpClient.list(projectId);
  }
}
