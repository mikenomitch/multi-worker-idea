// This can be defined in the same codebase as the main entrypoint,
// but it doesn't share a top-level context with anybody unnecessarily

// It can reuse bindings defined in the main wrangler.toml file

export default class EntrypointC extends WorkerEntrypoint {
  bindingName: 'ENTRYPOINT_C',
  placement: 'smart',

  async fetch(request, env, ctx) {
    await fetch(env.METRICS_URL, { method: 'PUT' });

    return new Response('Hello from Entrypoint C');
  },
};
