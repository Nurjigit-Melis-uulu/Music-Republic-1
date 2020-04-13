import React from "react";
import classes from "./Home.module.css";
import Header from "../../components/ui/Header/Header";
import Footer from "../../components/ui/Footer/Footer";
import Nav from "../../components/ui/Nav/Nav";
import Drawer from "../../components/Drawer/Drawer";
import PlayList from "../../components/Playlist/Playlist";

function Home(props) {
  return (
    <div className={classes.Home}>
      <div className={classes.container}>
        <Nav />
        <Header />
        <div className={classes.content}>
          <PlayList />
        </div>
        <Footer />
      </div>
      <Drawer />
    </div>
  );
}

export default Home;
