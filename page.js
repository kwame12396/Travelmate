import TripList from '../components/TripList'

export default function Home() {
  return (
    <main className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Trip Sharing App</h1>
      <TripList />
    </main>
  )
}
