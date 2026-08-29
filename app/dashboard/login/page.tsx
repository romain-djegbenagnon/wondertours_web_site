import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Wonder Tours
          </CardTitle>
          <p className="text-gray-600 mt-2">Connectez-vous au dashboard</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input type="email" placeholder="admin@wondertours.bj" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="ml-2 text-sm text-gray-600">Se souvenir</span>
              </label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              ← Retour au site
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
