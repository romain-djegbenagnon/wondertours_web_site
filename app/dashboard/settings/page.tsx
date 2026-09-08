"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Globe, Mail, Phone, MapPin, Trash2, X, RotateCcw, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    whatsapp: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  founder: {
    name: string;
    title: string;
  };
  map: {
    embedUrl: string;
  };
}

export default function SettingsPage() {
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving config:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateConfig = (path: string, value: string) => {
    if (!config) return;
    const keys = path.split('.');
    const newConfig = { ...config };
    let current: any = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="text-center text-gray-500">
        Erreur lors du chargement de la configuration
      </div>
    );
  }

  const deletedItems = [
    { id: 1, type: "circuit", name: "Circuit Abomey (ancien)", deletedAt: "2024-01-20", deletedBy: "Eric BOKOSSA" },
    { id: 2, type: "destination", name: "Porto-Novo (incomplet)", deletedAt: "2024-01-18", deletedBy: "Sophie Aho" },
    { id: 3, type: "blog", name: "Article: Guide touristique", deletedAt: "2024-01-15", deletedBy: "Marc Leroy" },
    { id: 4, type: "category", name: "Ancienne catégorie: Aventure", deletedAt: "2024-01-10", deletedBy: "Eric BOKOSSA" },
    { id: 5, type: "testimonial", name: "Témoignage: Client mécontent", deletedAt: "2024-01-08", deletedBy: "Sophie Aho" },
    { id: 6, type: "service", name: "Service: Location de voitures", deletedAt: "2024-01-05", deletedBy: "Marc Leroy" },
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "circuit":
        return "bg-blue-100 text-blue-800";
      case "destination":
        return "bg-green-100 text-green-800";
      case "blog":
        return "bg-purple-100 text-purple-800";
      case "category":
        return "bg-amber-100 text-amber-800";
      case "testimonial":
        return "bg-pink-100 text-pink-800";
      case "service":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "circuit":
        return "Circuit";
      case "destination":
        return "Destination";
      case "blog":
        return "Article";
      case "category":
        return "Catégorie";
      case "testimonial":
        return "Témoignage";
      case "service":
        return "Service";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Configurez les paramètres du site</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du site</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du site
              </label>
              <Input 
                value={config.name}
                onChange={(e) => updateConfig('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                rows={3}
                value={config.description}
                onChange={(e) => updateConfig('description', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <Input 
                value={config.contact.email}
                onChange={(e) => updateConfig('contact.email', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4 inline mr-1" />
                Téléphone
              </label>
              <Input 
                value={config.contact.phone}
                onChange={(e) => updateConfig('contact.phone', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                Adresse
              </label>
              <Input 
                value={config.contact.address}
                onChange={(e) => updateConfig('contact.address', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Globe className="w-4 h-4 inline mr-1" />
                URL Google Maps (embed)
              </label>
              <Textarea
                rows={3}
                placeholder="Collez l'URL d'embed de Google Maps ici..."
                value={config.map.embedUrl}
                onChange={(e) => updateConfig('map.embedUrl', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Obtenez l'URL depuis Google Maps → Partager → Intégrer une carte
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Réseaux sociaux</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <Input 
                value={config.links.facebook}
                onChange={(e) => updateConfig('links.facebook', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <Input 
                value={config.links.instagram}
                onChange={(e) => updateConfig('links.instagram', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube
              </label>
              <Input 
                value={config.links.youtube}
                onChange={(e) => updateConfig('links.youtube', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <Input 
                value={config.links.whatsapp}
                onChange={(e) => updateConfig('links.whatsapp', e.target.value)}
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
                URL du site
              </label>
              <Input 
                value={config.url}
                onChange={(e) => updateConfig('url', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Open Graph
              </label>
              <Input 
                value={config.ogImage}
                onChange={(e) => updateConfig('ogImage', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Trash */}
        <Card>
          <CardHeader>
            <CardTitle>Corbeille</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Éléments supprimés</p>
                  <p className="text-sm text-gray-600">{deletedItems.length} éléments dans la corbeille</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="text-red-600 hover:text-red-700"
                onClick={() => setShowTrashModal(true)}
              >
                Voir la corbeille
              </Button>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Restaurer tout
              </Button>
              <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                Vider la corbeille
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        {saveSuccess && (
          <div className="flex items-center text-green-600">
            <Save className="w-4 h-4 mr-2" />
            Modifications enregistrées avec succès
          </div>
        )}
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
      </div>

      {/* Trash Modal */}
      {showTrashModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowTrashModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Corbeille</h2>
                  <p className="text-sm text-gray-600">{deletedItems.length} éléments supprimés</p>
                </div>
              </div>
              <button
                onClick={() => setShowTrashModal(false)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {deletedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <AlertCircle className="w-12 h-12 mb-4 text-gray-300" />
                  <p>La corbeille est vide</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nom
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Supprimé le
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Supprimé par
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {deletedItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeBadge(item.type)}`}>
                              {getTypeLabel(item.type)}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-gray-900">{item.name}</td>
                          <td className="px-4 py-4 text-gray-600">{item.deletedAt}</td>
                          <td className="px-4 py-4 text-gray-600">{item.deletedBy}</td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                                <RotateCcw className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Les éléments sont automatiquement supprimés définitivement après 30 jours
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowTrashModal(false)}>
                  Fermer
                </Button>
                <Button variant="outline" className="text-green-600 hover:text-green-700">
                  Restaurer tout
                </Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  Vider la corbeille
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
