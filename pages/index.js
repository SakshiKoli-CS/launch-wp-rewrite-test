export default function Home() {
  return (
    <div>
      <h1>Welcome to test_rewrite</h1>
    </div>
  );
}

// Adding this function forces Next.js to treat this page as Server-Side Rendered (SSR)
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
