import { ThemeToggle } from '../components/ThemeToggle'
import { ThemeProvider } from '../contexts/ThemeContext'

export default function Home() {
  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">TDD Theme Toggle Demo</h1>
        <ThemeToggle />
      </main>
    </ThemeProvider>
  )
}
