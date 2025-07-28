import { defineRouteMiddleware } from '@astrojs/starlight/route-data';


export const onRequest = defineRouteMiddleware((context, next) => {

    const { entry } = context.locals.starlightRoute;
    console.log('Resolved collection:', entry.collection, 'Slug:', entry.slug, 'File:', entry.id);
    entry.data.next = entry.data.peer;
    entry.data.prev = [
            ...(entry.data.parent ?? []),
            ...(entry.data.instanceOf ?? []),
            ...(entry.data.instances ?? []),
            ...(entry.data.child ?? [])
        ];
    entry.data.links = [
            ...(entry.data.links ?? []),
            ...(entry.data.peer ?? []),
        ];
    entry.data.backlinks = [
            ...(entry.data.parent ?? []),
            ...(entry.data.instanceOf ?? []),
            ...(entry.data.instances ?? []),
            ...(entry.data.child ?? [])
        ];

        return next();
});