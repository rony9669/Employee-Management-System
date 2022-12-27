import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

//CREATE A Client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}
