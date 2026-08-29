import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2, MapPin } from "lucide-react";
import Link from "next/link";

export default function DestinationsPage() {
  const destinations = [
    { id: 1, name: "Ouidah", country: "Bénin", region: "Atlantique", status: "active" },
    { id: 2, name: "Abomey", country: "Bénin", region: "Zou", status: "active" },
    { id: 3, name: "Ganvié", country: "Bénin", region: "Littoral", status: "active" },
    { id: 4, name: "Grand-Popo", country: "Bénin", region: "Mono", status: "active" },
    { id: 5, name: "Porto-Novo", country: "Bénin", region: "Ouémé", status: "active" },
    { id: 6, name: "Cotonou", country: "Bénin", region: "Littoral", status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Destinations</h1>
          <p className="text-gray-600 mt-1">Gérez les destinations touristiques</p>
        </div>
        <Link href="/dashboard/destinations/new" className="inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-600/25 px-6 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle destination
        </Link>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une destination..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Card key={destination.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{destination.name}</h3>
                    <p className="text-sm text-gray-600">{destination.region}</p>
                  </div>
                </div>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {destination.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{destination.country}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
