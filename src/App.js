// App.js

import React from "react";
import './App.css';
import About from './components/About';
import Degrees from "./components/Degrees";
import Employment from "./components/Employment";
import Faculty from "./components/Faculty";
import Navbar from './components/Navbar'; // Import the new component
import Header from './components/Header'; // Import the Header component
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton"; // Import the BackToTopButton component

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <nav id="Navigation"><Navbar /></nav>
        <header id='Header'><Header /></header>
        <section id='About'><About /></section>
        <section id='Degrees'><Degrees /></section>
        <section id='Employment'><Employment /></section>
        <section id='Faculty'><Faculty /></section>

        <footer id="Contact"> <Footer /> </footer><BackToTopButton />
      </div >
    );
  }
}
