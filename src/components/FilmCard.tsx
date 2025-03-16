
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FilmStock } from '@/utils/filmStocks';

interface FilmCardProps {
  film: FilmStock;
}

const FilmCard = ({ film }: FilmCardProps) => {
  // Determine badge color based on brand
  const getBrandColor = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'kodak':
        return 'bg-film-kodak hover:bg-film-kodak/80 text-black';
      case 'fujifilm':
        return 'bg-film-fuji hover:bg-film-fuji/80 text-white';
      case 'ilford':
        return 'bg-film-ilford hover:bg-film-ilford/80 text-white';
      default:
        return 'bg-gray-500 hover:bg-gray-500/80 text-white';
    }
  };

  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md bg-white">
      <div className="aspect-[4/3] overflow-hidden relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${film.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-3 w-full">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-bold text-white text-shadow">{film.name}</h3>
              <p className="text-white/90 text-sm">{film.brand}</p>
            </div>
            <Badge className={`${getBrandColor(film.brand)}`}>
              ISO {film.iso}
            </Badge>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 mb-3">{film.description}</p>
        <div className="flex flex-wrap gap-1">
          {film.format.map((f) => (
            <Badge key={f} variant="outline" className="text-xs">
              {f}
            </Badge>
          ))}
          <Badge variant="outline" className={`text-xs ${film.type === 'blackAndWhite' ? 'border-gray-800 text-gray-800' : 'border-blue-500 text-blue-500'}`}>
            {film.type === 'blackAndWhite' ? 'B&W' : 'Color'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilmCard;
