import React from "react";
import './App.css';
import About from './components/About';
import Degrees from "./components/Degrees";
import Employment from "./components/Employment";
import Faculty from "./components/Faculty";
import Contact from "./components/Contact";

export default class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <section id='About'><About /></section>
                <section id='Degrees'><Degrees /></section>
                <section id='Employment'><Employment /></section>
                <section id='Faculty'><Faculty /></section>
                <section id='Contact'><Contact /></section>
            </div>
        );
    }
}