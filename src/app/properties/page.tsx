import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import PropertiesClient from "./PropertyClient";

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: [
      { isPremium: "desc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <Suspense
      fallback={
        <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
          Loading properties...
        </div>
      }
    >
      <PropertiesClient initialProperties={properties} />
    </Suspense>
  );
}