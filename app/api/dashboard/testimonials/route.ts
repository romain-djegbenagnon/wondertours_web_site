import {
  ok,
  created,
  parseBody,
  parseQuery,
  handleRoute,
} from "@/lib/api/utils";
import { listQuerySchema, testimonialCreateSchema } from "@/lib/api/schemas";
import {
  listTestimonials,
  createTestimonial,
} from "@/lib/services/testimonials";

export async function GET(request: Request) {
  return handleRoute(async () => {
    const [query, errorResponse] = parseQuery(request, listQuerySchema);
    if (errorResponse) return errorResponse;

    const result = await listTestimonials({
      page: query.page,
      pageSize: query.pageSize,
      q: query.q,
    });
    return ok(result);
  });
}

export async function POST(request: Request) {
  return handleRoute(async () => {
    const [body, errorResponse] = await parseBody(
      request,
      testimonialCreateSchema
    );
    if (errorResponse) return errorResponse;

    const testimonial = await createTestimonial({
      name: body.name,
      country: body.country ?? null,
      rating: body.rating,
      text: body.text,
      textEn: body.textEn ?? null,
      circuitId: body.circuitId ?? null,
      avatarUrl: body.avatarUrl ?? null,
      date: body.date ? new Date(body.date) : null,
      isVerified: body.isVerified,
      isFeatured: body.isFeatured,
      isActive: body.isActive,
    });

    return created(testimonial);
  });
}
