
import React, { useState } from 'react';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import MainContent from './components/MainContent';
import FinanceMainContent from './components/FinanceMainContent/FinanceMainContent';

import './styles/App.css'; // スタイルのインポート


function App() {

  const [activeView, setActiveView] = useState('schedule');

  return (
    <div className="app-container">
      {/** Header に現在のViewと切り替え用のハンドラを渡す */}
      <Header
        activeView={activeView}
        onChangeView={setActiveView} 
      />

      {activeView === 'schedule' ? (
        <MainContent />
      ) : (
        <FinanceMainContent />
      )}

      <Footer />
    </div>
  );
}

export default App;