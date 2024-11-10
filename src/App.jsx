import './App.css'
import AppRouter from './router'
import { PinnedRacesProvider } from "./contexts/PinnedRacesContext";

function App() {

  return (
    <main>
      <PinnedRacesProvider>
      <AppRouter />
      </PinnedRacesProvider>
    </main>
  )
}

export default App
