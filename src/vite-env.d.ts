// TypeScript shim for vite-plugin-pwa virtual module
// Allows import { registerSW } from 'virtual:pwa-register';
declare module 'virtual:pwa-register' {
  export function registerSW(options?: { immediate?: boolean }): void;
}
