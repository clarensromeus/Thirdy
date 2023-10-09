import { makeVar } from "@apollo/client";
// internally crafted imports of resources
import { IRealTimeNoti } from "../typings/Notifications";

export const AllNotifications = makeVar<IRealTimeNoti>({ Notifications: [] });

// we manage notifications using a global local state
// that's able to being sprung up a couple of possibilities
// using global state like having access notifications all over the application components
// with flexibility and speed and efficacy
