import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Star, Edit, Trash2, Check, X } from "lucide-react";

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Jean Dupont",
      country: "France",
      rating: 5,
      text: "Excellent circuit ! Guide très professionnel et expériences authentiques.",
      status: "verified",
      featured: true,
    },
    {
      id: 2,
      name: "Marie Martin",
      country: "Canada",
      rating: 5,
      text: "Un voyage inoubliable au Bénin. Je recommande vivement Wonder Tours.",
      status: "verified",
      featured: true,
    },
    {
      id: 3,
      name: "Paul Kouassi",
      country: "Côte d'Ivoire",
      rating: 4,
      text: "Très bonne organisation, quelques petits imprévus mais globalement satisfait.",
      status: "verified",
      featured: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Témoignages</h1>
          <p className="text-gray-600 mt-1">Gérez les avis clients</p>
        </div>
        <Button href="/dashboard/testimonials/new">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau témoignage
        </Button>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      {testimonial.featured && (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                          À la une
                        </span>
                      )}
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {testimonial.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{testimonial.country}</p>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
