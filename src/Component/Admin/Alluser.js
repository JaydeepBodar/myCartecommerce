import React from "react";
import Custompagination from "../Custompagination";
import Userview from "./Userview";
import Loader from "../Loader";
const Alluser = ({ user, totalitem, userperpage, loading,loader }) => {
  return (
    <div>
      {loading && (
        <div className="h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading &&
        user?.map((item) => {
          return <Userview user={item} key={item._id} />;
        })}
      <Custompagination
        itemperpage={userperpage}
        totalitem={totalitem}
        loader={loader}
      />
    </div>
  );
};

export default Alluser;
