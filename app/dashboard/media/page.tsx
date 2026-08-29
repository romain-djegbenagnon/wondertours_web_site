"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Search, Filter, Trash2, Download } from "lucide-react";
import { useRef } from "react";

export default function MediaPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Logique pour traiter les fichiers uploadés
      console.log('Fichiers sélectionnés:', files);
      // Ici vous pouvez ajouter la logique d'upload vers votre serveur
    }
  };

  const media = [
    { id: 1, name: "ouidah-beach.jpg", size: "2.4 MB", type: "image", date: "2024-01-15" },
    { id: 2, name: "abomey-palace.jpg", size: "3.1 MB", type: "image", date: "2024-01-14" },
    { id: 3, name: "ganvie-lake.jpg", size: "1.8 MB", type: "image", date: "2024-01-13" },
    { id: 4, name: "cotonou-city.jpg", size: "2.9 MB", type: "image", date: "2024-01-12" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Médiathèque</h1>
          <p className="text-gray-600 mt-1">Gérez vos images et documents</p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button onClick={handleUploadClick}>
            <Upload className="w-4 h-4 mr-2" />
            Uploader
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un fichier..."
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Image preview</div>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.size} • {item.date}</p>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4" />
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
