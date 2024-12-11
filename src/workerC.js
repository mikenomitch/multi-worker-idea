// This can be defined in the same codebase as the main Worker,
// but it doesn't share a top-level context with anybody unnecessarily

// It can reuse bindings defined in the main wrangler.toml file

export default {
  async fetch(request, env, ctx) {
    // using a binding also defined in the main wrangler.toml file
    await fetch(env.METRICS_URL, { method: 'PUT' });

    return new Response('Hello from Worker C');
  },
};
