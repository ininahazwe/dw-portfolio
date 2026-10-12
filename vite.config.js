import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Variables exposées au navigateur : VITE_* et NEXT_PUBLIC_* (noms par défaut de Supabase).
  // Les autres (ex. SUPABASE_SERVICE_ROLE_KEY) restent privées.
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
})
