import React from "react";
import { RemoteComponent } from "./RemoteComponent";

const Title = (props) => {
  const url1 = "http://localhost:5000/ui/Title.js";
  return (
    <RemoteComponent
      url={url1}
      render={({ err, Component }) =>
        err ? <div>{err.toString()}</div> : <Component {...props} />
      }
    />
  );
};

export { Title };

const Deposits = (props) => {
  const url = "http://localhost:5000/ui/Deposits.js"; // prettier-ignore

  return (
    <RemoteComponent
      url={url}
      render={({ err, Component }) =>
        err ? <div>{err.toString()}</div> : <Component {...props} />
      }
    />
  );
};
export { Deposits };

const Chart = (props) => {
  const url = "http://localhost:5000/ui/Chart.js"; // prettier-ignore

  return (
    <RemoteComponent
      url={url}
      render={({ err, Component }) =>
        err ? <div>{err.toString()}</div> : <Component {...props} />
      }
    />
  );
};
export { Chart };

const Orders = (props) => {
  const url = "http://localhost:5000/ui/Orders.js"; // prettier-ignore

  return (
    <RemoteComponent
      url={url}
      render={({ err, Component }) =>
        err ? <div>{err.toString()}</div> : <Component {...props} />
      }
    />
  );
};
export { Orders };

const listItems = (props) => {
  const url = "http://localhost:5000/ui/listItems.js"; // prettier-ignore

  return (
    <RemoteComponent
      url={url}
      render={({ err, Component }) =>
        err ? <div>{err.toString()}</div> : <Component {...props} />
      }
    />
  );
};
export { listItems };
