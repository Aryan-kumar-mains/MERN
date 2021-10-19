
import { BrowserRouter, Switch, Route } from "react-router-dom"

// components
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import { TemplateProvider } from "./templates/TemplateProvider";
import ContextProvider from "./context/ContextProvider";
import DetailView from "./components/product/DetailView";
import { Box } from "@material-ui/core";

function App() {
  return (
    <TemplateProvider>
      <ContextProvider>    {/* Context provides a way to pass data through the component tree without having to pass props down manually at every level. */}
        <BrowserRouter>    {/* BrowserRouter: Uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL. */}
          <Header />
          <Box style={{marginTop: 54}}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/product/:id" component={DetailView} />
            </Switch>
          </Box>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;
