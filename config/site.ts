export const studio = {
  name: 'FUEL X STUDIO',
  shortName: 'FUEL X',
  email: process.env.CONTACT_EMAIL || 'teamfuelxstudio@gmail.com',
  instagram: 'https://www.instagram.com/fuelxstudio/',
  linkedin: 'https://www.linkedin.com/company/fuelxstudio',
  baseUrl: process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : undefined,
  get formEnabled() {
    return process.env.CONTACT_FORM_PROVIDER === 'resend' && Boolean(process.env.CONTACT_FORM_API_KEY && process.env.CONTACT_FROM_EMAIL);
  }
};
export const features = { showFounderPortraits: false, showTestimonials: false, showArticles: false, showVerifiedStatistics: false, mobilePlatforms: { ios: true, android: true, crossPlatform: true } };
export const routes = {home:'',portfolio:'/work/portfolio',services:'/services',about:'/about',contact:'/contact'} as const;
const workVisuals: Record<string, string> = {
  hero: 'studio-digital', about: 'dashboard', portfolio: 'analytics', contact: 'studio-digital', studio: 'analytics',
  'service-1': 'analytics', 'service-2': 'dashboard', 'service-3': 'dashboard', 'service-4': 'analytics',
  'service-5': 'studio-digital', promo: 'studio-digital',
};

/** Temporary studio visuals. They are not customer case studies. */
export const art = (name: string) => '/assets/work/' + (workVisuals[name] || 'dashboard') + '.jpg';
