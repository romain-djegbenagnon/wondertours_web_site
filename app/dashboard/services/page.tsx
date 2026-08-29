import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Briefcase } from "lucide-react";

export default function ServicesPage() {
  const services = [
    { id: 1, icon: "Map", title: "Circuits touristiques", href: "/circuits", status: "active" },
    { id: 2, icon: "Calendar", title: "Organisation de séjours", href: "/sejours", status: "active" },
    { id: 3, icon: "Building2", title: "Réservation d'hôtels", href: "/hotels", status: "active" },
    { id: 4, icon: "User", title: "Accompagnement touristique", href: "/contact", status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-1">Gérez les services proposés</p>
        </div>
        <Button href="/dashboard/services/new">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.href}</p>
                  </div>
                </div>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {service.status}
                </span>
              </div>
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
