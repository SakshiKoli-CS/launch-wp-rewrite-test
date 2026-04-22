export default function Tickets() {
  return (
    <div>
      <h1>Tickets Page</h1>
      <p>This page is served from a JavaScript file.</p>
      <a href="/">Back to Home</a>
    </div>
  );
}

// Adding this function forces Next.js to treat this page as Server-Side Rendered (SSR)
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
