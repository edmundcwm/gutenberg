export default function Swatch( { color, ...restProps } ) {
	const style = { backgroundColor: color };

	return <div { ...restProps } className="wp-global-colors-swatch" style={ style } />;
}
