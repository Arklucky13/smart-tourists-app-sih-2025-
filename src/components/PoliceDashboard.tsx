import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  ArrowLeft, 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Search,
  Users,
  Clock,
  FileText,
  Radio,
  Eye,
  TrendingUp,
  Navigation,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  QrCode,
  Scan,
  UserCheck,
  Camera,
  KeyRound
} from 'lucide-react';

// Replace figma import with public folder image
const logoImage = '/assets/logo.png';

interface PoliceDashboardProps {
  onBack: () => void;
  onOpenMap?: () => void;
  onOpenAnalytics?: () => void;
}

interface VerificationResult {
  digitalId: string;
  name: string;
  nationality: string;
  agency: string;
  status: 'valid' | 'invalid' | 'expired' | 'suspicious';
  photo?: string;
  issuedDate: string;
  expiryDate: string;
  currentLocation: string;
  riskLevel: 'low' | 'medium' | 'high';
  emergencyContact: string;
  lastVerified: string;
}

export function PoliceDashboard({ onBack, onOpenMap, onOpenAnalytics }: PoliceDashboardProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationInput, setVerificationInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);

  const statistics = [
    { title: 'Total Tourists', value: '1,247', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Active Alerts', value: '23', change: '-8%', icon: AlertTriangle, color: 'red' },
    { title: 'Safe Zones', value: '45', change: '+2', icon: Shield, color: 'green' },
    { title: 'Response Time', value: '3.2min', change: '-15%', icon: Clock, color: 'orange' },
  ];

  const activeIncidents = [
    {
      id: 'INC-001',
      type: 'emergency',
      location: 'Connaught Place',
      tourist: 'John Anderson (TID-001234)',
      time: '2 minutes ago',
      severity: 'high',
      status: 'active',
      description: 'Tourist panic button activated'
    },
    {
      id: 'INC-002',
      type: 'suspicious',
      location: 'India Gate',
      tourist: 'Maria Garcia (TID-005678)',
      time: '15 minutes ago',
      severity: 'medium',
      status: 'investigating',
      description: 'Suspicious activity detected via AI'
    },
    {
      id: 'INC-003',
      type: 'medical',
      location: 'Red Fort',
      tourist: 'David Kim (TID-009876)',
      time: '35 minutes ago',
      severity: 'high',
      status: 'responded',
      description: 'Medical emergency - heart rate anomaly'
    },
    {
      id: 'INC-004',
      type: 'lost',
      location: 'Chandni Chowk',
      tourist: 'Sarah Johnson (TID-003456)',
      time: '1 hour ago',
      severity: 'low',
      status: 'resolved',
      description: 'Tourist reported lost - now located'
    },
  ];

  const touristLocations = [
    { id: 'TID-001234', name: 'John Anderson', location: 'Connaught Place', status: 'emergency', lat: 28.6315, lng: 77.2167 },
    { id: 'TID-005678', name: 'Maria Garcia', location: 'India Gate', status: 'caution', lat: 28.6129, lng: 77.2295 },
    { id: 'TID-009876', name: 'David Kim', location: 'Red Fort', status: 'safe', lat: 28.6562, lng: 77.2410 },
    { id: 'TID-003456', name: 'Sarah Johnson', location: 'Chandni Chowk', status: 'safe', lat: 28.6506, lng: 77.2334 },
    { id: 'TID-007890', name: 'Ahmed Hassan', location: 'Lotus Temple', status: 'safe', lat: 28.5535, lng: 77.2588 },
  ];

  const handleVerification = (input: string) => {
    setTimeout(() => {
      if (input.includes('GA-UK-001-2024') || input.includes('TID-001234')) {
        setVerificationResult({
          digitalId: 'GA-UK-001-2024',
          name: 'Emma Wilson',
          nationality: 'United Kingdom',
          agency: 'Global Adventures Ltd',
          status: 'valid',
          issuedDate: '2024-01-15',
          expiryDate: '2024-12-31',
          currentLocation: 'Agra, Uttar Pradesh',
          riskLevel: 'low',
          emergencyContact: '+44-7911-123456',
          lastVerified: '2 minutes ago'
        });
      } else if (input.includes('ST-US-002-2024')) {
        setVerificationResult({
          digitalId: 'ST-US-002-2024',
          name: 'James Smith',
          nationality: 'United States',
          agency: 'Sunrise Travel Co',
          status: 'suspicious',
          issuedDate: '2024-02-10',
          expiryDate: '2024-12-31',
          currentLocation: 'Delhi NCR',
          riskLevel: 'high',
          emergencyContact: '+1-555-987-6543',
          lastVerified: '15 minutes ago'
        });
      } else {
        setVerificationResult({
          digitalId: input,
          name: 'Unknown Tourist',
          nationality: 'Unknown',
          agency: 'Unknown',
          status: 'invalid',
          issuedDate: 'N/A',
          expiryDate: 'N/A',
          currentLocation: 'Unknown',
          riskLevel: 'high',
          emergencyContact: 'N/A',
          lastVerified: 'Never'
        });
      }
      setIsScanning(false);
    }, 2000);
  };

  const handleScanQR = () => {
    setIsScanning(true);
    setVerificationResult(null);
    setTimeout(() => {
      handleVerification('GA-UK-001-2024');
    }, 3000);
  };

  const handleManualVerification = () => {
    if (verificationInput.trim()) {
      setIsScanning(true);
      setVerificationResult(null);
      handleVerification(verificationInput);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-300 bg-red-900/30 border-red-500/30';
      case 'investigating': return 'text-orange-300 bg-orange-900/30 border-orange-500/30';
      case 'responded': return 'text-blue-300 bg-blue-900/30 border-blue-500/30';
      case 'resolved': return 'text-green-300 bg-green-900/30 border-green-500/30';
      default: return 'text-gray-300 bg-gray-900/30 border-gray-500/30';
    }
  };

  const getTouristStatusColor = (status: string) => {
    switch (status) {
      case 'emergency': return 'text-red-400';
      case 'caution': return 'text-orange-400';
      case 'safe': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-400 bg-green-900/30 border-green-500/30';
      case 'invalid': return 'text-red-400 bg-red-900/30 border-red-500/30';
      case 'expired': return 'text-orange-400 bg-orange-900/30 border-orange-500/30';
      case 'suspicious': return 'text-red-400 bg-red-900/50 border-red-500/50 animate-pulse';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-500/30';
    }
  };

  // Map Tailwind colors for statistics
  const colorMap = {
    blue: 'bg-blue-900/30 text-blue-400',
    red: 'bg-red-900/30 text-red-400',
    green: 'bg-green-900/30 text-green-400',
    orange: 'bg-orange-900/30 text-orange-400',
  };

  return (
    <div className="min-h-screen bg-black/40 backdrop-blur-lg text-white">
      {/* HEADER AND REST OF COMPONENT */}
      {/* ...The rest of your JSX remains mostly unchanged... */}

      {/* Example fixed statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statistics.map((stat, index) => {
          const Icon = stat.icon;
          const colors = colorMap[stat.color];
          return (
            <Card key={index} className="bg-black/60 backdrop-blur-lg border-white/10">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change} from last week
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.split(' ')[0]}`}>
                  <Icon className={colors.split(' ')[1]} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}

export default PoliceDashboard;

