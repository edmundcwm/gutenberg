/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose, withInstanceId } from '@wordpress/compose';
import { PanelBody } from '@wordpress/components';
import { InspectorControls, withColorContext } from '@wordpress/block-editor';
import { config } from '@wordpress/bravas';

/**
 * External dependencies
 */
import { uniqBy } from 'lodash';

/**
 * Internal dependencies
 */
import ColorControl from './components/color-control';
import Markup from './components/markup';

function GlobalColorEdit( props ) {
	const { attributes, className, colors, setAttributes } = props;
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
		setAttributes( { globalColors: nextColors } );
	};

	const handleOnUpdateColor = ( { color, slug } ) => {
		configSet( `color.${ slug }`, color );
		setColorAttribute( { color, slug } );
	};

	return (
		<div className={ className } title={ title }>
			<Markup colors={ colors } />
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

function mergeColorSets( a, b ) {
	return uniqBy( [ ...b, ...a ], 'slug' );
}

function withGlobalColorOverrides( WrappedComponent ) {
	return ( props ) => {
		const { colors: baseColors = [], attributes: { globalColors = [] } } = props;
		const mergedColors = mergeColorSets( baseColors, globalColors );

		return <WrappedComponent { ...props } colors={ mergedColors } />;
	};
}

export default compose( [ withInstanceId, withColorContext, withGlobalColorOverrides ] )( GlobalColorEdit );
