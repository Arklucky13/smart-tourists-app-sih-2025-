import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Locate,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Settings,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Route,
  Map,
  Satellite,
  Search,
  X,
  NavigationOff,
  Phone,
  AlertTriangle
} from 'lucide-react';

interface GPSNavigationProps {
  onBack: () => void;
}

interface NavigationStep {
  id: string;
  instruction: string;
  distance: string;
  direction: 'straight' | 'left' | 'right' | 'u-turn';
  icon: React.ReactNode;
}

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
}

const mockLocations: Location[] = [
  { id: '1', name: 'Taj Mahal', address: 'Agra, Uttar Pradesh', coordinates: { lat: 27.1751, lng: 78.0421 } },
  { id: '2', name: 'India Gate', address: 'New Delhi', coordinates: { lat: 28.6129, lng: 77.2295 } },
  { id: '3', name: 'Gateway of India', address: 'Mumbai, Maharashtra', coordinates: { lat: 18.9220, lng: 72.8347 } },
  { id: '4', name: 'Hawa Mahal', address: 'Jaipur, Rajasthan', coordinates: { lat: 26.9239, lng: 75.8267 } },
  { id: '5', name: 'Mysore Palace', address: 'Mysore, Karnataka', coordinates: { lat: 12.3051, lng: 76.6551 } }
];

const mockNavigationSteps: NavigationStep[] = [
  {
    id: '1',
    instruction: 'Head northeast on Main Road toward City Center',
    distance: '0.5 km',
    direction: 'straight',
    icon: <ArrowUp className="w-4 h-4" />
  },
  {
    id: '2',
    instruction: 'Turn right at the traffic light onto Heritage Street',
    distance: '1.2 km',
    direction: 'right',
    icon: <ChevronRight className="w-4 h-4" />
  },
  {
    id: '3',
    instruction: 'Continue straight for 800m past the market',
    distance: '0.8 km',
    direction: 'straight',
    icon: <ArrowUp className="w-4 h-4" />
  },
  {
    id: '4',
    instruction: 'Turn left onto Tourist Complex Road',
    distance: '0.3 km',
    direction: 'left',
    icon: <ChevronLeft className="w-4 h-4" />
  },
  {
    id: '5',
    instruction: 'Destination will be on your right',
    distance: '50 m',
    direction: 'straight',
    icon: <MapPin className="w-4 h-4" />
  }
];

export function GPSNavigation({ onBack }: GPSNavigationProps) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [routeOptions, setRouteOptions] = useState({
    avoidTolls: false,
    avoidHighways: false,
    fastestRoute: true
  });

  // Mock current location
  useEffect(() => {
    // Simulate getting current location
    setTimeout(() => {
      setCurrentLocation({
        id: 'current',
        name: 'Your Location',
        address: 'Current GPS Position',
        coordinates: { lat: 28.6139, lng: 77.2090 }
      });
    }, 1000);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockLocations.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      // Set current location as starting point
      console.log('Using current location as starting point');
    }
  };

  const handleChooseStartingPoint = () => {
    // Open location picker for starting point
    console.log('Choose starting point');
  };

  const handleDestinationSelect = (location: Location) => {
    setDestination(location);
    setSearchQuery(location.name);
    setShowSearchResults(false);
  };

  const handleStartNavigation = () => {
    if (destination) {
      setIsNavigating(true);
      setCurrentStepIndex(0);
    }
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < mockNavigationSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'left': return <ChevronLeft className="w-6 h-6 text-blue-400" />;
      case 'right': return <ChevronRight className="w-6 h-6 text-blue-400" />;
      case 'u-turn': return <RotateCcw className="w-6 h-6 text-blue-400" />;
      default: return <ArrowUp className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/95 backdrop-blur-sm border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">GPS Navigation</h1>
        </div>
        
        {/* Emergency button */}
        <Button
          className="bg-red-600 hover:bg-red-700 text-white"
          size="sm"
        >
          <Phone className="w-4 h-4 mr-2" />
          Emergency
        </Button>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Controls and Navigation */}
        <div className="w-96 bg-black/90 backdrop-blur-sm border-r border-gray-800 flex flex-col">
          {/* Location Picker */}
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-lg font-medium mb-4 text-blue-400">Starting Point</h3>
            <div className="flex gap-2 mb-4">
              <Button
                onClick={handleUseCurrentLocation}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <Locate className="w-4 h-4 mr-2" />
                Use Current Location
              </Button>
              <Button
                onClick={handleChooseStartingPoint}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Choose Starting Point
              </Button>
            </div>
            
            {/* Current Location Display */}
            {currentLocation && (
              <div className="flex items-center gap-2 p-2 bg-blue-900/30 rounded-lg border border-blue-700/50">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-blue-300">Current Location</p>
                  <p className="text-xs text-gray-400">{currentLocation.address}</p>
                </div>
              </div>
            )}
          </div>

          {/* Destination Search */}
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-lg font-medium mb-4 text-blue-400">Destination</h3>
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                />
                {searchQuery && (
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setDestination(null);
                    }}
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleDestinationSelect(location)}
                      className="w-full text-left p-3 hover:bg-gray-800 border-b border-gray-700 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-white">{location.name}</p>
                          <p className="text-sm text-gray-400">{location.address}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Destination */}
            {destination && (
              <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="font-medium text-blue-300">{destination.name}</p>
                      <p className="text-xs text-gray-400">{destination.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Start Navigation Button */}
            {destination && !isNavigating && (
              <Button
                onClick={handleStartNavigation}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Start Navigation
              </Button>
            )}

            {/* Stop Navigation Button */}
            {isNavigating && (
              <Button
                onClick={handleStopNavigation}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white"
              >
                <NavigationOff className="w-4 h-4 mr-2" />
                Stop Navigation
              </Button>
            )}
          </div>

          {/* Route Options */}
          {!isNavigating && (
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-lg font-medium mb-4 text-blue-400">Route Options</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={routeOptions.fastestRoute}
                    onChange={(e) => setRouteOptions(prev => ({ ...prev, fastestRoute: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Fastest route</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={routeOptions.avoidTolls}
                    onChange={(e) => setRouteOptions(prev => ({ ...prev, avoidTolls: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Avoid tolls</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={routeOptions.avoidHighways}
                    onChange={(e) => setRouteOptions(prev => ({ ...prev, avoidHighways: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Avoid highways</span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Steps */}
          {isNavigating && (
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-blue-400">Navigation</h3>
                  <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 border-blue-700">
                    {currentStepIndex + 1} of {mockNavigationSteps.length}
                  </Badge>
                </div>

                {/* Current Step - Prominent */}
                <Card className="mb-4 bg-blue-900/30 border-blue-600/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600 p-2 rounded-full flex-shrink-0">
                        {getDirectionIcon(mockNavigationSteps[currentStepIndex]?.direction)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-blue-300 mb-1">
                          {mockNavigationSteps[currentStepIndex]?.instruction}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Route className="w-3 h-3" />
                            {mockNavigationSteps[currentStepIndex]?.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Upcoming Steps</h4>
                  {mockNavigationSteps.slice(currentStepIndex + 1, currentStepIndex + 4).map((step, index) => (
                    <Card key={step.id} className="bg-gray-900/50 border-gray-700">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-gray-700 p-1.5 rounded-full flex-shrink-0">
                            {getDirectionIcon(step.direction)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-300 mb-1 truncate">
                              {step.instruction}
                            </p>
                            <span className="text-xs text-gray-500">{step.distance}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="mt-6 flex gap-2">
                  <Button
                    onClick={handleNextStep}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={currentStepIndex >= mockNavigationSteps.length - 1}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Next Step
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Map View */}
        <div className="flex-1 relative">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            {/* Map Type Toggle */}
            <Select value={mapType} onValueChange={setMapType}>
              <SelectTrigger className="w-32 bg-black/80 backdrop-blur-sm border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="roadmap" className="text-white hover:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4" />
                    Roadmap
                  </div>
                </SelectItem>
                <SelectItem value="satellite" className="text-white hover:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <Satellite className="w-4 h-4" />
                    Satellite
                  </div>
                </SelectItem>
                <SelectItem value="hybrid" className="text-white hover:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Hybrid
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Zoom Controls */}
            <div className="flex flex-col gap-1">
              <Button
                size="sm"
                className="w-10 h-10 p-0 bg-black/80 backdrop-blur-sm border-gray-700 text-white hover:bg-white/10"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="w-10 h-10 p-0 bg-black/80 backdrop-blur-sm border-gray-700 text-white hover:bg-white/10"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
            </div>

            {/* Current Location Button */}
            <Button
              size="sm"
              className="w-10 h-10 p-0 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Locate className="w-4 h-4" />
            </Button>
          </div>

          {/* Mock Map Area */}
          <div className="w-full h-full bg-gray-900 relative overflow-hidden">
            {/* Grid pattern to simulate map */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
                {Array.from({ length: 400 }).map((_, i) => (
                  <div key={i} className="border border-gray-600"></div>
                ))}
              </div>
            </div>

            {/* Current Location Indicator */}
            {currentLocation && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {/* Pulsing outer ring */}
                  <div className="w-8 h-8 bg-blue-500/30 rounded-full animate-ping absolute"></div>
                  {/* Inner dot */}
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white relative z-10"></div>
                </div>
              </div>
            )}

            {/* Destination Marker */}
            {destination && (
              <div className="absolute top-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-600 p-2 rounded-full border-2 border-white shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {destination.name}
                </div>
              </div>
            )}

            {/* Route Line */}
            {isNavigating && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 50% 50% Q 60% 40% 66.6% 33.3%"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="10,5"
                  className="animate-pulse"
                />
              </svg>
            )}

            {/* Map placeholder text */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-600">
              <div className="text-center">
                <Map className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg opacity-50">Interactive Map View</p>
                <p className="text-sm opacity-30">GPS Navigation Interface</p>
              </div>
            </div>
          </div>

          {/* Trip Information Overlay */}
          {isNavigating && destination && (
            <div className="absolute bottom-4 left-4 right-4">
              <Card className="bg-black/90 backdrop-blur-sm border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-400">2.5 km</p>
                        <p className="text-xs text-gray-400">Distance</p>
                      </div>
                      <Separator orientation="vertical" className="h-8 bg-gray-600" />
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-400">8 min</p>
                        <p className="text-xs text-gray-400">ETA</p>
                      </div>
                      <Separator orientation="vertical" className="h-8 bg-gray-600" />
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-400">{destination.name}</p>
                        <p className="text-xs text-gray-400">Destination</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleStopNavigation}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}