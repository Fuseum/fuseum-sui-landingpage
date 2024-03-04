export { Window };

declare global {
  interface Window {
    phantom: any;
    solana: any;
  }
}
