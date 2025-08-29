import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import type { ReferenceDataEntry } from 'astro:content';


export const onRequest = defineRouteMiddleware((context, next) => {

    const { entry } = context.locals.starlightRoute;
    console.log('Resolved collection:', entry.collection, 'Slug:', entry.slug, 'File:', entry.id);
    entry.data.forwards = entry.data.peer;
    entry.data.backwards = [
            ...(entry.data.parent ?? []),
            ...(entry.data.instanceOf ?? []),
            ...(entry.data.instances ?? []),
            ...(entry.data.child ?? [])
        ];
    entry.data.prev = convertToLink(entry.data.prev? (entry.data.backwards?entry.data.backwards[0] : false) : false);
    entry.data.next = convertToLink(entry.data.next? (entry.data.forwards? entry.data.forwards[0] : false) : false);
    entry.data.links = convertToLinks([
            ...(entry.data.links ?? []),
            ...(entry.data.peer ?? []),
        ]);
    entry.data.backlinks = {visible: true};
    //convertToLinks([
    //...(entry.data.parent ?? []),
    //...(entry.data.instanceOf ?? []),
    //...(entry.data.instances ?? []),
    //...(entry.data.child ?? [])
    //]);
        return next();
});

const convertToLinks = (links: any[]): string[] | undefined => {
    return links && links.length > 0
        ? links.map(convertToLink).filter((link): link is string => typeof link === 'string')
        : undefined;
};

const convertToLink = (link: any): string | undefined => {
    return (link !== null ? `${link.collection}/${link.slug}` : undefined);
};