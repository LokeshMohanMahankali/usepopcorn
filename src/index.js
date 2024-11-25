import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import Appv1 from "./App-v1";
import reportWebVitals from "./reportWebVitals";
// import Starrating from "./Starrating";

// export function Test() {
//   return (
//     <>
//       <Starrating color="blue" />;
//     </>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Appv2 /> */}
    <Appv1 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
