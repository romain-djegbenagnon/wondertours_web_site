import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Tag } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    { id: 1, name: "Culture", icon: "Landmark", color: "#3B82F6", status: "active" },
    { id: 2, name: "Histoire", icon: "Scroll", color: "#EF4444", status: "active" },
    { id: 3, name: "Nature", icon: "TreePine", color: "#10B981", status: "active" },
    { id: 4, name: "Littoral", icon: "Waves", color: "#06B6D4", status: "active" },
    { id: 5, name: "Vodoun", icon: "Sparkles", color: "#8B5CF6", status: " active" },
    { id: 6, name: "Expérience locale", icon: "Users", color: "#F59E0B", status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catégories</h1>
          <p className="text-gray-600 mt-1">Gérez les catégories de circuits</p>
        </div>
        <Button href="/dashboard/categories/new">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Tag className="w-6 h-6" style={{ color: category.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-xs text-gray-500">{category.color}</span>
                    </div>
                  </div>
                </div>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {category.status}
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
