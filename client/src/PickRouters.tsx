import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./routes/Register";
import Thirdy from "./routes/Thirdy";
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
import FriendsToChat from "./components/Friends/FriendsToChat";
import ChatSpace from "./routes/ChatSpace";
import modeContext from "./store/ModeContext";
import { InitialMode } from "./store/ContextData";
import ForgotPassword from "./routes/Forgotpassword";
import ChangeStatus from "./routes/ChangeStatus";
import Verificationcode from "./routes/VerificationCode";
import RefreshToken from "./components/RefreshToken";

// lazy routes imports
const Connection = React.lazy(() => import("./routes/Connection"));
const Home = React.lazy(() => import("./routes/Home"));

const Pickrouters = (): JSX.Element => {
  return (
    <Context.Provider value={InitialData}>
      <modeContext.Provider value={InitialMode}>
        <Routes>
          <Route path="/" element={<Connection />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/thirdy" element={<Home />}>
              <Route index element={<Thirdy />} />
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
              <Route path="status" element={<ChangeStatus />} />
            </Route>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="verificationcode" element={<Verificationcode />} />
          <Route path="refreshToken" element={<RefreshToken />} />
        </Routes>
      </modeContext.Provider>
    </Context.Provider>
  );
};

export default Pickrouters;
