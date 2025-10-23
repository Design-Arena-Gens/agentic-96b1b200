'use client'

import { useState } from 'react'
import { Star, Search, Filter, TrendingUp, MessageSquare, Clock } from 'lucide-react'

type Sentiment = 'positive' | 'negative' | 'neutral'
type Platform = 'google' | 'makemytrip' | 'booking' | 'tripadvisor'

interface Review {
  id: string
  guestName: string
  rating: number
  platform: Platform
  sentiment: Sentiment
  snippet: string
  fullText: string
  date: string
  aiAnalysis: {
    sentiment: Sentiment
    keyPoints: string[]
    suggestedResponse: string
  }
}

const mockReviews: Review[] = [
  {
    id: '1',
    guestName: 'Priya S.',
    rating: 5,
    platform: 'google',
    sentiment: 'positive',
    snippet: 'Absolutely wonderful stay! The staff was incredibly welcoming...',
    fullText: 'Absolutely wonderful stay! The staff was incredibly welcoming and the rooms were spotless. The location is perfect for exploring the city. Breakfast was delicious with authentic Indian options. Highly recommend!',
    date: '2 hours ago',
    aiAnalysis: {
      sentiment: 'positive',
      keyPoints: ['Excellent staff service', 'Clean rooms', 'Great location', 'Quality breakfast'],
      suggestedResponse: 'Thank you so much, Priya! We\'re delighted you enjoyed your stay. Our team takes great pride in providing warm hospitality. We look forward to welcoming you back soon!'
    }
  },
  {
    id: '2',
    guestName: 'Rajesh K.',
    rating: 2,
    platform: 'makemytrip',
    sentiment: 'negative',
    snippet: 'Room maintenance needs attention. AC was not working properly...',
    fullText: 'Room maintenance needs attention. AC was not working properly and took 3 hours to fix. The reception staff tried their best but facilities need upgrading. Location is good though.',
    date: '5 hours ago',
    aiAnalysis: {
      sentiment: 'negative',
      keyPoints: ['AC maintenance issue', 'Slow response time', 'Facilities need upgrade', 'Good location', 'Staff tried to help'],
      suggestedResponse: 'Dear Rajesh, we sincerely apologize for the AC issue. This is not the experience we want for our guests. We\'re addressing the maintenance immediately. Please contact us directly so we can make this right.'
    }
  },
  {
    id: '3',
    guestName: 'Anita M.',
    rating: 4,
    platform: 'booking',
    sentiment: 'positive',
    snippet: 'Great value for money. Comfortable beds and friendly staff...',
    fullText: 'Great value for money. Comfortable beds and friendly staff. The WiFi speed could be better for business travelers. Overall a pleasant experience, would stay again.',
    date: '1 day ago',
    aiAnalysis: {
      sentiment: 'positive',
      keyPoints: ['Good value', 'Comfortable beds', 'Friendly staff', 'WiFi needs improvement'],
      suggestedResponse: 'Thank you, Anita! We\'re glad you enjoyed your stay. We\'re currently upgrading our WiFi infrastructure to better serve business travelers. Hope to see you again!'
    }
  },
  {
    id: '4',
    guestName: 'Vikram D.',
    rating: 5,
    platform: 'tripadvisor',
    sentiment: 'positive',
    snippet: 'Perfect family vacation! Kids loved the pool and play area...',
    fullText: 'Perfect family vacation! Kids loved the pool and play area. Staff went above and beyond to make our stay special. Room service was quick and food quality excellent. Best hotel in the area!',
    date: '2 days ago',
    aiAnalysis: {
      sentiment: 'positive',
      keyPoints: ['Family-friendly facilities', 'Exceptional staff service', 'Quick room service', 'Quality food'],
      suggestedResponse: 'We\'re thrilled your family had a wonderful time, Vikram! Our team loves making special memories for families. Thank you for this amazing review, and we can\'t wait to host you again!'
    }
  },
  {
    id: '5',
    guestName: 'Meera P.',
    rating: 3,
    platform: 'google',
    sentiment: 'neutral',
    snippet: 'Decent stay, nothing exceptional. Rooms are average sized...',
    fullText: 'Decent stay, nothing exceptional. Rooms are average sized, clean enough. Staff is professional but not very warm. Breakfast spread could be better. Fair for the price paid.',
    date: '3 days ago',
    aiAnalysis: {
      sentiment: 'neutral',
      keyPoints: ['Average experience', 'Clean rooms', 'Professional staff lacking warmth', 'Breakfast needs improvement'],
      suggestedResponse: 'Thank you for your feedback, Meera. We appreciate your honest review. We\'re working on enhancing our breakfast menu and staff training. We hope to exceed your expectations next time!'
    }
  },
]

const platformColors = {
  google: 'bg-red-50 border-red-200',
  makemytrip: 'bg-blue-50 border-blue-200',
  booking: 'bg-indigo-50 border-indigo-200',
  tripadvisor: 'bg-green-50 border-green-200',
}

const platformIcons = {
  google: 'G',
  makemytrip: 'MMT',
  booking: 'B.com',
  tripadvisor: 'TA',
}

const sentimentConfig = {
  positive: { color: 'bg-green-500', emoji: '😊', label: 'Positive' },
  negative: { color: 'bg-red-500', emoji: '😠', label: 'Negative' },
  neutral: { color: 'bg-gray-400', emoji: '😐', label: 'Neutral' },
}

export default function Dashboard() {
  const [selectedReview, setSelectedReview] = useState<Review>(mockReviews[0])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredReviews = mockReviews.filter(review =>
    review.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.fullText.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-bold text-xl shadow-md">
                Ritam
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Reviews Dashboard</h1>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">4.2 Avg Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">{mockReviews.length} Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-140px)]">
          {/* Left Column - Review Feed */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
                  <Filter className="w-4 h-4" />
                  <span>All Platforms</span>
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
                  All Sentiments
                </button>
              </div>
            </div>

            {/* Review List */}
            <div className="flex-1 overflow-y-auto">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  onClick={() => setSelectedReview(review)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition hover:bg-gray-50 ${
                    selectedReview.id === review.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{review.guestName}</span>
                      <div className={`px-2 py-0.5 rounded text-xs font-medium border ${platformColors[review.platform]}`}>
                        {platformIcons[review.platform]}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${sentimentConfig[review.sentiment].color}`} />
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{review.snippet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
            {/* Review Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedReview.guestName}</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < selectedReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{selectedReview.date}</span>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg border-2 ${platformColors[selectedReview.platform]}`}>
                  <span className="font-semibold text-sm">{platformIcons[selectedReview.platform]}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Full Review */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Full Review
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{selectedReview.fullText}</p>
                </div>
              </div>

              {/* AI Sentiment Analysis */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    AI
                  </div>
                  Sentiment Analysis
                </h3>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${sentimentConfig[selectedReview.aiAnalysis.sentiment].color}`} />
                    <span className="font-semibold text-gray-800 text-lg">
                      {sentimentConfig[selectedReview.aiAnalysis.sentiment].label}
                    </span>
                    <span className="text-2xl">{sentimentConfig[selectedReview.aiAnalysis.sentiment].emoji}</span>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Key Points Identified:</p>
                    <ul className="space-y-1.5">
                      {selectedReview.aiAnalysis.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Suggested Response */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">AI Suggested Response</h3>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-gray-700 leading-relaxed mb-4">{selectedReview.aiAnalysis.suggestedResponse}</p>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
                      Use This Response
                    </button>
                    <button className="px-4 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
