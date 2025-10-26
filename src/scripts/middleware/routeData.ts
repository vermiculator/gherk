import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context, next) => {

	// Get the base path of the current URL
	// e.g. `/earth/some-page/` returns `/earth/`
	const currentBase = context.url.pathname.split('/').slice(0, 2).join('/') + '/';
	const { pagination } = context.locals.starlightRoute;

       // don't show fully on non-pagey pages
    if(currentBase !== '/earth/' && currentBase !== '/library/' && currentBase !== '/entities/'){

        context.locals.starlightRoute.sidebar = [
            // standard sidebar
            { label: 'earth', type: 'link', href: '/earth', isCurrent: false, badge: undefined, attrs: {} },
            { label: 'library', type: 'link', href: '/library', isCurrent: false, badge: undefined, attrs: {} },
            { label: 'vignettes', type: 'link', href: '/vignettes', isCurrent: (currentBase === '/vignettes/'), badge: undefined, attrs: {} },
            { label: 'mulch', type: 'link', href: '/mulch', isCurrent: (currentBase === '/mulch/'), badge: undefined, attrs: {} },

        ];
    } else {

        // Remove pagination links
        if (pagination.prev && !pagination.prev.href.startsWith(currentBase)) {
            pagination.prev = undefined;
        }
        if (pagination.next && !pagination.next.href.startsWith(currentBase)) {
            pagination.next = undefined;
        }

}

return next();

});