import axios from "axios";

export default class FakePatchnoteClient {
  async list() {
    return axios.get("/dummy/projectPatchnote.json").then((res) => {
      return res.data;
    });
  }

  async detail() {
    return axios.get("/dummy/patchnoteDetail.json").then((res) => {
      console.log("result", res);
      return res.data;
    });
  }
}
