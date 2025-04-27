import { Routes as RoutesReact, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Room } from "../pages/Room";

export default function Routes() {
  return (
    <RoutesReact>
      <Route path="/" element={<Home key={"home"} />} />
      <Route path="/room/:roomId" element={<Room key={"room"} />} />
    </RoutesReact>
  );
}
