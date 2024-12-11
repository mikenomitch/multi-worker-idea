import { Worker } from 'cloudflare:workers';

export default {
  async fetch(request, env, ctx) {
    let workerBResponse = env.WORKER_B.fetch();
    let workerCResponse = env.WORKER_C.fetch();

    // using a binding...
    await fetch(env.METRICS_URL, { method: 'PUT' });

    return new Response('Hello World - ', +workerBResponse + workerCResponse);
  },
};

// This shares a top-level context with the standard Worker
// and you can just define it inline like this

// This has some of the downsides of Entrypoint, but I can
// define it inline so that's nice
export class WorkerB extends Worker {
  async fetch() {
    return new Response('Hello from Worker B');
  }

  add(a, b) {
    return a + b;
  }
}
