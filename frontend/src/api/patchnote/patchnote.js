export default class Patchnote {
  constructor(appClient) {
    this.httpClient = appClient;
  }

  getList(projectId) {
    return this.#list(projectId);
  }

  #list(projectId) {
    return this.httpClient.list(projectId);
  }
}
