import axios from "axios";

export default class FakeInformationClient {
  async devList() {
    return axios.get("/dummy/info.json").then((res) => {
      return res.data.items;
    });
  }
}
