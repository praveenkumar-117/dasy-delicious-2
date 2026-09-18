import React from "react";
import { useParams } from "react-router-dom";

import List from "./List";
import AddItems from "./AddItems";
import AllOrders from "./AllOrders";
import Feedbacks from "./Feedbacks";

const Admin = () => {
  const { page } = useParams();

  return (
    <div>
      {page === "list" && <List />}

      {page === "additems" && <AddItems />}

      {page === "allorders" && <AllOrders />}

      {page === "feedbacks" && <Feedbacks />}
    </div>
  );
};

export default Admin;
