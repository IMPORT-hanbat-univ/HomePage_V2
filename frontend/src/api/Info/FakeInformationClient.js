import axios from "axios";

export default class FakeInformationClient {
  async devList() {
    return axios.get("/dummy/info.json").then((res) => {
      return res.data.items;
    });
  }

  async devDetail(id, params) {
    return axios.get("/dummy/devInfoDetail.json").then((res) => {
      return res.data;
    });
  }
}
