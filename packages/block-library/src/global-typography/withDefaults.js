/**
 * WordPress dependencies
 */
import { defaultConfig } from '@wordpress/bravas';

const defaultAttributes = defaultConfig.typography;

export default function withDefaults( WrappedComponent ) {
	return ( props ) => {
		const { attributes, ...restProps } = props;

		const enhancedAttributes = {
			...defaultAttributes,
			...attributes,
		};

		return (
			<WrappedComponent { ...restProps } attributes={ enhancedAttributes } />
		);
	};
}
