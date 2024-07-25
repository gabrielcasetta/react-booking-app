import React from 'react'
import AppRouter from './Router'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const App = () => {
  return (
    <div className="App bg-slate-50">
      <AppRouter />
    </div>
  )
}

export default App
