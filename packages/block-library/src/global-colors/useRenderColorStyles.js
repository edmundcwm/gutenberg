/**
 * WordPress dependencies
 */
import { config } from '@wordpress/bravas';
import { useEffect } from '@wordpress/element';

export default function useRenderColorStyles( colors ) {
	useEffect( () => {
		colors.forEach( ( { slug, color } ) => {
			config.set( `color.${ slug }`, color );
		} );
	}, [ colors ] );
}
