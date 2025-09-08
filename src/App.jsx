import { Provider } from "react-redux";
import { WebRouter } from "./router";
import store from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
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
