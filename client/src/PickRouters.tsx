import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Friends from "./routes/Friends";
import Notifications from "./routes/Notifications";
import Chat from "./routes/Chat";
import Groups from "./routes/Groups";
import ProtectedRoute from "./routes/ProtectedRoute";
import Context from "./store/ContextApi";
import { InitialData } from "./store/ContextData";
import Profile from "./routes/Profile";

const Connection = React.lazy(() => import("./routes/Connection"));
const Home = React.lazy(() => import("./routes/Home"));

const Pickrouters = (): JSX.Element => {
  return (
    <Context.Provider value={InitialData}>
      <Routes>
        <Route path="/" element={<Connection />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="chat" element={<Chat />} />
            <Route path="friends" element={<Friends />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="groups" element={<Groups />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="test" element={<div>romeus clarens</div>} />
      </Routes>
    </Context.Provider>
  );
};

export default Pickrouters;
