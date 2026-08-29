"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft, Save, Star, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export default function NewTestimonialPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rating, setRating] = useState(5);

  const handleImageClick = () => {
    // Rediriger vers la médiathèque pour choisir une image
    window.location.href = '/dashboard/media';
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" href="/dashboard/testimonials">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouveau témoignage</h1>
            <p className="text-gray-600 mt-1">Ajoutez un nouveau témoignage client</p>
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
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <Input placeholder="Jean Dupont" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pays *
                </label>
                <Input placeholder="France" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input type="email" placeholder="jean.dupont@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Circuit / Service concerné
                </label>
                <Select
                  options={[
                    { value: "", label: "Sélectionner" },
                    { value: "circuit-ouidah", label: "Circuit Ouidah" },
                    { value: "circuit-abomey", label: "Circuit Abomey" },
                    { value: "circuit-ganvie", label: "Circuit Ganvié" },
                    { value: "sejour-personnalise", label: "Séjour personnalisé" },
                    { value: "service-general", label: "Service général" },
                  ]}
                />
              </div>
            </CardContent>
          </Card>

          {/* Testimonial Content */}
          <Card>
            <CardHeader>
              <CardTitle>Contenu du témoignage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre du témoignage
                </label>
                <Input placeholder="Excellent circuit !" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Témoignage *
                </label>
                <Textarea
                  rows={6}
                  placeholder="Excellent circuit ! Guide très professionnel et expériences authentiques."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date du voyage
                </label>
                <Input type="date" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Photo */}
          <Card>
            <CardHeader>
              <CardTitle>Photo du client</CardTitle>
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
                      alt="Photo du client"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <p className="text-white text-sm">Changer la photo</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Cliquez pour choisir depuis la médiathèque
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG jusqu'à 2MB
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Statut</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  État de vérification
                </label>
                <Select
                  options={[
                    { value: "pending", label: "En attente" },
                    { value: "verified", label: "Vérifié" },
                    { value: "rejected", label: "Rejeté" },
                  ]}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  À la une
                </label>
                <input type="checkbox" className="rounded" />
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