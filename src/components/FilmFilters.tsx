
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Sliders } from 'lucide-react';

interface FilmFiltersProps {
  onFiltersChange: (filters: {
    format: string[];
    type: string[];
    minIso: number;
    maxIso: number;
  }) => void;
}

const FilmFilters = ({ onFiltersChange }: FilmFiltersProps) => {
  const [format, setFormat] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [isoRange, setIsoRange] = useState<[number, number]>([50, 3200]);
  
  const handleFormatChange = (value: string) => {
    const updatedFormat = format.includes(value)
      ? format.filter(f => f !== value)
      : [...format, value];
    
    setFormat(updatedFormat);
    
    onFiltersChange({
      format: updatedFormat,
      type,
      minIso: isoRange[0],
      maxIso: isoRange[1]
    });
  };
  
  const handleTypeChange = (value: string) => {
    const updatedType = type.includes(value)
      ? type.filter(t => t !== value)
      : [...type, value];
    
    setType(updatedType);
    
    onFiltersChange({
      format,
      type: updatedType,
      minIso: isoRange[0],
      maxIso: isoRange[1]
    });
  };
  
  const handleIsoChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setIsoRange(newRange);
    
    onFiltersChange({
      format,
      type,
      minIso: newRange[0],
      maxIso: newRange[1]
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto mb-6 bg-white/90 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Sliders className="h-5 w-5 mr-2 text-gray-700" />
          <h3 className="font-medium text-lg text-gray-900">Filter Film Stocks</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3 text-gray-700">Film Format</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="format-35mm" 
                  checked={format.includes('35mm')}
                  onCheckedChange={() => handleFormatChange('35mm')}
                />
                <Label htmlFor="format-35mm" className="text-sm">35mm</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="format-120mm" 
                  checked={format.includes('120mm')}
                  onCheckedChange={() => handleFormatChange('120mm')}
                />
                <Label htmlFor="format-120mm" className="text-sm">120mm (Medium Format)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="format-sheet" 
                  checked={format.includes('sheet')}
                  onCheckedChange={() => handleFormatChange('sheet')}
                />
                <Label htmlFor="format-sheet" className="text-sm">Sheet Film (Large Format)</Label>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium mb-3 text-gray-700">Film Type</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="type-color" 
                  checked={type.includes('color')}
                  onCheckedChange={() => handleTypeChange('color')}
                />
                <Label htmlFor="type-color" className="text-sm">Color</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="type-bw" 
                  checked={type.includes('blackAndWhite')}
                  onCheckedChange={() => handleTypeChange('blackAndWhite')}
                />
                <Label htmlFor="type-bw" className="text-sm">Black & White</Label>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-700">ISO Range</h4>
              <span className="text-xs font-medium text-gray-500">
                {isoRange[0]} - {isoRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={[50, 3200]}
              min={50}
              max={3200}
              step={1}
              value={[isoRange[0], isoRange[1]]}
              onValueChange={handleIsoChange}
              className="my-4"
            />
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">50</span>
              <span className="text-xs text-gray-500">3200</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilmFilters;
