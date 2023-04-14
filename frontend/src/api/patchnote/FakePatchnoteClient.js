import axios from "axios";

export default class FakePatchnoteClient {
  async list() {
    return axios.get("/dummy/projectPatchnote.json").then((res) => {
      return res.data;
    });
  }
}
