export default async function handler(request, context) {
  // Simple response to test if the edge function is being hit
  return new Response("Edge function is working! (No logic)", {
    status: 200,
    headers: {
      "content-type": "text/plain",
    },
  });
}
