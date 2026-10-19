export default function Image({ src, ratio = "16/9", alt = "" }) {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          aspectRatio: ratio,
          objectFit: "cover",
          display: "block",
        }}
      />
    );
  }