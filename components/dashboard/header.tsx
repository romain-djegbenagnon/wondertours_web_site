"use client";

import { Bell, Search, User, LogOut, X, Check, AlertCircle, Info, Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Nouvelle réservation",
      message: "Jean Dupont a réservé le circuit Ouidah",
      time: "Il y a 5 minutes",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "Contact reçu",
      message: "Marie Martin a envoyé une demande d'information",
      time: "Il y a 1 heure",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Stock limité",
      message: "Le circuit Abomey a presque atteint sa capacité maximale",
      time: "Il y a 3 heures",
      read: true,
    },
    {
      id: 4,
      type: "info",
      title: "Nouveau témoignage",
      message: "Paul Kouassi a laissé un avis 5 étoiles",
      time: "Hier",
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50";
      case "warning":
        return "bg-amber-50";
      case "info":
      default:
        return "bg-blue-50";
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors mr-4"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4 ml-4">
            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-primary transition-colors hover:scale-110 hover:rotate-12 transition-transform duration-200"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 md:space-x-3 pl-2 md:pl-4 border-l border-gray-200"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 hidden md:block">Admin</p>
                  <p className="text-xs text-gray-500 hidden md:block">admin@wondertours.bj</p>
                </div>
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-semibold text-lg border-2 border-amber-500">
                  A
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600 md:hidden" />
                <button 
                  className="hidden md:block p-2 text-gray-600 hover:text-red-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle logout
                  }}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </button>

              {/* Mobile User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 md:hidden">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-semibold text-lg border-2 border-amber-500">
                        A
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Admin</p>
                        <p className="text-sm text-gray-500">admin@wondertours.bj</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => {
                        // Handle logout
                        setShowUserMenu(false);
                      }}
                    >
                      <LogOut className="w-5 h-5 text-red-600" />
                      <span className="text-red-600">Déconnexion</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Notification Sidebar */}
      {showNotifications && (
        <div className="fixed right-0 top-0 h-full w-80 md:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Notifications</h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Bell className="w-12 h-12 mb-4 text-gray-300" />
                  <p>Aucune notification</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-3 md:p-4 hover:bg-gray-50 cursor-pointer transition-colors",
                        !notification.read && "bg-blue-50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                            getNotificationBgColor(notification.type)
                          )}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors">
                Voir toutes les notifications
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
