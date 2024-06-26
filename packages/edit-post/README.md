# Edit Post

Edit Post Module for WordPress.

> This package is meant to be used only with WordPress core. Feel free to use it in your own project but please keep in mind that it might never get fully documented.

## Installation

Install the module

```bash
npm install @wordpress/edit-post
```

_This package assumes that your code will run in an **ES2015+** environment. If you're using an environment that has limited or no support for such language features and APIs, you should include [the polyfill shipped in `@wordpress/babel-preset-default`](https://github.com/WordPress/gutenberg/tree/HEAD/packages/babel-preset-default#polyfill) in your code._

## Extending the post editor UI

Extending the editor UI can be accomplished with the `registerPlugin` API, allowing you to define all your plugin's UI elements in one place.

Refer to [the plugins module documentation](https://github.com/WordPress/gutenberg/tree/HEAD/packages/plugins/README.md) for more information.

The components exported through the API can be used with the `registerPlugin` ([see documentation](https://github.com/WordPress/gutenberg/tree/HEAD/packages/plugins/README.md)) API.
They can be found in the global variable `wp.editPost` when defining `wp-edit-post` as a script dependency.

## API

<!-- START TOKEN(Autogenerated API docs) -->

### initializeEditor

Initializes and returns an instance of Editor.

_Parameters_

-   _id_ `string`: Unique identifier for editor instance.
-   _postType_ `string`: Post type of the post to edit.
-   _postId_ `Object`: ID of the post to edit.
-   _settings_ `?Object`: Editor settings object.
-   _initialEdits_ `Object`: Programmatic edits to apply initially, to be considered as non-user-initiated (bypass for unsaved changes prompt).

### PluginBlockSettingsMenuItem

Undocumented declaration.

### PluginDocumentSettingPanel

Undocumented declaration.

### PluginMoreMenuItem

Renders a menu item in `Plugins` group in `More Menu` drop down, and can be used to as a button or link depending on the props provided. The text within the component appears as the menu item label.

_Usage_

```js
// Using ES5 syntax
var __ = wp.i18n.__;
var PluginMoreMenuItem = wp.editPost.PluginMoreMenuItem;
var moreIcon = React.createElement( 'svg' ); //... svg element.

function onButtonClick() {
	alert( 'Button clicked.' );
}

function MyButtonMoreMenuItem() {
	return React.createElement(
		PluginMoreMenuItem,
		{
			icon: moreIcon,
			onClick: onButtonClick,
		},
		__( 'My button title' )
	);
}
```

```jsx
// Using ESNext syntax
import { __ } from '@wordpress/i18n';
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { more } from '@wordpress/icons';

function onButtonClick() {
	alert( 'Button clicked.' );
}

const MyButtonMoreMenuItem = () => (
	<PluginMoreMenuItem icon={ more } onClick={ onButtonClick }>
		{ __( 'My button title' ) }
	</PluginMoreMenuItem>
);
```

_Parameters_

-   _props_ `Object`: Component properties.
-   _props.href_ `[string]`: When `href` is provided then the menu item is represented as an anchor rather than button. It corresponds to the `href` attribute of the anchor.
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered to the left of the menu item label.
-   _props.onClick_ `[Function]`: The callback function to be executed when the user clicks the menu item.
-   _props.other_ `[...*]`: Any additional props are passed through to the underlying [MenuItem](https://github.com/WordPress/gutenberg/tree/HEAD/packages/components/src/menu-item/README.md) component.

_Returns_

-   `Component`: The component to be rendered.

### PluginPostPublishPanel

> **Deprecated** since 6.6, use `wp.editor.PluginPostPublishPanel` instead.

Renders provided content to the post-publish panel in the publish flow (side panel that opens after a user publishes the post).

_Parameters_

-   _props_ `Object`: Component properties.
-   _props.className_ `[string]`: An optional class name added to the panel.
-   _props.title_ `[string]`: Title displayed at the top of the panel.
-   _props.initialOpen_ `[boolean]`: Whether to have the panel initially opened. When no title is provided it is always opened.
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered when the sidebar is pinned to toolbar.
-   _props.children_ `Element`: Children to be rendered

_Returns_

-   `Component`: The component to be rendered.

### PluginPostStatusInfo

Renders a row in the Summary panel of the Document sidebar. It should be noted that this is named and implemented around the function it serves and not its location, which may change in future iterations.

_Usage_

```js
// Using ES5 syntax
var __ = wp.i18n.__;
var PluginPostStatusInfo = wp.editPost.PluginPostStatusInfo;

function MyPluginPostStatusInfo() {
	return React.createElement(
		PluginPostStatusInfo,
		{
			className: 'my-plugin-post-status-info',
		},
		__( 'My post status info' )
	);
}
```

```jsx
// Using ESNext syntax
import { __ } from '@wordpress/i18n';
import { PluginPostStatusInfo } from '@wordpress/edit-post';

const MyPluginPostStatusInfo = () => (
	<PluginPostStatusInfo className="my-plugin-post-status-info">
		{ __( 'My post status info' ) }
	</PluginPostStatusInfo>
);
```

_Parameters_

-   _props_ `Object`: Component properties.
-   _props.className_ `[string]`: An optional class name added to the row.
-   _props.children_ `Element`: Children to be rendered.

_Returns_

-   `Component`: The component to be rendered.

### PluginPrePublishPanel

> **Deprecated** since 6.6, use `wp.editor.PluginPrePublishPanel` instead.

Renders provided content to the pre-publish side panel in the publish flow (side panel that opens when a user first pushes "Publish" from the main editor).

_Parameters_

-   _props_ `Object`: Component props.
-   _props.className_ `[string]`: An optional class name added to the panel.
-   _props.title_ `[string]`: Title displayed at the top of the panel.
-   _props.initialOpen_ `[boolean]`: Whether to have the panel initially opened. When no title is provided it is always opened.
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered when the sidebar is pinned to toolbar.
-   _props.children_ `Element`: Children to be rendered

_Returns_

-   `Component`: The component to be rendered.

### PluginSidebar

Renders a sidebar when activated. The contents within the `PluginSidebar` will appear as content within the sidebar. It also automatically renders a corresponding `PluginSidebarMenuItem` component when `isPinnable` flag is set to `true`. If you wish to display the sidebar, you can with use the `PluginSidebarMoreMenuItem` component or the `wp.data.dispatch` API:

```js
wp.data
	.dispatch( 'core/edit-post' )
	.openGeneralSidebar( 'plugin-name/sidebar-name' );
```

_Related_

-   PluginSidebarMoreMenuItem

_Usage_

```js
// Using ES5 syntax
var __ = wp.i18n.__;
var el = React.createElement;
var PanelBody = wp.components.PanelBody;
var PluginSidebar = wp.editPost.PluginSidebar;
var moreIcon = React.createElement( 'svg' ); //... svg element.

function MyPluginSidebar() {
	return el(
		PluginSidebar,
		{
			name: 'my-sidebar',
			title: 'My sidebar title',
			icon: moreIcon,
		},
		el( PanelBody, {}, __( 'My sidebar content' ) )
	);
}
```

```jsx
// Using ESNext syntax
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { PluginSidebar } from '@wordpress/edit-post';
import { more } from '@wordpress/icons';

const MyPluginSidebar = () => (
	<PluginSidebar name="my-sidebar" title="My sidebar title" icon={ more }>
		<PanelBody>{ __( 'My sidebar content' ) }</PanelBody>
	</PluginSidebar>
);
```

_Parameters_

-   _props_ `Object`: Element props.
-   _props.name_ `string`: A string identifying the sidebar. Must be unique for every sidebar registered within the scope of your plugin.
-   _props.className_ `[string]`: An optional class name added to the sidebar body.
-   _props.title_ `string`: Title displayed at the top of the sidebar.
-   _props.isPinnable_ `[boolean]`: Whether to allow to pin sidebar to the toolbar. When set to `true` it also automatically renders a corresponding menu item.
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered when the sidebar is pinned to toolbar.

### PluginSidebarMoreMenuItem

Renders a menu item in `Plugins` group in `More Menu` drop down, and can be used to activate the corresponding `PluginSidebar` component. The text within the component appears as the menu item label.

_Usage_

```js
// Using ES5 syntax
var __ = wp.i18n.__;
var PluginSidebarMoreMenuItem = wp.editPost.PluginSidebarMoreMenuItem;
var moreIcon = React.createElement( 'svg' ); //... svg element.

function MySidebarMoreMenuItem() {
	return React.createElement(
		PluginSidebarMoreMenuItem,
		{
			target: 'my-sidebar',
			icon: moreIcon,
		},
		__( 'My sidebar title' )
	);
}
```

```jsx
// Using ESNext syntax
import { __ } from '@wordpress/i18n';
import { PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { more } from '@wordpress/icons';

const MySidebarMoreMenuItem = () => (
	<PluginSidebarMoreMenuItem target="my-sidebar" icon={ more }>
		{ __( 'My sidebar title' ) }
	</PluginSidebarMoreMenuItem>
);
```

_Parameters_

-   _props_ `Object`: Component props.
-   _props.target_ `string`: A string identifying the target sidebar you wish to be activated by this menu item. Must be the same as the `name` prop you have given to that sidebar.
-   _props.icon_ `[WPBlockTypeIconRender]`: The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered to the left of the menu item label.

_Returns_

-   `Component`: The component to be rendered.

### reinitializeEditor

Used to reinitialize the editor after an error. Now it's a deprecated noop function.

### store

Store definition for the edit post namespace.

_Related_

-   <https://github.com/WordPress/gutenberg/blob/HEAD/packages/data/README.md#createReduxStore>

_Type_

-   `Object`

<!-- END TOKEN(Autogenerated API docs) -->

## Contributing to this package

This is an individual package that's part of the Gutenberg project. The project is organized as a monorepo. It's made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project's main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).

<br /><br /><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>
