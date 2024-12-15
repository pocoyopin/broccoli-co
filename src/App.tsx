import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </div>
  );
}

export default App;
