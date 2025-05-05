export function formatResponse(text: string) {
  const lines = text.split("\n");

  return lines.map((line, idx) => {
    // Heading level 3 (###)
    if (line.startsWith("#")) {
      return (
        <h3 key={idx} className="font-semibold text-base mt-4 mb-1">
          {line.replace(/^###\s*/, "")}
        </h3>
      );
    }

    // Bullet points with bold
    if (line.startsWith("*")) {
      const boldMatch = line.match(/\*\*(.*?)\*\*/);
      if (boldMatch) {
        const boldText = boldMatch[1];
        const rest = line.replace(`**${boldText}**`, "").replace(/^\*\s*/, "");
        return (
          <li key={idx} className=" list-disc mb-2 mt-4">
            <strong>{boldText}</strong>
            {rest ? `: ${rest}` : ""}
          </li>
        );
      }

      // Regular bullet
      return (
        <li key={idx} className="ml-8 list-disc mb-1">
          {line.replace(/^\*\s*/, "")}
        </li>
      );
    }

    // Normal paragraph
    if (line.trim() !== "") {
      return (
        <p key={idx} className="mb-2">
          {line}
        </p>
      );
    }

    return null;
  });
}
