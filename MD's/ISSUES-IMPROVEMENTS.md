# FIX
----
## make 300 Daily PBQ's
## input userslice, achiveemnt slice, test routes, tesy.py, databse.py. and find imporvemnts
## Input leaderboard route and leaderboard page specifcually/only
# Add blog posts about certification topics (great for SEO)- Expand your FAQ schema with more questions/answers to earn rich snippets
Create dedicated FAQ pages for each certification
## configure cloud fare settings

### ADD MORE RESOURCES TO RESOURCE PAGE
----
### close to release we need a Dev Database and paired with that a Dev server. so we can push DB changes and or code chnages and see teh effects before we do it in production. 
----
#### also consider a backup sever in case soemthing happens to the production one we can easily go to cloudfare and chnage IP address A record and upkeep 99% uptime---- conisder wasy to automate that somehow (prolly very very hard- essentially would haev to know- IF server donw = replace A record automcially somehow-- actually prolly easy tbh)
------
---
----
# THEN THE IOS APP GRIND STARTS
### refer to [refer to](https://github.com/CarterPerez-dev/ProxyAuthRequired/blob/main/IOS.MD)
### and refer to [refer to](https://github.com/CarterPerez-dev/ProxyAuthRequired/blob/main/MD's/IOS.APP.MD)
-------
# [sitemap](https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Acertgames.com)
# Sitemaps are special files (often in XML format) that list all the important pages on a website. They serve as a guide for search engines (like Google, Bing, etc.) to crawl and index your site more intelligently. Submitting a sitemap in Google Search Console (as shown in your screenshot) helps Google discover new or updated pages faster. Below is a quick overview and a sample code snippet for generating a simple XML sitemap.

## What Sitemaps Do
1. **Guide Search Engines**: They show search engines where to find key content on your website.  
2. **Boost Indexing**: They help crawlers discover new or changed URLs quickly.  
3. **Provide Metadata**: You can include extra details like the last-modified date or change frequency.

## Types of Sitemaps
1. **XML Sitemaps**: The most common type. Ideal for most websites.  
2. **HTML Sitemaps**: A user-friendly version of your sitemap, typically designed for visitors.  
3. **Image/Video Sitemaps**: For sites that rely heavily on images or videos.

## Example of a Basic XML Sitemap

Below is a minimal XML sitemap structure you could host at `https://yourdomain.com/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
                        
    <url>
        <loc>https://yourdomain.com/</loc>
        <lastmod>2025-03-07</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <url>
        <loc>https://yourdomain.com/about</loc>
        <lastmod>2025-03-06</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
</urlset>
```

## Generating a Sitemap Programmatically in Python

Below is a **complete** Python script that:
1. Reads a list of URLs from a Python list.
2. Generates an XML sitemap file named `sitemap.xml`.
3. Uses standard libraries only (no extra dependencies).

```python
#!/usr/bin/env python3

import datetime
from xml.etree.ElementTree import Element, SubElement, tostring
import xml.dom.minidom

def generate_sitemap(urls, file_name='sitemap.xml', default_changefreq='weekly', default_priority='0.5'):
    """
    Generates an XML sitemap from a list of URLs.
    
    :param urls: A list of dictionaries with keys:
                 - loc (required): The page URL
                 - lastmod (optional): The last modified date as YYYY-MM-DD
                 - changefreq (optional): e.g., 'daily', 'weekly', etc.
                 - priority (optional): e.g., '1.0', '0.8'
    :param file_name: The output XML file name
    :param default_changefreq: The default change frequency if not provided
    :param default_priority: The default priority if not provided
    """
    urlset = Element('urlset')
    urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    
    for entry in urls:
        url = SubElement(urlset, 'url')
        
        loc = SubElement(url, 'loc')
        loc.text = entry.get('loc', '')

        lastmod = entry.get('lastmod')
        if not lastmod:
            # fallback to today's date if not provided
            lastmod = datetime.datetime.now().strftime('%Y-%m-%d')
        lm = SubElement(url, 'lastmod')
        lm.text = lastmod

        changefreq = SubElement(url, 'changefreq')
        changefreq.text = entry.get('changefreq', default_changefreq)

        priority = SubElement(url, 'priority')
        priority.text = entry.get('priority', default_priority)
    
    # Convert to pretty XML
    xml_str = xml.dom.minidom.parseString(tostring(urlset)).toprettyxml(indent="  ")
    
    with open(file_name, 'w', encoding='utf-8') as f:
        f.write(xml_str)

if __name__ == "__main__":
    # Example list of URLs
    my_urls = [
        {
            'loc': 'https://yourdomain.com/',
            'lastmod': '2025-03-07',
            'changefreq': 'daily',
            'priority': '1.0'
        },
        {
            'loc': 'https://yourdomain.com/about',
            # leaving out lastmod, changefreq, priority -> defaults used
        },
        {
            'loc': 'https://yourdomain.com/contact',
            'lastmod': '2025-03-06',
            'changefreq': 'monthly',
            'priority': '0.8'
        }
    ]
    
    generate_sitemap(my_urls, file_name='sitemap.xml')
    print("Sitemap generated successfully!")
```

### How to Use
1. Place the script in your website’s root directory (or anywhere convenient).
2. Update the `my_urls` list with the actual pages of your site.
3. Run `python generate_sitemap.py`. It creates a `sitemap.xml` file.
4. Upload the `sitemap.xml` file to your website’s root (`https://yourdomain.com/sitemap.xml`).
5. Go to Google Search Console → “Sitemaps” → Enter `https://yourdomain.com/sitemap.xml` → Submit.

## Best Practices
1. **Keep it Up to Date**: Regenerate and resubmit when you add or update pages.  
2. **Use Robots.txt**: Reference your sitemap URL in your `robots.txt` file for crawlers.  
3. **Split Large Sitemaps**: If you have more than ~50,000 URLs, use multiple sitemap files and a sitemap index.  
4. **Submit via Console**: Submitting directly to Google Search Console ensures Google picks up changes faster.

That’s all there is to it—an XML sitemap is like a treasure map for search engines, ensuring they find and rank your content more efficiently!


