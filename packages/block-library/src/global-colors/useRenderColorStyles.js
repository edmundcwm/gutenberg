/**
 * WordPress dependencies
 */
import { config } from '@wordpress/global-block-styles/build';
import { useEffect } from '@wordpress/element';

export default function useRenderColorStyles( colors ) {
	useEffect( () => {
		colors.forEach( ( { slug, color } ) => {
			config.set( `color.${ slug }`, color );
		} );
	}, [ colors ] );
}
