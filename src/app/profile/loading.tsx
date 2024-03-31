import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  const items = new Array(8).fill(0);

  return (
    <>
      <Skeleton className="w-60 mx-auto mb-8 h-8"></Skeleton>
      <div className="grid gap-12 lg:grid-cols-2">
        {items.map((_, i) => (
          <Skeleton key={i} className="h-[90px] rounded"></Skeleton>
        ))}
      </div>
    </>
  );
}

export default loading;
