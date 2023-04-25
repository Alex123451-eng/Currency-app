import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import fx from "money";

import { MainPage } from "./pages/mainPage/mainPage";
import { ConvertPage } from "./pages/convertPage/convertPage";
import { Nav } from "./components/nav/nav";
import { Loader } from "./components/loader/loader";

import { useRatesData } from "./feautures/useRatesData";

import { getData } from "./utils/getData";

import "antd/dist/reset.css";
import "./App.css";

export const App = () => {
  const { ratesData, saveRatesData } = useRatesData();

  const initData = async () => {
    const { rates, base } = await getData();

    fx.rates = rates;
    saveRatesData({ rates, base });
  };

  useEffect(() => {
    initData();

    const timerId = setInterval(() => {
      initData();
    }, 60000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <Router>
      <Nav />
      {Object.keys(ratesData.rates).length ? (
        <>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/convert-page">
            <ConvertPage />
          </Route>
        </>
      ) : (
        <Loader />
      )}
    </Router>
  );
};
