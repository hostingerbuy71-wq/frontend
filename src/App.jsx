import { Provider } from "react-redux";
import { WebRouter } from "./router";
import store from "./store/store";
// Bootstrap CSS is loaded once from main.jsx to keep order stable across builds
function App() {
  return (
    <>
      <Provider store={store}>
        <WebRouter />
      </Provider>
    </>
  );
}

export default App;
