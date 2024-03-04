import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from "../widget/layout";
import MainPage from "../pages/MainPage";
import CharactersPage from "../pages/CharactersPage";
import LocationPage from "../pages/LocationPage";
import './App.css';
import EpisodesPage from "@pages/EpisodesPage";


const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;