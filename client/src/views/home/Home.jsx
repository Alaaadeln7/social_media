import { Route, Routes } from "react-router-dom";
import Header from "../header/Header";
import CenterSide from "./CenterSide";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Friends from "../friends/Friends";
import Eevents from "../events/Events";
import SavedList from "../savedList/SavedList";
import Videos from "../videos/Videos";

export default function Home() {
  return (
    <section>
      <Header />
      <section className="flex justify-center gap-3 px-2 mt-5">
        <LeftSide />
        <Routes>
          <Route path="/" element={ 
          <>
            <CenterSide />
            <RightSide />
          </> 
        }
        />
          <Route path="/friends" element={ <Friends /> }/>
          <Route path="/events" element={ <Eevents /> }/>
          <Route path="/videos" element={ <Videos/> } />
          <Route path="/saved-list" element={ <SavedList/> } />
        </Routes>
      </section>
    </section>
  );
}
