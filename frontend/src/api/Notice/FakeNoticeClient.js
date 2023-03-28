import axios from "axios";

export default class FakeNoticeClient {
  async list() {
    return axios.get("/dummy/notice.json").then((res) => {
      return res.data.items;
    });
  }
}
