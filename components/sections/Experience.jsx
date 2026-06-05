import { Section, SectionHeading } from "./Section";
import { GradientText } from "@/components/motion/text-effects";
import { sanityFetch } from "@/sanity/lib/live";
import { EXPERIENCE_QUERY } from "@/sanity/lib/queries";
import { ExperienceClient } from "./ExperienceClient";

async function getExperience() {
  try {
    const { data } = await sanityFetch({ query: EXPERIENCE_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Failed to fetch experience:", error?.message);
    return [];
  }
}

export async function Experience() {
  const items = await getExperience();

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title={
          <>
            My <GradientText>journey</GradientText> so far
          </>
        }
        subtitle="Internships, training and hands-on experience that shaped me."
      />

      <ExperienceClient items={items} />
    </Section>
  );
}
