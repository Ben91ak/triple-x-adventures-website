import type { Express } from 'express';

export function setupSitemap(app: Express) {
  // Generate dynamic XML sitemap
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = 'https://triplexadventures.com';
    const currentDate = new Date().toISOString();
    
    // Define all pages with their properties
    const pages = [
      {
        url: '/',
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: currentDate
      },
      {
        url: '/professional-services',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: currentDate
      },
      {
        url: '/about',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: currentDate
      },
      {
        url: '/accommodations',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: currentDate
      },
      {
        url: '/restaurant',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: currentDate
      },
      {
        url: '/contact',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: currentDate
      }
    ];
    
    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.url === '/' ? `<image:image>
      <image:loc>${baseUrl}/images/hero-winter.jpg</image:loc>
      <image:title>Triple X Adventures Arctic Experience</image:title>
      <image:caption>Premium Arctic adventures in Swedish Lapland</image:caption>
    </image:image>
    <video:video>
      <video:thumbnail_loc>${baseUrl}/images/video-thumbnail.jpg</video:thumbnail_loc>
      <video:title>Triple X Adventures - The Real Arctic Deal</video:title>
      <video:description>Experience authentic Arctic adventures with snowmobiling, dog sledding, and northern lights tours in Swedish Lapland</video:description>
      <video:content_loc>${baseUrl}/videos/TXA Teaser 2025 Homepage.mp4</video:content_loc>
      <video:duration>120</video:duration>
    </video:video>` : ''}
  </url>`).join('\n')}
</urlset>`;
    
    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  });
  
  // Generate sitemap index for multiple sitemaps (if needed in future)
  app.get('/sitemap-index.xml', (req, res) => {
    const baseUrl = 'https://triplexadventures.com';
    const currentDate = new Date().toISOString();
    
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;
    
    res.set('Content-Type', 'application/xml');
    res.send(sitemapIndex);
  });
}