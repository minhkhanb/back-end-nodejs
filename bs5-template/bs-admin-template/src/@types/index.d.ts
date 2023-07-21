declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.svg';

export {};

declare global {
  interface Window {
    config: {
      phoenixTheme: string;
    }
  }
}
