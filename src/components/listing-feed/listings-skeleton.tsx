import { Skeleton } from "../ui/skeleton";

function ListingsSkeleton() {
  const items = new Array(8).fill(0);
  return (
    <ul className="grid lg:grid-cols-2 gap-12">
      {items.map((_, i) => (
        <Skeleton key={i} className="h-[200px] rounded"></Skeleton>
      ))}
    </ul>
  );
}

export default ListingsSkeleton;
