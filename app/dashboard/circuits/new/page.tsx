"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft, Save, Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export default function NewCircuitPage() {
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
          <Button variant="ghost" href="/dashboard/circuits">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouveau circuit</h1>
            <p className="text-gray-600 mt-1">Créez un nouveau circuit touristique</p>
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
                <Input placeholder="Circuit Ouidah - Route des Esclaves" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre (EN)
                </label>
                <Input placeholder="Ouidah Circuit - Slave Route" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sous-titre (FR)
                </label>
                <Input placeholder="Découvrez l'histoire de la traite des esclaves" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sous-titre (EN)
                </label>
                <Input placeholder="Discover the history of the slave trade" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (FR) *
                </label>
                <Textarea
                  rows={6}
                  placeholder="Description complète du circuit..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (EN)
                </label>
                <Textarea
                  rows={6}
                  placeholder="Full circuit description..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Itinerary */}
          <Card>
            <CardHeader>
              <CardTitle>Itinéraire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée (jours) *
                  </label>
                  <Input type="number" placeholder="2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée (nuits)
                  </label>
                  <Input type="number" placeholder="1" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Programme détaillé
                </label>
                <Textarea
                  rows={8}
                  placeholder="Jour 1: Visite de...&#10;Jour 2: Départ pour..."
                />
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
                  placeholder="Visite du musée d'histoire&#10;Marché des fétiches&#10;Plage de Grand-Popo"
                />
              </div>
            </CardContent>
          </Card>

          {/* Included/Excluded */}
          <Card>
            <CardHeader>
              <CardTitle>Inclus / Non inclus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Services inclus (un par ligne)
                </label>
                <Textarea
                  rows={4}
                  placeholder="Transport climatisé&#10;Guide francophone&#10;Hébergement"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Services non inclus (un par ligne)
                </label>
                <Textarea
                  rows={4}
                  placeholder="Billets d'avion&#10;Assurance voyage&#10;Dépenses personnelles"
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
                  Destination *
                </label>
                <Select
                  options={[
                    { value: "", label: "Sélectionner" },
                    { value: "ouidah", label: "Ouidah" },
                    { value: "abomey", label: "Abomey" },
                    { value: "ganvie", label: "Ganvié" },
                    { value: "cotonou", label: "Cotonou" },
                    { value: "porto-novo", label: "Porto-Novo" },
                    { value: "grand-popo", label: "Grand-Popo" },
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie *
                </label>
                <Select
                  options={[
                    { value: "", label: "Sélectionner" },
                    { value: "culture", label: "Culture" },
                    { value: "histoire", label: "Histoire" },
                    { value: "nature", label: "Nature" },
                    { value: "littoral", label: "Littoral" },
                    { value: "vodoun", label: "Vodoun" },
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (FCFA) *
                </label>
                <Input type="number" placeholder="85000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulté
                </label>
                <Select
                  options={[
                    { value: "easy", label: "Facile" },
                    { value: "moderate", label: "Modéré" },
                    { value: "challenging", label: "Difficile" },
                  ]}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min. participants
                  </label>
                  <Input type="number" placeholder="2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max. participants
                  </label>
                  <Input type="number" placeholder="20" />
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
