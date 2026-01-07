type Keyword = {
  text: string;
  className?: string;
};

export function HighlightKeywords({
  content,
  keywords,
}: {
  content: string;
  keywords: Keyword[];
}) {
  if (!content) return null;

  const regex = new RegExp(`(${keywords.map((k) => k.text).join("|")})`, "gi");

  return content.split(regex).map((part, i) => {
    const keyword = keywords.find(
      (k) => k.text.toLowerCase() === part.toLowerCase()
    );

    return keyword ? (
      <span
        key={i}
        className={keyword.className ?? "text-blue-500 font-medium"}
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    );
  });
}
