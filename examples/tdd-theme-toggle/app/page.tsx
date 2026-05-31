import { ThemeToggle } from '../components/ThemeToggle'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">TDD Theme Toggle Demo</h1>
      <ThemeToggle />
    </main>
  )
}
