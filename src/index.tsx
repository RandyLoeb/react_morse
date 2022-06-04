import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { TitleHeader } from './components/titleHeader';
import { MorseStore } from './stores/morseStore';
import SettingsArea from './components/settingsArea/settingsArea';
import WorkingTextArea from './components/workingTextArea/workingTextArea';
import AccordionArea from './components/accordion/accordionArea';
import FlaggedWordsAccordion from './components/accordion/flaggedWords/flaggedWords';
// You can specify which plugins you need
// Note that even though these don't seem to be used directly,
// they are used by the accordian.
import 'bootstrap'
import LessonsAccordion from './components/accordion/lessons/lessonsAccordion';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const morseStore:MorseStore = new MorseStore()
root.render(
  <React.StrictMode>
    <TitleHeader morseStore={morseStore}/>
    <SettingsArea morseStore={morseStore}/>
    <WorkingTextArea morseStore={morseStore}/>
    <AccordionArea>
      <LessonsAccordion morseStore={morseStore}/>
      <FlaggedWordsAccordion morseStore={morseStore}/>
      
    </AccordionArea>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
