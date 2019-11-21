/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose, withInstanceId } from '@wordpress/compose';
import { PanelBody } from '@wordpress/components';
import { InspectorControls, withColorContext } from '@wordpress/block-editor';
import { config } from '@wordpress/bravas';

/**
 * Internal dependencies
 */
import ColorControl from './components/color-control';
import Markup from './components/markup';

function GlobalColorEdit( { attributes, className, colors, setAttributes } ) {
	const { title } = attributes;

	const setColorAttribute = ( { color, slug } ) => {
		const nextColors = colors.map( ( item ) => {
			if ( item.slug !== slug ) {
				return item;
			}
			return {
				...item,
				color,
			};
		} );
		setAttributes( { colors: nextColors } );
	};

	const handleOnUpdateColor = ( { color, slug } ) => {
		configSet( `color.${ slug }`, color );
		setColorAttribute( { color, slug } );
	};

	return (
		<div className={ className } title={ title }>
			<Markup { ...{ color: colors[ 0 ].color } } />
			<InspectorControls>
				<PanelBody title={ __( 'Color Palette' ) }>
					{ colors.map( ( color, index ) => (
						<ColorControl
							{ ...color }
							onUpdateColor={ handleOnUpdateColor }
							key={ index }
						/>
					) ) }
				</PanelBody>
			</InspectorControls>
		</div>
	);
}

function configSet( props, value ) {
	if ( value !== undefined ) {
		config.set( props, value );
	}
}

export default compose( [ withInstanceId, withColorContext ] )( GlobalColorEdit );
