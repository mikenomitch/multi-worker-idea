import { WorkerEntrypoint } from "cloudflare:workers";
import someExpensiveDep from "expensive-dep";

someExpensiveDep.run();

export default {
  async fetch(request, env, ctx) {
    let bResponse = ctx.self.ENTRYPOINT_B.fetch();
    let cResponse = ctx.self.ENTRYPOINT_C.fetch();

    // using a binding...
    await fetch(env.METRICS_URL, { method: "PUT" });

    return new Response("Hello World - ", +bResponse + cResponse);
  },
};

// This shares a top-level context with the standard Worker
// and you can just define it inline like this

// This has some of the downsides of Entrypoint, but I can
// define it inline so that's nice
export class EntrypointB extends WorkerEntrypoint {
  bindingName = "ENTRYPOINT_B";

  async fetch() {
    return new Response("Hello from Entrypoint B");
  }

  add(a, b) {
    return a + b;
  }
}
