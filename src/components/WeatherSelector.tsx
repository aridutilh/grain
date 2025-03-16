import { Button } from "@/components/ui/button";
import { Cloud, Sun, CloudRain } from "lucide-react";

interface WeatherSelectorProps {
  onSelect: (condition: string) => void;
}

const WeatherSelector = ({ onSelect }: WeatherSelectorProps) => {
  return (
    <div className="p-6 bg-black/20 backdrop-blur-sm rounded-lg">
      <h3 className="text-white text-lg font-semibold mb-4 text-center">
        Select Weather Condition
      </h3>
      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          className="flex flex-col items-center gap-2 p-4 hover:bg-white/20"
          onClick={() => onSelect('sunny')}
        >
          <Sun className="h-8 w-8" />
          <span>Sunny</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center gap-2 p-4 hover:bg-white/20"
          onClick={() => onSelect('cloudy')}
        >
          <Cloud className="h-8 w-8" />
          <span>Cloudy</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center gap-2 p-4 hover:bg-white/20"
          onClick={() => onSelect('rainy')}
        >
          <CloudRain className="h-8 w-8" />
          <span>Rainy</span>
        </Button>
      </div>
    </div>
  );
};

export default WeatherSelector; 