/**
 * External dependencies
 */
import { omit } from 'lodash';

/**
 * WordPress dependencies
 */
import { config } from '@wordpress/bravas';
import { compose } from '@wordpress/compose';
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Markup from './components/markup';
import { generateFontSizes } from './utils';

function GlobalTypographyEdit( { attributes, setAttributes, className } ) {
	const otherAttributes = omit( attributes, [ 'align' ] );
	const { fontSizeH1 } = attributes;

	const fontSizes = {
		H1: fontSizeH1,
	};

	const innerProps = { ...otherAttributes, fontSizes };

	const updateAttribute = ( prop, value ) => {
		configSet( `typography.${ prop }`, value );
		setAttributes( { [ prop ]: value } );
	};

	return (
		<div className={ className }>
			<Markup { ...innerProps } />
			<InspectorControls>
				<FontSizePanel
					{ ...otherAttributes }
					updateAttribute={ updateAttribute }
				/>
			</InspectorControls>
		</div>
	);
}

function FontSizePanel( {
	fontFamilyBase,
	fontFamilyHeading,
	fontSizeBase,
	lineHeightBase,
	lineHeightHeading,
	typeScale,
	updateAttribute,
} ) {
	const updateHeadingSizes = ( headingSizes ) => {
		const headings = Object.keys( headingSizes );
		const paragraphSize = headingSizes.h6;

		headings.forEach( ( heading ) => {
			const size = headingSizes[ heading ];
			configSet(
				`typography.fontSize${ heading.toUpperCase() }`,
				`${ size }px`
			);
		} );

		configSet( 'typography.fontSizeBase', `${ paragraphSize }px` );
	};

	const updateProp = ( prop ) => ( value ) => updateAttribute( prop, value );

	const updateFontSize = ( value ) => {
		updateAttribute( 'fontSizeBase', value );
		const headingSizes = generateFontSizes( value, typeScale );
		updateHeadingSizes( headingSizes );
	};

	const updateTypeScale = ( value ) => {
		updateAttribute( 'typeScale', value );
		const headingSizes = generateFontSizes( fontSizeBase, value );
		updateHeadingSizes( headingSizes );
	};

	return (
		<>
			<PanelBody title="Font">
				<TextControl
					label="Heading Font"
					onChange={ updateProp( 'fontFamilyHeading' ) }
					value={ fontFamilyHeading }
				/>
				<TextControl
					label="Body Font"
					onChange={ updateProp( 'fontFamilyBase' ) }
					value={ fontFamilyBase }
				/>
			</PanelBody>
			<PanelBody title="Sizing">
				<RangeControl
					label="Font Size"
					onChange={ updateFontSize }
					value={ fontSizeBase }
					min={ 8 }
					max={ 30 }
					initialPosition={ 16 }
				/>
				<RangeControl
					label="Type Scale"
					onChange={ updateTypeScale }
					value={ typeScale }
					min={ 1 }
					max={ 1.65 }
					initialPosition={ 1.4 }
					step={ 0.05 }
				/>
			</PanelBody>
			<PanelBody title="Spacing">
				<RangeControl
					label="Heading Line Height"
					onChange={ updateProp( 'lineHeightHeading' ) }
					value={ lineHeightHeading }
					min={ 1 }
					max={ 2 }
					initialPosition={ 1.25 }
					step={ 0.05 }
				/>
				<RangeControl
					label="Line Height"
					onChange={ updateProp( 'lineHeightBase' ) }
					value={ lineHeightBase }
					min={ 1 }
					max={ 2.5 }
					initialPosition={ 1.5 }
					step={ 0.05 }
				/>
			</PanelBody>
		</>
	);
}

function configSet( props, value ) {
	if ( value !== undefined ) {
		config.set( props, value );
	}
}

function withDefaults( WrappedComponent ) {
	return ( props ) => {
		const { attributes, ...restProps } = props;

		const defaultAttributes = {
			fontFamilyBase:
				'NonBreakingSpaceOverride, "Hoefler Text", Garamond, "Times New Roman", serif',

			fontFamilyHeading:
				'"Inter var", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, sans-serif',
			fontSizeBase: 16,
			lineHeightBase: 1.5,
			lineHeightHeading: 1.25,
			typeScale: 1.25,
		};

		const enhancedAttributes = {
			...defaultAttributes,
			...attributes,
		};

		return (
			<WrappedComponent { ...restProps } attributes={ enhancedAttributes } />
		);
	};
}

export default compose( [ withDefaults ] )( GlobalTypographyEdit );
