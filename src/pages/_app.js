import "@/styles/globals.css";

import { Provider } from "react-redux";
import store, { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
