import axios from "axios";

export default axios.create({
  baseURL: "https://nsd-sc-ledgerqore.azuremicroservices.io/api/v1/",
});
