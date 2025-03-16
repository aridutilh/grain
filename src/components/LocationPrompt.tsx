
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface LocationPromptProps {
  onRequestLocation: () => void;
}

const LocationPrompt = ({ onRequestLocation }: LocationPromptProps) => {
  return (
    <Card className="w-full max-w-md mx-auto mb-6 bg-white/90 backdrop-blur">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <MapPin className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <h3 className="text-xl font-medium mb-2">Location Access Required</h3>
        <p className="text-gray-600 mb-6">
          To provide film recommendations based on current weather conditions, we need access to your location.
        </p>
        <Button onClick={onRequestLocation} className="bg-blue-500 hover:bg-blue-600">
          Share My Location
        </Button>
      </CardContent>
    </Card>
  );
};

export default LocationPrompt;
