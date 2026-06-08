import Image from "next/image";
import Link from "next/link";
import styles from "./JournalStripSection.module.css";

// Will come from Sanity
const SEED_ARTICLES = [
  {
    slug: "boutique-hotel-trends-2027",
    category: "Boutique Hotel Trends",
    title: "How Guest Expectations Are Evolving Beyond Luxury Amenities",
    excerpt: "For years, boutique hotels competed through aesthetics. Today, guests increasingly remember something less tangible: ease, authenticity, and emotional continuity throughout the stay.",
    readingTime: 6,
    image: {
      src: "/images/website/sections/pool-afternoon - section - 16x9.jpeg",
      alt: "Boutique hotel pool at late afternoon, still water and stone surround",
    },
  },
  {
    slug: "arrival-experience-psychology",
    category: "Hospitality Psychology",
    title: "Why Boutique Hotels Lose Guests During the First Ten Minutes of Arrival",
    excerpt: "Most boutique hotels lose guest confidence during the arrival phase due to unclear orientation, fragmented communication, and lack of spatial guidance.",
    readingTime: 5,
    image: {
      src: "/images/website/sections/welcome-note.png",
      alt: "Handwritten welcome note beside regional amenities on a hotel room surface",
    },
  },
  {
    slug: "what-should-never-change",
    category: "Experience Frameworks",
    title: "What Should Never Change - Protecting Identity as a Property Grows",
    excerpt: "The qualities that make a property genuinely distinctive are rarely listed in guest feedback. Guests only notice when they are gone.",
    readingTime: 7,
    image: {
      src: "/images/website/journal/Bed_curtains.png",
      alt: "Linen curtains beside a hotel bed, soft light, stillness",
    },
  },
];

export function JournalStripSection() {
  return (
    <section className={styles.section} aria-labelledby="journal-heading">
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.label}>Journal</p>
            <h2 id="journal-heading" className={styles.heading}>
              Observations from the field
            </h2>
          </div>
          <Link href="/journal" className={styles.allLink}>
            All articles
          </Link>
        </div>

        {/* Articles grid */}
        <div className={styles.grid}>
          {SEED_ARTICLES.map((article) => (
            <Link key={article.slug} href={`/journal/${article.slug}`} className={styles.article}>
              <div className={styles.articleImagePlaceholder} aria-hidden="true">
                <Image
                  src={article.image.src}
                  alt={article.image.alt}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.articleContent}>
                <p className={styles.articleCategory}>{article.category}</p>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.articleExcerpt}>{article.excerpt}</p>
                <p className={styles.articleMeta}>{article.readingTime} min read</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
