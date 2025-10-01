import { useState } from "react";

export default function Test() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shortenUrl = async () => {
    try {
      const res = await fetch("https://api.tinyurl.com/create", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer tfnB59DufkSv4TFwbvmiPdm9CUxcTfDPFcje12rwR1xQ3a3Ije5h2FRsD1io",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: longUrl }),
      });

      const data = await res.json();
      setShortUrl(data.data.tiny_url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter long URL"
      />
      <button onClick={shortenUrl}>Shorten</button>

      {shortUrl && (
        <p>
          Shortened URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
    </div>
  );
}
