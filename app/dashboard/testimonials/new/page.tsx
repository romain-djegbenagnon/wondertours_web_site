import { listCircuits } from "@/lib/services/circuits";
import { TestimonialForm } from "@/components/dashboard/forms/testimonial-form";

export const dynamic = "force-dynamic";

export default async function NewTestimonialPage() {
  const circuits = await listCircuits({ pageSize: 100 });

  return (
    <TestimonialForm
      circuits={circuits.items.map((c) => ({ value: c.id, label: c.title }))}
    />
  );
}
