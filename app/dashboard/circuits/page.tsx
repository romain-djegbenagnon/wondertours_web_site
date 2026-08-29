import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function CircuitsPage() {
  const circuits = [
    {
      id: 1,
      title: "Circuit Ouidah - Route des Esclaves",
      destination: "Ouidah",
      category: "Histoire",
      duration: "2 jours",
      price: "85 000 FCFA",
      status: "active",
      featured: true,
    },
    {
      id: 2,
      title: "Circuit Abomey - Royaumes du Dahomey",
      destination: "Abomey",
      category: "Culture",
      duration: "3 jours",
      price: "120 000 FCFA",
      status: "active",
      featured: true,
    },
    {
      id: 3,
      title: "Circuit Ganvié - Venise de l'Afrique",
      destination: "Ganvié",
      category: "Nature",
      duration: "1 jour",
      price: "45 000 FCFA",
      status: "active",
      featured: false,
    },
    {
      id: 4,
      title: "Circuit Grand-Popo - Littoral",
      destination: "Grand-Popo",
      category: "Littoral",
      duration: "2 jours",
      price: "75 000 FCFA",
      status: "active",
      featured: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Circuits</h1>
          <p className="text-gray-600 mt-1">Gérez vos circuits touristiques</p>
        </div>
        <Button href="/dashboard/circuits/new">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau circuit
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un circuit..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Circuits List */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Circuit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {circuits.map((circuit) => (
                <tr key={circuit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{circuit.title}</p>
                        {circuit.featured && (
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 mt-1">
                            À la une
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{circuit.destination}</td>
                  <td className="px-6 py-4 text-gray-600">{circuit.category}</td>
                  <td className="px-6 py-4 text-gray-600">{circuit.duration}</td>
                  <td className="px-6 py-4 text-gray-600">{circuit.price}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {circuit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
