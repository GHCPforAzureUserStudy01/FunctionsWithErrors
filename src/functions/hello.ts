import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function hello(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text();

    if (!name) {
        context.warn('Name was missing.');
        return { body: `Please pass name in the query or body` };
    } else {
        return { body: `Hello, ${name}!` };
    }
};

app.http('hello', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: hello
});
