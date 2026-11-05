/**
 * Recommendations from managers, teammates or clients.
 *
 * In a tight market, a line from someone who worked with you is the strongest
 * signal on the page. Copy real quotes (with permission) from LinkedIn
 * recommendations or emails. Never write them yourself.
 *
 * The section on the home and hire pages stays hidden while this list is empty.
 *
 * Example:
 *   {
 *     quote: "Kanai took our release process from an afternoon to minutes.",
 *     name: "Full Name",
 *     role: "Engineering Manager, Company",
 *     link: "https://linkedin.com/in/...",
 *   },
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  link?: string;
}

export const testimonials: Testimonial[] = [];
