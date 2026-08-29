"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft, Save, Upload, MapPin, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export default function NewDestinationPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = () => {
    // Rediriger vers la médiathèque pour choisir une image
    window.location.href = '/dashboard/media';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" href="/dashboard/destinations">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouvelle destination</h1>
            <p className="text-gray-600 mt-1">Ajoutez une nouvelle destination touristique</p>
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
                <Input placeholder="Ouidah" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom (EN)
                </label>
                <Input placeholder="Ouidah" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (FR) *
                </label>
                <Textarea
                  rows={6}
                  placeholder="Description complète de la destination..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (EN)
                </label>
                <Textarea
                  rows={6}
                  placeholder="Full destination description..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card>
            <CardHeader>
              <CardTitle>Localisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pays *
                </label>
                <Input placeholder="Bénin" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Région *
                </label>
                <Input placeholder="Atlantique" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <Input type="number" step="any" placeholder="6.3552" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <Input type="number" step="any" placeholder="2.0850" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <Input placeholder="Adresse complète" />
              </div>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Points forts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points forts (un par ligne)
                </label>
                <Textarea
                  rows={4}
                  placeholder="Route des Esclaves&#10;Musée d'histoire&#10;Marché des fétiches&#10;Plage"
                />
              </div>
            </CardContent>
          </Card>

          {/* Best Time to Visit */}
          <Card>
            <CardHeader>
              <CardTitle>Meilleure période</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meilleure période pour visiter
                </label>
                <Textarea
                  rows={4}
                  placeholder="Novembre à février (saison sèche)&#10;Éviter juillet-août (saison des pluies)"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image */}
          <Card>
            <CardHeader>
              <CardTitle>Image principale</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                onClick={handleImageClick}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors"
              >
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Image sélectionnée"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <p className="text-white text-sm">Changer l'image</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Cliquez pour choisir depuis la médiathèque
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG jusqu'à 5MB
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Détails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de destination *
                </label>
                <Select
                  options={[
                    { value: "", label: "Sélectionner" },
                    { value: "ville", label: "Ville" },
                    { value: "village", label: "Village" },
                    { value: "site-naturel", label: "Site naturel" },
                    { value: "site-historique", label: "Site historique" },
                    { value: "plage", label: "Plage" },
                    { value: "reserve", label: "Réserve naturelle" },
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distance depuis Cotonou (km)
                </label>
                <Input type="number" placeholder="40" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temps de route depuis Cotonou
                </label>
                <Input placeholder="1h30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau de popularité
                </label>
                <Select
                  options={[
                    { value: "low", label: "Peu connue" },
                    { value: "medium", label: "Moyennement connue" },
                    { value: "high", label: "Très populaire" },
                  ]}
                />
              </div>
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Galerie photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Ajouter des photos
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG jusqu'à 2MB
                </p>
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
                  À la une
                </label>
                <input type="checkbox" className="rounded" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}