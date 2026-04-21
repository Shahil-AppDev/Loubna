/**
 * Helper function to handle basePath for GitHub Pages deployment
 * Returns the correct path with basePath prefix when needed
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/Loubna' : '';
  return `${basePath}${path}`;
}
