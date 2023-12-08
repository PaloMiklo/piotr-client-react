import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr"; //https://github.com/pd4d10/vite-plugin-svgr
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    base: '/',
    plugins: [react(), viteTsconfigPaths(), svgr()],
    server: {
        open: true,
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                secure: false,
            }
        }
    },
    build: {
        rollupOptions: {
            input: 'src/index.tsx', // Adjust this based on your project structure
        },
    },
})