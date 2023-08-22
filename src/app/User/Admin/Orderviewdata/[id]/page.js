import axios from "axios";
import Orderview from "@/Component/Admin/Orderview";
async function getData(id) {
  const { data } = await axios.get(`${process.env.API_URL}api/Order/${id}`);
  if (!data) {
    console.log("data");
  }
  return data;
}

const page = async ({ params }) => {
  const order = await getData(params.id);
  return <Orderview order={order.order} />;
};

export default page;
