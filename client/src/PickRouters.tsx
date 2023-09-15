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
import NotFound from "./routes/NotFound";
import GroupRating from "./routes/GroupRating";
import FriendsToChat from "./components/FriendsToChat";
import ChatSpace from "./routes/ChatSpace";
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
            <Route path="chat" element={<Chat />}>
              <Route index element={<FriendsToChat />} />
              <Route path=":id" element={<ChatSpace />} />
            </Route>
            <Route path="friends" element={<Friends />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="groups">
              <Route index element={<Groups />} />
              <Route path=":groupname" element={<GroupRating />} />
            </Route>
            <Route path="profile/:id" element={<Profile />} />
          </Route>
          <Route path="test" element={<ChatSpace />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Context.Provider>
  );
};

export default Pickrouters;
