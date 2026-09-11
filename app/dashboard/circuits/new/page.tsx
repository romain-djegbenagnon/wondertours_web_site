import { listDestinations } from "@/lib/services/destinations";
import { listCategories } from "@/lib/services/categories";
import { CircuitForm } from "@/components/dashboard/forms/circuit-form";

export const dynamic = "force-dynamic";

export default async function NewCircuitPage() {
  const [destinations, categories] = await Promise.all([
    listDestinations({ pageSize: 100 }),
    listCategories({ pageSize: 100 }),
  ]);

  return (
    <CircuitForm
      destinations={destinations.items.map((d) => ({
        value: d.id,
        label: `${d.name}${d.country ? ` (${d.country})` : ""}`,
      }))}
      categories={categories.items.map((c) => ({ value: c.id, label: c.name }))}
    />
  );
}
