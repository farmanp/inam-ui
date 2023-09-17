import { Link, useLoaderData } from "@remix-run/react";

// Define loader function to get data from your API
export let loader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  
  if (!query) return { results: [] };

  const apiUrl = `http://localhost:3001/search?query=${query}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  return { results: data };
};

export default function Search() {
  let data = useLoaderData();

  return (
    <div>
      <form action="/search" method="get">
        <input
          type="text"
          name="query"
          placeholder="Search for a PDF..."
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {data.results.map((file, index) => (
          <li key={index}>
            {/* Adjust the URL based on your MinIO setup */}
            <Link to={`http://localhost:3001/download/${file.name}`}>{file.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
