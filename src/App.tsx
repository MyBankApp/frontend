import { createContext, useState } from 'react'
import './App.css'
import type { StoresType } from './types/StoresType'
import { BrowserRouter } from 'react-router-dom'
import AppContent from './AppContent'
import { userStore } from './store/UserStore'

export const Context = createContext<StoresType | null>(null)

function App() {
  const [currentStore] = useState<StoresType>({
    userStore: userStore
  })

  return (
    <div className='App'>
      <Context.Provider value={currentStore}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </Context.Provider>
    </div>
  )
}

export default App
