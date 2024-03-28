import React from "react";
import './App.css';
import About from './components/About';
import Degrees from "./components/Degrees";
import Employment from "./components/Employment";
import Faculty from "./components/Faculty";
import Navbar from './components/Navbar'; 
import Header from './components/Header'; 
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton"; 

/**
 * App component is the root component of the application.
 * It renders the main layout of the application including navigation, header, sections, footer, and back-to-top button.
 * @returns {JSX.Element} App component.
 */
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
        <footer id="Contact"> <Footer /> </footer>
        <BackToTopButton />
      </div >
    );
  }
}
