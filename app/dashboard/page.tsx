import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Map,
  Calendar,
  MessageSquare,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Circuits actifs",
      value: "24",
      change: "+2",
      changeType: "positive",
      icon: Map,
    },
    {
      title: "Réservations ce mois",
      value: "18",
      change: "+5",
      changeType: "positive",
      icon: Calendar,
    },
    {
      title: "Témoignages",
      value: "156",
      change: "+12",
      changeType: "positive",
      icon: MessageSquare,
    },
    {
      title: "Revenus ce mois",
      value: "2.4M FCFA",
      change: "+15%",
      changeType: "positive",
      icon: DollarSign,
    },
  ];

  const recentBookings = [
    { id: 1, customer: "Jean Dupont", circuit: "Circuit Ouidah", date: "2024-01-15", status: "confirmed" },
    { id: 2, customer: "Marie Martin", circuit: "Circuit Abomey", date: "2024-01-14", status: "pending" },
    { id: 3, customer: "Paul Kouassi", circuit: "Circuit Ganvié", date: "2024-01-13", status: "confirmed" },
    { id: 4, customer: "Sophie Aho", circuit: "Séjour Cotonou", date: "2024-01-12", status: "completed" },
  ];

  const recentContactRequests = [
    { id: 1, name: "Marc Leroy", subject: "Demande circuit", date: "2024-01-15", status: "new" },
    { id: 2, name: "Céline Durand", subject: "Information hôtel", date: "2024-01-14", status: "in_progress" },
    { id: 3, name: "Pierre Mbengue", subject: "Réservation groupe", date: "2024-01-13", status: "answered" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble de votre activité</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">
                {stat.change} ce mois
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Réservations récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{booking.customer}</p>
                    <p className="text-sm text-gray-600">{booking.circuit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{booking.date}</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" href="/dashboard/bookings">
                Voir toutes les réservations
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Contact Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Demandes de contact récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContactRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{request.name}</p>
                    <p className="text-sm text-gray-600">{request.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{request.date}</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        request.status === "new"
                          ? "bg-blue-100 text-blue-800"
                          : request.status === "in_progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" href="/dashboard/contact">
                Voir toutes les demandes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" href="/dashboard/circuits/new">
              + Nouveau circuit
            </Button>
            <Button variant="outline" href="/dashboard/blog/new">
              + Nouvel article
            </Button>
            <Button variant="outline" href="/dashboard/destinations/new">
              + Nouvelle destination
            </Button>
            <Button variant="outline" href="/dashboard/settings">
              Paramètres
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
