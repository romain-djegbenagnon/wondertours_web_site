import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft, Save, Tag } from "lucide-react";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" href="/dashboard/categories">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouvelle catégorie</h1>
            <p className="text-gray-600 mt-1">Ajoutez une nouvelle catégorie de circuits</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Brouillon</Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Publier
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom (FR) *
                </label>
                <Input placeholder="Culture" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom (EN)
                </label>
                <Input placeholder="Culture" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (FR)
                </label>
                <Textarea
                  rows={4}
                  placeholder="Découvrez la culture locale et les traditions..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (EN)
                </label>
                <Textarea
                  rows={4}
                  placeholder="Discover local culture and traditions..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Visual Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icône *
                </label>
                <Select
                  options={[
                    { value: "", label: "Sélectionner une icône" },
                    { value: "landmark", label: "Landmark (Monument)" },
                    { value: "scroll", label: "Scroll (Histoire)" },
                    { value: "tree-pine", label: "Tree Pine (Nature)" },
                    { value: "waves", label: "Waves (Littoral)" },
                    { value: "sparkles", label: "Sparkles (Vodoun)" },
                    { value: "users", label: "Users (Expérience locale)" },
                    { value: "mountain", label: "Mountain (Aventure)" },
                    { value: "camera", label: "Camera (Photographie)" },
                    { value: "utensils", label: "Utensils (Gastronomie)" },
                    { value: "music", label: "Music (Musique)" },
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Couleur *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                    defaultValue="#3B82F6"
                  />
                  <Input
                    placeholder="#3B82F6"
                    className="flex-1"
                    defaultValue="#3B82F6"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Choisissez une couleur pour identifier cette catégorie
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Aperçu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "#3B82F620" }}>
                  <Tag className="w-8 h-8" style={{ color: "#3B82F6" }} />
                </div>
                <h3 className="font-semibold text-gray-900">Culture</h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: "#3B82F6" }} />
                  <span className="text-sm text-gray-500">#3B82F6</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Statut</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Actif
                </label>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Afficher sur la page d'accueil
                </label>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL)
                </label>
                <Input placeholder="culture" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordre d'affichage
                </label>
                <Input type="number" placeholder="1" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}