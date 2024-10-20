'use client'

import { useState } from 'react'
import { MapPin, Calendar, Package, DollarSign, MessageCircle, X } from 'lucide-react'
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { countries } from '../data/countries'
import { convertCurrency } from '../utils/currencyConverter'

// Updated mock data for trips
const trips = [
  { id: 1, from: 'New York', to: 'Los Angeles', date: '2023-07-15', space: '10kg', price: 25, user: 'John D.', currency: 'USD' },
  { id: 2, from: 'London', to: 'Paris', date: '2023-07-18', space: '5kg', price: 15, user: 'Emma S.', currency: 'GBP' },
  { id: 3, from: 'Tokyo', to: 'Osaka', date: '2023-07-20', space: '8kg', price: 20, user: 'Yuki T.', currency: 'JPY' },
  { id: 4, from: 'Berlin', to: 'Munich', date: '2023-07-22', space: '15kg', price: 30, user: 'Hans M.', currency: 'EUR' },
  { id: 5, from: 'Toronto', to: 'Vancouver', date: '2023-07-25', space: '12kg', price: 28, user: 'Sarah L.', currency: 'CAD' },
]

export default function TripList() {
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [fromCountry, setFromCountry] = useState('')
  const [toCountry, setToCountry] = useState('')
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [userCurrency, setUserCurrency] = useState('USD')

  const filteredTrips = trips.filter(trip => 
    (trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.to.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!fromCity || trip.from === fromCity) &&
    (!toCity || trip.to === toCity)
  )

  const handleFromCountryChange = (e) => {
    setFromCountry(e.target.value)
    setFromCity('')
  }

  const handleToCountryChange = (e) => {
    setToCountry(e.target.value)
    setToCity('')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Trips</h2>
      <input
        type="text"
        placeholder="Search by origin or destination"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <select
            value={fromCountry}
            onChange={handleFromCountryChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select origin country</option>
            {countries.map(country => (
              <option key={country.name} value={country.name}>{country.name}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={toCountry}
            onChange={handleToCountryChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select destination country</option>
            {countries.map(country => (
              <option key={country.name} value={country.name}>{country.name}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select origin city</option>
            {fromCountry && countries.find(c => c.name === fromCountry).cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select destination city</option>
            {toCountry && countries.find(c => c.name === toCountry).cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <select
          value={userCurrency}
          onChange={(e) => setUserCurrency(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more currency options */}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTrips.map((trip) => (
          <Card key={trip.id} className="cursor-pointer" onClick={() => setSelectedTrip(trip)}>
            <CardHeader>
              <CardTitle>{trip.from} to {trip.to}</CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {trip.date}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  <span>{trip.space}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>
                    {convertCurrency(trip.price, trip.currency, userCurrency).toFixed(2)} {userCurrency}/kg
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={`/placeholder-avatar.jpg`} />
                  <AvatarFallback>{trip.user[0]}</AvatarFallback>
                </Avatar>
                <span>{trip.user}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" /> Contact Traveler
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md relative">
            <Button
              className="absolute top-2 right-2 p-1"
              variant="ghost"
              onClick={() => setSelectedTrip(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            <CardHeader>
              <CardTitle>{selectedTrip.from} to {selectedTrip.to}</CardTitle>
              <CardDescription>Trip Details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Date: {selectedTrip.date}</span>
                </div>
                <div className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  <span>Available Space: {selectedTrip.space}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>Price: ${selectedTrip.price}/kg</span>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={`/placeholder-avatar.jpg`} />
                    <AvatarFallback>{selectedTrip.user[0]}</AvatarFallback>
                  </Avatar>
                  <span>Traveler: {selectedTrip.user}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedTrip(null)}>Close</Button>
              <Button>
                <MessageCircle className="mr-2 h-4 w-4" /> Contact Traveler
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
