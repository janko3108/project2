import React from "react";
import './App.css';
import About from './components/About';

export default class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <section id='About'><About /></section>
                <section id='Degrees'></section>
                <section id='Employment'></section>
                <section id='Faculty'></section>
                <section id='Contact'></section>
            </div>
        );
    }
}