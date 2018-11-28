import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home.js";
import Bank from "./Bank.js";
import AppHeader from "./AppHeader.js";

const Index = () => <Home />;
const NuBank = () => <Bank name='nubank' />;
const Neon = () => <Bank name='neon' />;
const Next = () => <Bank name='next' />;
const Inter = () => <Bank name='inter' />;

const AppRouter = () => (
  <Router>
    <div>
      <AppHeader />
      <Route path="/" exact component={Index} />
      <Route path="/nubank/" component={NuBank} />
      <Route path="/neon/" component={Neon} />
      <Route path="/next/" component={Next} />
      <Route path="/inter/" component={Inter} />
    </div>
  </Router>
);

export default AppRouter;
