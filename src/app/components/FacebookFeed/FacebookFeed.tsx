"use client";
import { useEffect, useState } from "react";

interface FacebookPost {
  message?: string;
  full_picture?: string;
  permalink_url?: string;
  created_time?: string;
}

const FacebookPosts = () => {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/facebook");

        if (res.status === 404) {
          setError(
            "Error: File not found. Check path: src/app/api/facebook/route.ts",
          );
          return;
        }

        // Parse JSON safely
        const data = await res.json().catch(() => ({}));

        // If the server sent an error object (stringified)
        if (data.error) {
          setError(data.error);
          return;
        }

        // If data is valid array
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Unexpected Data:", data);
          setError("Server returned unexpected data format.");
        }
      } catch (err) {
        console.error("Client Error:", err);
        setError("Failed to connect to API.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return <p className="text-center py-4 text-gray-500">Loading posts...</p>;

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-6 rounded-lg mx-auto max-w-2xl">
        <h3 className="text-[#ea393a] font-bold text-lg mb-2">
          Connection Error
        </h3>
        <p className="text-sm text-red-800 font-mono bg-white p-3 rounded border border-red-100 mb-2">
          {error}
        </p>
        <p className="text-xs text-gray-500">
          If it says "Credentials not set", please edit{" "}
          <code>src/app/api/facebook/route.ts</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {posts.map((post: FacebookPost, index: number) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
        >
          {post.full_picture ? (
            <img
              src={post.full_picture}
              alt="Post"
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <div className="p-4">
            <p className="text-sm text-gray-600 line-clamp-3 mb-3">
              {post.message || "No caption provided."}
            </p>

            {post.permalink_url && (
              <a
                href={post.permalink_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold text-sm inline-block hover:underline transition-all"
              >
                View on Facebook &rarr;
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacebookPosts;

// "use client";

// import { useEffect } from "react";

// export default function FacebookFeed() {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       (window as any).FB?.XFBML.parse();
//     }
//   }, []);

//   return (
//     <div
//       className="fb-page"
//       data-href="https://www.facebook.com/bpsti/"
//       data-tabs="timeline"
//       data-width="500"
//       data-height="600"
//     />
//   );
// }
