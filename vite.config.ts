import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import basicSsl from '@vitejs/plugin-basic-ssl'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl(), svgr(), legacy({
    targets: ['chrome >= 64', 'safari >= 12'],
    additionalLegacyPolyfills: ['regenerator-runtime/runtime']
  }), sentryVitePlugin({
    org: "lev-fokichev",
    project: "javascript-react"
  })],
  build: {
    sourcemap: true
  }
})