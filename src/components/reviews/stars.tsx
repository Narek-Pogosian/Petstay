import Star from "./star";

type Props = {
  count: number;
};

function Stars({ count }: Props) {
  if (count === 0) {
    return <p></p>;
  }

  return (
    <div>
      {[...Array(count)].map((_, i) => {
        return <Star key={i} />;
      })}
    </div>
  );
}

export default Stars;
