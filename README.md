# Bonyan-bluprint-3

You are a senior conversion-focused web designer, bilingual UX architect, front-end product designer, and expert Lovable developer.

Build a fast, premium, bilingual website for **Bonyan Construction for Engineering Consultancy**, based in **Al Mabelah, Al Seeb, Muscat, Oman**.

Bonyan provides:

- Engineering and construction consultancy

- Architectural and civil drawings

- Quantity surveying and cost control

- Plot subdivision and planning support

- 3D perspectives and architectural models

- Project supervision and inspection

- Construction quality oversight

- Technical coordination from design to execution

The company serves villa owners, property developers, educational institutions, mosque projects, residential compounds, and commercial or mixed-use developments across Oman.

---

# 1. Primary Goal

Create a premium, technically credible, conversion-focused website that positions Bonyan as an established, precise, and integrity-led engineering consultancy in Oman.

The website should help visitors quickly understand:

- What Bonyan does

- Where the company operates

- Which project types it supports

- Why clients should trust the consultancy

- How to request a consultation

- How to contact the company through WhatsApp, phone, email, or a project inquiry form

This is a polished demo website intended to create a strong first impression and support a sales conversation.

Do not turn it into a large corporate platform.

---

# 2. Website Scope

Build:

1. One main homepage containing **exactly 8 sections**

2. One lightweight About page

3. One lightweight Services page

4. One lightweight Contact page

Do not build:

- A blog

- A dashboard

- A client portal

- A project management system

- Additional service-detail pages

- Individual project pages

- Complex animations

- Heavy interactive experiences

- Unnecessary placeholder pages

The homepage must remain the main experience and contain all essential positioning, services, project capabilities, credibility elements, process information, testimonials structure, and contact conversion paths.

---

# 3. Critical UI Reference Image Instruction

A UI reference image will be uploaded together with this prompt.
Use uploaded images carefully for the appearance and UI of the site.

## Treat the uploaded image as the primary visual UI reference

The uploaded reference image is not merely general inspiration.

Use it as the **main source of truth for the website’s visual appearance and UI system**.

Closely reproduce the reference image’s:

- Overall visual style

- Design mood

- Page composition

- Header appearance

- Navigation treatment

- Hero composition

- Content positioning

- Section proportions

- Grid structure

- Container widths

- Whitespace

- Vertical rhythm

- Typography hierarchy

- Heading scale

- Body-text scale

- Button shapes

- CTA hierarchy

- Border radius

- Card appearance

- Image proportions

- Image cropping

- Image overlays

- Background treatments

- Section transitions

- Alignment

- Decorative lines

- Icon style

- Shadow intensity

- Border treatments

- Portfolio presentation

- Service-card design

- Mobile visual behavior

- Premium level of polish

The final website should immediately feel as though it belongs to the same design system as the uploaded reference image.

## Reference-image priority

Use the following priority order:

1. The uploaded reference image controls the UI appearance, visual hierarchy, styling, spacing, and composition.

2. The requirements in this prompt control the website content, bilingual behavior, section count, business positioning, and functionality.

3. When the reference image contains irrelevant text, branding, logos, images, industries, or business information, replace them with Bonyan’s content.

4. When the reference image does not show a required section, extend its visual language consistently rather than introducing a different design style.

5. Do not add generic template components that visually conflict with the reference image.

Do not simply create a website inspired by the image. Recreate its overall UI character and design language as closely as practical while adapting it to Bonyan.

Do not copy the original company name, logo, text, contact information, project names, or brand identity from the reference image.

---

# 4. Language System

The website must be fully bilingual:

- English

- Arabic

English must be the default language on the first visit.

Arabic must be the only secondary language.

Add a compact and clearly visible:

- EN

- AR

language switcher in the desktop header, mobile header, and footer.

The selected language must persist across:

- Navigation

- Homepage sections

- Skeleton pages

- Forms

- Buttons

- Validation messages

- Confirmation messages

- Footer content

- Image alt text

- Metadata

Use complete translation objects or structured translation files. Do not scatter untranslated strings throughout individual components.

## English behavior

Use:

```html
lang="en" dir="ltr"
```

English content should use natural left-to-right alignment.

## Arabic behavior

Use:

```html
lang="ar" dir="rtl"
```

Arabic must use complete RTL behavior.

Do not only right-align the text. Properly mirror:

- Navigation order

- Grid direction

- Card flow

- Icon placement

- Button icons

- Arrow direction

- Timeline direction

- Slider controls

- Form alignment

- Menu drawer behavior

- Image-and-text layouts

- Previous and next controls

Keep phone numbers, email addresses, URLs, and usernames unchanged when switching languages.

---

# 5. Visual Direction

The uploaded UI reference image remains the primary source for the visual design.

When extending its style, use a premium architectural-consultancy identity with a restrained Omani influence.

The website should feel:

- Precise

- Technical

- Established

- Architectural

- Premium

- Calm

- Professional

- Conversion-focused

- Appropriate for the Oman market

It should not feel:

- Decorative

- Overly luxurious

- Industrial

- Construction-heavy

- Generic

- Like a prebuilt corporate template

- Like a real-estate listing website

- Like a contracting-company website

## Suggested color system

Adapt these colors to the uploaded UI reference image. If the image has a clearly defined palette, preserve its visual balance while integrating these brand-compatible tones where appropriate:

- Warm Ivory: `#F4F0E8`

- Limestone Beige: `#D8C8AE`

- Charcoal: `#202321`

- Dark Graphite: `#111311`

- Muted Bronze: `#A98455`

- Deep Olive: `#4A5547`

- Soft Concrete Grey: `#C9CAC5`

Bronze and olive must remain restrained accent colors rather than dominant page colors.

## Typography

Follow the typography scale and editorial feeling of the reference image.

Suggested font pairing:

- English: Manrope or Inter

- Arabic: IBM Plex Sans Arabic or Noto Kufi Arabic

Requirements:

- Strong compatibility between English and Arabic

- Large editorial headings

- Clean geometric body text

- Readable Arabic typography

- Generous line height

- Clear hierarchy

- No overly decorative fonts

- No condensed construction-style fonts

## Image treatment

Use premium, replaceable architectural images showing:

- Contemporary Omani villas

- Mosques

- Schools and educational facilities

- Residential compounds

- Commercial or mixed-use developments

- Architectural details

- Technical meetings

- Site inspections

- Engineering drawings

Image direction:

- Cinematic architectural photography

- Warm natural light

- Refined and slightly desaturated grading

- Strong geometry

- Structural details

- Stone, concrete, glass, and natural materials

- Dark, sand-toned, or charcoal overlays

- Occasional technical-drawing or blueprint textures

Avoid:

- Generic corporate office photography

- Repeated images

- Generic stock images of people wearing hard hats

- Bright construction-yellow imagery

- Artificial futuristic buildings

- Unrealistic megaprojects

- Images unrelated to Oman or Gulf architecture

Every major image placeholder must be easy to replace later.

---

# 6. Header and Navigation

Build a premium transparent header over the hero, following the uploaded UI reference image as closely as possible.

The header should become sticky after scrolling.

After scrolling, it may transition to:

- A warm ivory background

- A charcoal background

- A subtle translucent background

Choose the option that most closely matches the reference image.

Add only a restrained blur, border, or shadow where needed.

## Desktop header content

Include:

- Minimal modern logo placeholder

- Business name

- Short business descriptor

- Home

- About

- Services

- Portfolio

- Testimonials

- Contact

- EN / AR language switcher

- Primary consultation CTA

English CTA:

**Request a Consultation**

Arabic CTA:

**اطلب استشارة**

Use anchor links for homepage sections where appropriate.

## Mobile header

Include:

- Logo

- Business name

- Short tagline if space allows

- EN / AR switcher

- Right-side hamburger control in English

- Properly mirrored menu behavior in Arabic

The mobile drawer must include all navigation links and the main consultation CTA.

Also add a fixed mobile bottom navigation containing:

- Home

- Services

- Portfolio

- Contact

- WhatsApp

Mirror the order and icon directions correctly in Arabic.

Do not allow the bottom navigation to cover page content.

---

# 7. Homepage — Exactly 8 Sections

Do not add, remove, merge, or split sections.

The homepage must contain exactly the following eight top-level sections.

---

## Section 1 — Hero

Create a cinematic, full-width hero based closely on the uploaded UI reference image.

Use a premium architectural image showing a contemporary Omani villa, mosque, educational facility, or refined development.

The image should extend behind the transparent header.

Add a refined overlay that maintains image visibility while keeping all text highly readable.

### English content

Eyebrow:

**Engineering Consultancy — Muscat, Oman**

Headline:

**Designing with Precision. Supervising with Integrity.**

Subheadline:

**Architectural and civil drawings, quantity surveying, 3D visualization, and project supervision for villas, schools, mosques, compounds, and commercial developments.**

Primary CTA:

**Request a Consultation**

Secondary CTA:

**View Our Work**

Optional short capability labels:

- Design

- Technical Drawings

- Quantity Surveying

- Project Supervision

### Arabic content

Eyebrow:

**استشارات هندسية — مسقط، عُمان**

Headline:

**نصمّم بدقة، ونشرف بنزاهة.**

Subheadline:

**مخططات معمارية ومدنية، وحصر كميات، ونمذجة ثلاثية الأبعاد، وإشراف هندسي لمشاريع الفلل والمدارس والمساجد والمجمعات والمباني التجارية.**

Primary CTA:

**اطلب استشارة**

Secondary CTA:

**شاهد أعمالنا**

Optional capability labels:

- التصميم

- المخططات الفنية

- حصر الكميات

- الإشراف الهندسي

English text must be positioned and aligned according to the LTR composition.

Arabic text, overlay balance, image crop, CTA direction, and decorative elements must be intentionally mirrored.

---

## Section 2 — Trust Bar / Quick Proof

Create a compact credibility section immediately after the hero.

Follow the visual treatment of the reference image. It may appear as:

- A slim proof strip

- A restrained marquee

- A structured row of credibility signals

- A compact icon-and-text band

Use a very slow and professional movement only if it matches the reference image.

Movement must adapt correctly between LTR and RTL.

### English section heading

**Built on Local Knowledge and Technical Discipline**

Supporting text:

**A Muscat-based consultancy bringing design, cost awareness, and site supervision together.**

Credibility signals:

- Founded in Oman in 2016

- Muscat-Based Consultancy

- Multidisciplinary Engineering

- Design to Site Supervision

- Diverse Project Experience

- Integrity and Technical Precision

### Arabic section heading

**خبرة محلية وانضباط هندسي**

Supporting text:

**مكتب استشارات في مسقط يجمع بين التصميم، ودراسة التكلفة، والإشراف على الموقع.**

Credibility signals:

- تأسست في عُمان عام 2016

- مكتب استشاري في مسقط

- خبرات هندسية متعددة التخصصات

- من التصميم إلى الإشراف الميداني

- خبرة في مشاريع متنوعة

- نزاهة ودقة فنية

No CTA is required in this section.

Do not add unsupported awards, accreditations, statistics, or client counts.

---

## Section 3 — Services / Offers

Create a premium service-card system that closely follows the card style, spacing, typography, and composition of the uploaded UI reference image.

Show exactly six services:

1. Engineering & Construction Consultancy

2. Architectural & Civil Drawings

3. Project Supervision & Inspection

4. Quantity Surveying & Cost Control

5. Plot Subdivision & Planning Support

6. 3D Perspectives & Models

Visually prioritize:

- Project Supervision & Inspection

- Architectural & Civil Drawings

- Quantity Surveying & Cost Control

Each service card should include:

- Minimal technical icon

- Service title

- Concise description

- Learn More link

- Direction-aware arrow

Do not add long paragraphs.

### English heading

**Integrated Engineering Services from Concept to Site**

Supporting text:

**Practical consultancy services designed to improve technical clarity, cost control, and construction quality.**

Main CTA:

**Discuss Your Project**

### Arabic heading

**خدمات هندسية متكاملة من الفكرة إلى الموقع**

Supporting text:

**خدمات استشارية عملية لتعزيز وضوح التصميم، وضبط التكلفة، وجودة التنفيذ.**

Card action:

**اعرف المزيد**

Main CTA:

**ناقش مشروعك**

In Arabic, reverse:

- Card direction

- Text alignment

- Icon location

- Link-arrow direction

- Grid reading order where appropriate

---

## Section 4 — About / Positioning

Create a spacious split-image section that presents Bonyan as a multidisciplinary engineering consultancy rather than only a design office or contractor.

Follow the image-to-text ratio and composition of the uploaded UI reference.

Use a replaceable image showing one of the following:

- Engineering meeting

- Architectural review

- Site inspection

- Technical drawing review

- Project coordination

### English heading

**Local Understanding. Multidisciplinary Expertise.**

English supporting copy:

**Established in Oman in 2016, Bonyan combines technical design, engineering documentation, cost awareness, and site supervision under one consultancy.**

Highlight:

- Oman-Based Since 2016

- Integrated Design and Supervision

- Client-Focused Coordination

- Quality and Accountability

- Practical and Sustainable Solutions

Values:

- Integrity

- Quality

- Accountability

- Client Focus

- Innovation

- Sustainability

CTA:

**Learn About Bonyan**

### Arabic heading

**فهم محلي. خبرة متعددة التخصصات.**

Arabic supporting copy:

**تجمع بنيان بين التصميم الفني، والمستندات الهندسية، ودراسة التكلفة، والإشراف على التنفيذ ضمن مكتب استشاري واحد.**

Highlight:

- خبرة محلية في عُمان منذ عام 2016

- تكامل التصميم والإشراف

- تنسيق يركز على احتياجات العميل

- الجودة والمسؤولية

- حلول عملية ومستدامة

CTA:

**تعرّف على بنيان**

Do not invent awards, memberships, certifications, team size, project totals, or years of experience beyond the information provided.

---

## Section 5 — Portfolio / Work Proof

Build a visually rich, asymmetric editorial portfolio gallery based on the uploaded UI reference image.

The portfolio should demonstrate project-category capabilities without presenting fabricated case studies.

Include five project categories:

1. Luxury Villa

2. School or Educational Facility

3. Mosque

4. Residential Compound

5. Commercial or Mixed-Use Building

Each portfolio item must contain only:

- Replaceable project image

- Project category

- Location placeholder

- Service-scope placeholder

- Optional short category tag

Examples of safe placeholders:

- Location: Muscat, Oman

- Scope: Design & Technical Drawings

- Scope: Quantity Surveying

- Scope: Project Supervision

Do not invent:

- Project names

- Client names

- Project budgets

- Completion dates

- Results

- Performance statistics

- Testimonials

- Awards

### English heading

**Engineering Experience Across Diverse Project Types**

Supporting text:

**From private villas to institutional and commercial developments, our capabilities adapt to the technical demands of each project.**

CTA:

**Explore Project Capabilities**

### Arabic heading

**خبرة هندسية عبر مشاريع متنوعة**

Supporting text:

**من الفلل الخاصة إلى المشاريع التعليمية والتجارية، تتكيف خدماتنا مع المتطلبات الفنية لكل مشروع.**

CTA:

**استكشف قدراتنا**

On mobile, make the gallery easy to swipe or browse without horizontal page overflow.

---

## Section 6 — Process / How It Works

Create a structured four-step process using numbered cards or a refined architectural timeline.

The timeline style must remain consistent with the uploaded UI reference image.

Show these four steps:

1. Consultation & Project Brief

2. Design, Drawings & Cost Planning

3. Review, Coordination & Approvals

4. Site Supervision & Handover Support

### English heading

**A Clear Path from Consultation to Completion**

Supporting text:

**A structured engineering process helps reduce uncertainty, improve coordination, and protect project quality.**

CTA:

**Start with a Consultation**

### Arabic heading

**مسار واضح من الاستشارة إلى الإنجاز**

Supporting text:

**تساعد العملية الهندسية المنظمة على تقليل المخاطر، وتحسين التنسيق، وحماية جودة المشروع.**

Steps:

1. الاستشارة وتحديد متطلبات المشروع

2. التصميم والتخطيط للتكلفة

3. المراجعة والتنسيق

4. الإشراف ودعم التسليم

CTA:

**ابدأ باستشارة**

Reverse the timeline flow, connectors, numbers, and arrows correctly in Arabic RTL.

---

## Section 7 — Testimonials

Create elegant testimonial cards that match the uploaded UI reference image.

Verified public testimonials are not currently available.

Therefore, all testimonial content must be clearly presented as replaceable placeholder content.

Each card should include:

- Editable quote placeholder

- Client-name placeholder

- Project-type placeholder

- Rating-interface placeholder

- Previous and next controls

Use labels such as:

- Client Feedback Placeholder

- Client Name

- Project Type

- Replace With Verified Testimonial

Do not create realistic fake client names, fake companies, or fake project reviews.

Do not imply that placeholder star ratings are verified.

### English heading

**Trust Is Built Through the Project Experience**

Supporting text:

**A dedicated space for verified client feedback and project experiences.**

### Arabic heading

**الثقة تُبنى من خلال تجربة المشروع**

Supporting text:

**مساحة مخصصة لإضافة آراء العملاء الموثقة وتجاربهم في المشاريع.**

No direct CTA is required.

All carousel controls must work correctly in both LTR and RTL.

---

## Section 8 — Final CTA / Contact

Create a strong closing section using either:

- A premium architectural background

- A dark engineering-material panel

- A technical-drawing background

- A layout derived from the final CTA section in the reference image

This section should be visually strong but not crowded.

### English heading

**Planning a Project in Oman?**

Supporting text:

**Speak with Bonyan about design, technical drawings, quantity surveying, or project supervision.**

Primary CTA:

**Request a Project Consultation**

Secondary CTA:

**Contact via WhatsApp**

### Arabic heading

**هل تخطط لمشروع في عُمان؟**

Supporting text:

**تواصل مع بنيان لمناقشة التصميم، والمخططات الفنية، وحصر الكميات، أو الإشراف الهندسي.**

Primary CTA:

**اطلب استشارة لمشروعك**

Secondary CTA:

**تواصل عبر واتساب**

Include contact cards for:

- Phone: `[PHONE]`

- WhatsApp: `[WHATSAPP]`

- Email: `[EMAIL]`

- Location: Al Mabelah, Al Seeb, Muscat, Oman

Add a compact project inquiry form.

English fields:

- Name

- Phone

- Email

- Project Type

- Message

- Submit

Arabic fields:

- الاسم

- رقم الهاتف

- البريد الإلكتروني

- نوع المشروع

- الرسالة

- إرسال

Project-type options may include:

- Villa

- Educational Facility

- Mosque

- Residential Compound

- Commercial Building

- Engineering Drawings

- Quantity Surveying

- Project Supervision

- Other

Translate:

- Form labels

- Placeholders

- Validation messages

- Error messages

- Loading states

- Success confirmation

Keep the contact process direct and low-friction.

---

# 8. Lightweight About Page

Create a concise About page consistent with the homepage and uploaded UI reference image.

Include:

1. Intro banner

2. Company overview

3. Founding in Oman in 2016

4. Local market positioning

5. Values

6. Areas of expertise

7. Replaceable image placeholders

8. Consultation CTA

The page must reinforce that Bonyan combines design, technical documentation, cost awareness, and site supervision.

Do not add unsupported company history, awards, certifications, project counts, or staff details.

The About navigation link in the header and footer must lead to this page.

---

# 9. Lightweight Services Page

Create a concise Services page consistent with the homepage.

Include:

1. Services introduction

2. Six service cards

3. Short detail block for each service

4. Relevant project types

5. Inquiry CTA

Services:

- Engineering & Construction Consultancy

- Architectural & Civil Drawings

- Project Supervision & Inspection

- Quantity Surveying & Cost Control

- Plot Subdivision & Planning Support

- 3D Perspectives & Models

Do not create six separate service pages.

The homepage service-card links may navigate to the relevant anchor on this Services page.

---

# 10. Lightweight Contact Page

Create a concise bilingual Contact page.

Include:

1. Contact introduction

2. Phone card

3. WhatsApp card

4. Email card

5. Location card

6. Bilingual inquiry form

7. Map placeholder for Al Mabelah, Al Seeb, Muscat

8. Business-hours placeholder

9. Consultation CTA

Use editable placeholders:

- `[PHONE]`

- `[WHATSAPP]`

- `[EMAIL]`

- `[BUSINESS HOURS]`

Do not invent contact details.

---

# 11. Footer

Create a premium footer consistent with the uploaded UI reference image.

Include:

- Logo placeholder

- Business name

- Short descriptor

- Social links

- Homepage links

- About link

- Services link

- Contact link

- WhatsApp link

- Location

- EN / AR switcher

- Consultation CTA

- Copyright

English slogan:

**Engineering clarity from concept to site.**

Arabic slogan:

**وضوح هندسي من الفكرة إلى الموقع.**

All footer labels must switch language.

Do not add inactive or fake social URLs. Use editable placeholders.

---

# 12. Buttons and Interactions

Match button dimensions, border radius, typography, and interaction behavior to the uploaded UI reference image.

Where the image does not define them clearly, use:

- Medium-height rectangular buttons

- Modest border radius

- Strong primary CTA

- Bordered secondary CTA

- Subtle hover elevation

- Small arrow movement

- Smooth but restrained transitions

All arrows and directional animations must reverse in Arabic.

Avoid:

- Excessive pill-shaped buttons

- Large glowing effects

- Heavy glassmorphism

- Bouncy animations

- Large parallax effects

- Decorative cursor effects

- Excessive motion

---

# 13. Responsive Design

Design mobile layouts intentionally rather than shrinking the desktop design.

Requirements:

- Fully responsive from mobile to large desktop

- No horizontal page overflow

- Minimum 44px touch targets

- Readable Arabic typography

- Safe text wrapping

- Mobile-specific spacing

- One-column service cards where needed

- Swipeable portfolio cards where appropriate

- Swipeable testimonial cards

- Large WhatsApp CTA

- Proper RTL mirroring

- Sticky mobile contact navigation

- Correct spacing above the fixed bottom bar

- Responsive image crops

- Clear CTA hierarchy

- No compressed desktop layouts

The mobile version should preserve the premium visual identity of the reference image.

---

# 14. Animation

Use only restrained and lightweight interactions.

Allowed:

- Subtle scroll reveals

- Gentle fade and translate effects

- Small image zoom on hover

- Card-border transitions

- Button-arrow movement

- Smooth header transition

- Direction-aware marquee movement

- Lightweight portfolio interactions

Animations must:

- Work in LTR and RTL

- Respect reduced-motion preferences

- Avoid delaying content

- Avoid harming performance

- Avoid making the site feel like a template demo

---

# 15. SEO

Prepare localized SEO for English and Arabic.

Create separate and natural:

- Page titles

- Meta descriptions

- Open Graph titles

- Open Graph descriptions

- Headings

- Alt text

- Form labels

- Structured content

Do not place English and Arabic keywords together inside one metadata field.

Prepare:

- `hreflang="en"`

- `hreflang="ar"`

- Proper canonical structure

- Localized routes or a scalable language-routing structure

Suggested route structure:

- `/`

- `/about`

- `/services`

- `/contact`

- `/ar`

- `/ar/about`

- `/ar/services`

- `/ar/contact`

English must always load as the default language.

Use semantic HTML and a correct heading hierarchy.

Each page should contain only one main H1.

---

# 16. Accessibility

Include:

- Accessible color contrast

- Keyboard-friendly navigation

- Visible focus states

- Proper form labels

- ARIA labels where necessary

- Semantic buttons and links

- Descriptive editable image alt text

- Accessible mobile drawer

- Accessible language switcher

- Reduced-motion support

- Logical tab order in both LTR and RTL

Do not rely only on color to communicate status or actions.

---

# 17. Performance

Build the website for fast loading and smooth mobile use.

Requirements:

- Use WebP or AVIF images

- Lazy-load below-the-fold images

- Preload only essential hero assets

- Avoid oversized image files

- Avoid heavy video backgrounds

- Avoid unnecessary JavaScript

- Avoid large animation libraries where CSS is sufficient

- Keep component structure clean and reusable

- Prevent layout shifts

- Use responsive image sizing

- Optimize fonts

- Keep the skeleton pages lightweight

---

# 18. Content Integrity Rules

Do not invent or present unsupported information.

Do not fabricate:

- Project names

- Client names

- Customer testimonials

- Awards

- Certifications

- Government approvals

- Memberships

- Project counts

- Staff counts

- Revenue

- Budgets

- Completion dates

- Performance statistics

- Business hours

- Contact details

- Social links

Use clearly editable placeholders where verified data is unavailable.

Do not use lorem ipsum.

Use meaningful, industry-specific placeholder copy.

---

# 19. Component and Content Structure

Build reusable components for:

- Header

- Mobile drawer

- Language switcher

- Hero

- Trust signals

- Service cards

- About split section

- Portfolio cards

- Process steps

- Testimonial cards

- Contact cards

- Inquiry form

- Footer

- Mobile bottom navigation

Keep English and Arabic content inside complete, editable translation objects or files.

Do not duplicate entire page components for each language unless technically necessary.

---

# 20. Final Quality Standard

The finished website must:

- Closely match the uploaded reference image’s UI appearance

- Feel specifically designed for Bonyan

- Feel appropriate for an engineering consultancy in Oman

- Be fully bilingual in English and Arabic

- Load in English by default

- Support proper RTL behavior

- Contain exactly eight homepage sections

- Include only lightweight About, Services, and Contact pages

- Make consultation and WhatsApp actions highly visible

- Avoid fabricated credibility claims

- Be visually premium but restrained

- Be responsive and fast

- Be implementation-ready

- Avoid generic Lovable or corporate-template styling

Before completing the website, compare the result against the uploaded reference image and refine any major differences in:

- Typography

- Spacing

- Hero composition

- Header style

- Card design

- Image presentation

- Grid structure

- Color balance

- Section rhythm

- CTA styling

- Overall premium appearance

Do not finish with a generic design if the uploaded image establishes a more specific visual system.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d5990b15-508c-4286-91a3-73b08ac859f2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
