/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Participant, EventConfig, UserRole } from './types';
import { INITIAL_EVENT_CONFIG, INITIAL_PARTICIPANTS, MOCK_SCHEDULE } from './mockData';

// Component Imports
import Splash from './components/Splash';
import LandingPage from './components/LandingPage';
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import ParticipantArea from './components/ParticipantArea';
import ReceptionArea from './components/ReceptionArea';
import OrganizerArea from './components/OrganizerArea';
import DemoPanel from './components/DemoPanel';

export default function App() {
  // Application states
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [eventConfig, setEventConfig] = useState<EventConfig>(INITIAL_EVENT_CONFIG);
  const [splashCompleted, setSplashCompleted] = useState(false);
  
  // Navigation states
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  const [currentView, setCurrentView] = useState<string>('splash');
  const [currentUser, setCurrentUser] = useState<Participant | null>(null);

  // Initialize demo data from mockData
  useEffect(() => {
    const savedParts = localStorage.getItem('convenção_participants');
    const savedConfig = localStorage.getItem('convenção_config');
    
    if (savedParts) {
      setParticipants(JSON.parse(savedParts));
    } else {
      setParticipants(INITIAL_PARTICIPANTS);
    }

    if (savedConfig) {
      setEventConfig(JSON.parse(savedConfig));
    } else {
      setEventConfig(INITIAL_EVENT_CONFIG);
    }
  }, []);

  // Sync state to localStorage for premium feel (refreshes retain modifications!)
  const updateParticipantsState = (newParts: Participant[]) => {
    setParticipants(newParts);
    localStorage.setItem('convenção_participants', JSON.stringify(newParts));
  };

  const updateConfigState = (newConfig: EventConfig) => {
    setEventConfig(newConfig);
    localStorage.setItem('convenção_config', JSON.stringify(newConfig));
  };

  // Helper action: Register new participant
  const handleAddParticipant = (newPart: Omit<Participant, 'id' | 'status' | 'registrationDate'>) => {
    const freshParticipant: Participant = {
      ...newPart,
      id: `part-${Date.now()}`,
      status: 'Pendente',
      registrationDate: new Date().toLocaleDateString('pt-BR')
    };

    const updated = [...participants, freshParticipant];
    updateParticipantsState(updated);
  };

  // Helper action: Check in/Credenciar participant
  const handleCheckIn = (id: string) => {
    const now = new Date();
    const timeString = `${now.getDate()}/07 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const updated = participants.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status: 'Presente' as const,
          checkInTime: timeString
        };
      }
      return p;
    });

    updateParticipantsState(updated);

    // If current logged-in participant is the one checked in, update current user too!
    if (currentUser && currentUser.id === id) {
      setCurrentUser({
        ...currentUser,
        status: 'Presente',
        checkInTime: timeString
      });
    }
  };

  // Reset all data to factory settings
  const handleResetDemo = () => {
    localStorage.removeItem('convenção_participants');
    localStorage.removeItem('convenção_config');
    setParticipants(INITIAL_PARTICIPANTS);
    setEventConfig(INITIAL_EVENT_CONFIG);
    setCurrentRole('public');
    setCurrentView('landing');
    setCurrentUser(null);
    setSplashCompleted(true);
  };

  // Safe router/navigation controller
  const handleNavigate = (view: string, role?: UserRole) => {
    if (role) {
      setCurrentRole(role);
    }

    // Special handlers
    if (view === 'splash') {
      setSplashCompleted(false);
      setCurrentRole('public');
      setCurrentView('splash');
      return;
    }

    if (view === 'login-reception') {
      setCurrentRole('public');
      setCurrentView('login-reception');
      return;
    }

    setCurrentView(view);
  };

  const handleLoginSuccess = (user: Participant) => {
    setCurrentUser(user);
    setCurrentRole('participant');
    setCurrentView('home');
  };

  const handleStaffLoginSuccess = () => {
    setCurrentRole('reception');
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole('public');
    setCurrentView('landing');
  };

  // Splash controller override
  const handleSplashComplete = () => {
    setSplashCompleted(true);
    setCurrentRole('public');
    setCurrentView('landing');
  };

  // Render the current view based on active role and view states
  const renderActiveView = () => {
    if (!splashCompleted && currentView === 'splash') {
      return <Splash onComplete={handleSplashComplete} />;
    }

    switch (currentRole) {
      case 'public':
        if (currentView === 'landing') {
          return (
            <LandingPage
              eventConfig={eventConfig}
              schedule={MOCK_SCHEDULE}
              onNavigate={handleNavigate}
            />
          );
        }
        if (currentView === 'cadastro') {
          return (
            <Cadastro
              onAddParticipant={handleAddParticipant}
              onNavigate={handleNavigate}
            />
          );
        }
        if (currentView === 'login') {
          return (
            <Login
              participants={participants}
              onLoginSuccess={handleLoginSuccess}
              onStaffLoginSuccess={handleStaffLoginSuccess}
              onNavigate={handleNavigate}
              initialMode="participant"
            />
          );
        }
        if (currentView === 'login-reception') {
          return (
            <Login
              participants={participants}
              onLoginSuccess={handleLoginSuccess}
              onStaffLoginSuccess={handleStaffLoginSuccess}
              onNavigate={handleNavigate}
              initialMode="reception"
            />
          );
        }
        return (
          <LandingPage
            eventConfig={eventConfig}
            schedule={MOCK_SCHEDULE}
            onNavigate={handleNavigate}
          />
        );

      case 'participant':
        if (currentUser) {
          return (
            <ParticipantArea
              currentUser={currentUser}
              schedule={MOCK_SCHEDULE}
              onLogout={handleLogout}
              onNavigate={handleNavigate}
            />
          );
        }
        // Fallback to login if no active user session
        return (
          <Login
            participants={participants}
            onLoginSuccess={handleLoginSuccess}
            onStaffLoginSuccess={handleStaffLoginSuccess}
            onNavigate={handleNavigate}
            initialMode="participant"
          />
        );

      case 'reception':
        return (
          <ReceptionArea
            participants={participants}
            onCheckIn={handleCheckIn}
            onLogout={handleLogout}
          />
        );

      case 'organizer':
        return (
          <OrganizerArea
            participants={participants}
            eventConfig={eventConfig}
            onUpdateConfig={updateConfigState}
            onCheckIn={handleCheckIn}
            onLogout={handleLogout}
          />
        );

      default:
        return (
          <LandingPage
            eventConfig={eventConfig}
            schedule={MOCK_SCHEDULE}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans">
      
      {/* Primary Workspace View Area */}
      {renderActiveView()}

      {/* Floating Presentation Control Overlay */}
      {splashCompleted && (
        <DemoPanel
          currentRole={currentRole}
          currentView={currentView}
          onNavigate={handleNavigate}
          onResetDemo={handleResetDemo}
        />
      )}
      
    </div>
  );
}
