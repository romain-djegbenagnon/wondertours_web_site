import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Globe, Mail, Phone, MapPin, Trash2 } from "lucide-react";

export default function SettingsPage() {
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
              <Input defaultValue="Wonder Tours and Services" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                rows={3}
                defaultValue="Découvrez le Bénin à travers des expériences authentiques avec plus de 20 ans d'expertise touristique."
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
              <Input defaultValue="contact@wondertours.bj" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4 inline mr-1" />
                Téléphone
              </label>
              <Input defaultValue="+229 97 00 00 00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                Adresse
              </label>
              <Input defaultValue="Ouidah, Bénin" />
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
              <Input defaultValue="https://facebook.com/wondertours" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <Input defaultValue="https://instagram.com/wondertours" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube
              </label>
              <Input defaultValue="https://youtube.com/@wondertours" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <Input defaultValue="https://wa.me/22990000000" />
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
              <Input defaultValue="https://wondertours.bj" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Open Graph
              </label>
              <Input defaultValue="/og-image.jpg" />
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
                  <p className="text-sm text-gray-600">12 éléments dans la corbeille</p>
                </div>
              </div>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
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

      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
