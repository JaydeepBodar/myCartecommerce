import Profile from "@/Component/User/Profile";
import { cookies } from "next/dist/client/components/headers";
import axios from "axios";
async function getData() {
  const nextCookies = cookies();
  const productionheaders = nextCookies.get("__Secure-next-auth.session-token");
  const nextauthheaders = nextCookies.get("next-auth.session-token");
  // console.log("nextauthheaders",nextauthheaders)
  const { data } = await axios.get(`${process.env.API_URL}api/Address`, {
    cache: "no-store",
    headers: {
      Cookie:
        process.env.API_URL === "production"
          ? `__Secure-next-auth.session-token=${productionheaders?.value}`
          : `next-auth.session-token=${nextauthheaders?.value}`,
    },
  });
  if (!data) {
    console.log("error");
  }
  // console.log("data.address",data.address)
  return data.address;
}
const User = async () => {
  const address = await getData();
  // console.log("address", address);
  return <Profile address={address} />;
};

export default User;
