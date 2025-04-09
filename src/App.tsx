
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import OnboardingPage from "./pages/OnboardingPage";
import CameraPage from "./pages/CameraPage";
import ChatPage from "./pages/ChatPage";
import ChatConversationPage from "./pages/ChatConversationPage";
import StoriesPage from "./pages/StoriesPage";
import PumpPage from "./pages/PumpPage";
import ProfilePage from "./pages/ProfilePage";
import FriendProfilePage from "./pages/FriendProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";

// Contexts and providers
import { WalletContextProvider } from "./contexts/WalletContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <WalletContextProvider>
          <AuthProvider>
            <div className="bg-snap-dark min-h-screen text-white">
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/camera" element={
                  <ProtectedRoute>
                    <CameraPage />
                  </ProtectedRoute>
                } />
                <Route path="/chat" element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                } />
                <Route path="/chat/:chatId" element={
                  <ProtectedRoute>
                    <ChatConversationPage />
                  </ProtectedRoute>
                } />
                <Route path="/stories" element={
                  <ProtectedRoute>
                    <StoriesPage />
                  </ProtectedRoute>
                } />
                <Route path="/pump" element={
                  <ProtectedRoute>
                    <PumpPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/profile/edit" element={
                  <ProtectedRoute>
                    <EditProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/profile/friend/:friendId" element={
                  <ProtectedRoute>
                    <FriendProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AuthProvider>
        </WalletContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
