"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft, Save, Upload, FileText, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export default function NewBlogPostPage() {
  const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(null);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState<string[]>([]);

  const handleCoverImageClick = () => {
    window.location.href = '/dashboard/media';
  };

  const handleGalleryClick = () => {
    window.location.href = '/dashboard/media';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" href="/dashboard/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouvel article</h1>
            <p className="text-gray-600 mt-1">Créez un nouvel article de blog</p>
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
                <Input placeholder="Découvrez l'histoire des rois d'Abomey" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre (EN)
                </label>
                <Input placeholder="Discover the history of the kings of Abomey" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Extrait (FR) *
                </label>
                <Textarea
                  rows={3}
                  placeholder="Un bref résumé de l'article..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Extrait (EN)
                </label>
                <Textarea
                  rows={3}
                  placeholder="A brief summary of the article..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Contenu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenu (FR) *
                </label>
                <Textarea
                  rows={12}
                  placeholder="Écrivez votre article ici..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenu (EN)
                </label>
                <Textarea
                  rows={12}
                  placeholder="Write your article here..."
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
                <Input placeholder="decouvrez-histoire-rois-abomey" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta description (FR)
                </label>
                <Textarea
                  rows={3}
                  placeholder="Description pour les moteurs de recherche..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta description (EN)
                </label>
                <Textarea
                  rows={3}
                  placeholder="Description for search engines..."
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
              <CardTitle>Image de couverture</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                onClick={handleCoverImageClick}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors"
              >
                {selectedCoverImage ? (
                  <div className="relative">
                    <img
                      src={selectedCoverImage}
                      alt="Image de couverture"
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
                  Catégorie *
                </label>
                <Select
                  options={[
                    { value: "", label: "Sélectionner" },
                    { value: "culture", label: "Culture" },
                    { value: "nature", label: "Nature" },
                    { value: "histoire", label: "Histoire" },
                    { value: "voyage", label: "Voyage" },
                    { value: "conseils", label: "Conseils" },
                    { value: "actualites", label: "Actualités" },
                  ]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Auteur *
                </label>
                <Input placeholder="Eric BOKOSSA" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de publication
                </label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (séparés par des virgules)
                </label>
                <Input placeholder="histoire, abomey, culture, bénin" />
              </div>
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Galerie d'images</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                onClick={handleGalleryClick}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors"
              >
                {selectedGalleryImages.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedGalleryImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      </div>
                    ))}
                    <div className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-20">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Cliquez pour choisir depuis la médiathèque
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG jusqu'à 2MB
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
                  État de publication
                </label>
                <Select
                  options={[
                    { value: "draft", label: "Brouillon" },
                    { value: "published", label: "Publié" },
                    { value: "scheduled", label: "Programmé" },
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
                  Commentaires activés
                </label>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}