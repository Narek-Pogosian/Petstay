function Tag({ text }: { text: string }) {
  return (
    <div className="text-emerald-800 bg-emerald-50 rounded-full px-5 py-1 text-xs font-semibold">
      {text}
    </div>
  );
}

export default Tag;
