import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft, Save, Briefcase } from "lucide-react";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" href="/dashboard/services">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouveau service</h1>
            <p className="text-gray-600 mt-1">Ajoutez un nouveau service proposé</p>
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
                  Titre (FR) *
                </label>
                <Input placeholder="Circuits touristiques" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre (EN)
                </label>
                <Input placeholder="Tourist circuits" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (FR)
                </label>
                <Textarea
                  rows={4}
                  placeholder="Découvrez nos circuits touristiques..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (EN)
                </label>
                <Textarea
                  rows={4}
                  placeholder="Discover our tourist circuits..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Link & Page */}
          <Card>
            <CardHeader>
              <CardTitle>Lien et page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lien (URL) *
                </label>
                <Input placeholder="/circuits" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texte du bouton d'action (FR)
                </label>
                <Input placeholder="Voir les circuits" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texte du bouton d'action (EN)
                </label>
                <Input placeholder="View circuits" />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Tarification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix de départ (FCFA)
                </label>
                <Input type="number" placeholder="45000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Informations sur les prix (FR)
                </label>
                <Textarea
                  rows={3}
                  placeholder="À partir de 45 000 FCFA par personne..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pricing information (EN)
                </label>
                <Textarea
                  rows={3}
                  placeholder="Starting from 45,000 FCFA per person..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Icon Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Icône</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icône *
                </label>
                <Select
                  options={[
                    { value: "", label: "Sélectionner une icône" },
                    { value: "map", label: "Map (Carte)" },
                    { value: "calendar", label: "Calendar (Calendrier)" },
                    { value: "building-2", label: "Building (Hôtel)" },
                    { value: "user", label: "User (Guide)" },
                    { value: "car", label: "Car (Transport)" },
                    { value: "plane", label: "Plane (Vol)" },
                    { value: "utensils", label: "Utensils (Restauration)" },
                    { value: "camera", label: "Camera (Photographie)" },
                    { value: "music", label: "Music (Divertissement)" },
                    { value: "heart", label: "Heart (Bien-être)" },
                    { value: "star", label: "Star (Premium)" },
                  ]}
                />
              </div>
            </CardContent>
          </Card>

          {/* Order & Display */}
          <Card>
            <CardHeader>
              <CardTitle>Affichage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordre d'affichage
                </label>
                <Input type="number" placeholder="1" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Afficher sur la page d'accueil
                </label>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Service vedette
                </label>
                <input type="checkbox" className="rounded" />
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disponibilité
                </label>
                <Select
                  options={[
                    { value: "always", label: "Toujours disponible" },
                    { value: "seasonal", label: "Saisonnier" },
                    { value: "on-request", label: "Sur demande" },
                  ]}
                />
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
                <Input placeholder="circuits-touristiques" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta description (FR)
                </label>
                <Textarea
                  rows={2}
                  placeholder="Description pour les moteurs de recherche..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}