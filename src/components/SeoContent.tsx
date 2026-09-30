import type { PortfolioData } from "@/data/portfolio";

/**
 * Server-rendered, crawlable representation of the portfolio.
 *
 * The interactive "OS" desktop is a client component gated behind a boot
 * animation, so it contributes nothing to the initial HTML. This component
 * mirrors the same data as real, semantic markup that search engines and
 * screen readers can consume. It is visually hidden (`sr-only`) because the
 * desktop covers the full viewport, but it remains in the DOM and the
 * accessibility tree.
 */
export function SeoContent({ data }: { data: PortfolioData }) {
  const { profile, education, experience, projects, skills, contact } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    email: `mailto:${contact.email}`,
    telephone: contact.phone,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
    },
    knowsAbout: skills.flatMap((group) => group.items),
    sameAs: contact.links.map((link) => link.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="sr-only" aria-label={`${profile.name} portfolio`}>
        <h1>
          {profile.name} — {profile.title}
        </h1>
        <p>{profile.summary}</p>
        <p>Location: {profile.location}</p>

        <h2>Highlights</h2>
        <ul>
          {profile.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <h2>Education</h2>
        <p>
          {education.degree}, {education.school} ({education.expected}). GPA{" "}
          {education.gpa}. {education.honors.join(", ")}.
        </p>

        <h2>Experience</h2>
        {experience.map((item) => (
          <article key={`${item.organization}-${item.role}`}>
            <h3>
              {item.role} — {item.organization} ({item.period})
            </h3>
            <p>{item.summary}</p>
            <ul>
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}

        <h2>Projects</h2>
        {projects.map((project) => (
          <article key={project.title}>
            <h3>
              {project.title} ({project.status})
            </h3>
            <p>{project.description}</p>
            <p>Tags: {project.tags.join(", ")}</p>
          </article>
        ))}

        <h2>Skills</h2>
        {skills.map((group) => (
          <div key={group.category}>
            <h3>{group.category}</h3>
            <p>{group.items.join(", ")}</p>
          </div>
        ))}

        <h2>Contact</h2>
        <ul>
          <li>
            Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>Phone: {contact.phone}</li>
          <li>Location: {contact.location}</li>
          {contact.links.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
