/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { DotTip } from '@wordpress/nux';
import { __ } from '@wordpress/i18n';
import {
	Inserter,
	BlockToolbar,
	NavigableToolbar,
	BlockNavigationDropdown,
	ToolSelector,
} from '@wordpress/block-editor';
import {
	TableOfContents,
	EditorHistoryRedo,
	EditorHistoryUndo,
} from '@wordpress/editor';

function HeaderToolbar() {
	const { hasFixedToolbar, showInserter, isTextModeEnabled } = useSelect( ( select ) => ( {
		hasFixedToolbar: select( 'core/edit-post' ).isFeatureActive( 'fixedToolbar' ),
		// This setting (richEditingEnabled) should not live in the block editor's setting.
		showInserter: select( 'core/edit-post' ).getEditorMode() === 'visual' && select( 'core/editor' ).getEditorSettings().richEditingEnabled,
		isTextModeEnabled: select( 'core/edit-post' ).getEditorMode() === 'text',
	} ) );
	const isLargeViewport = useViewportMatch( 'medium' );

	const toolbarAriaLabel = hasFixedToolbar ?
		/* translators: accessibility text for the editor toolbar when Top Toolbar is on */
		__( 'Document and block tools' ) :
		/* translators: accessibility text for the editor toolbar when Top Toolbar is off */
		__( 'Document tools' );

	return (
		<NavigableToolbar
			className="edit-post-header-toolbar"
			aria-label={ toolbarAriaLabel }
		>
			<div>
				<Inserter disabled={ ! showInserter } position="bottom right" showInserterHelpPanel />
				<DotTip tipId="core/editor.inserter">
					{ __( 'Welcome to the wonderful world of blocks! Click the “+” (“Add block”) button to add a new block. There are blocks available for all kinds of content: you can insert text, headings, images, lists, and lots more!' ) }
				</DotTip>
			</div>
			<EditorHistoryUndo />
			<EditorHistoryRedo />
			<TableOfContents hasOutlineItemsDisabled={ isTextModeEnabled } />
			<BlockNavigationDropdown isDisabled={ isTextModeEnabled } />
			<ToolSelector />
			{ hasFixedToolbar && isLargeViewport && (
				<div className="edit-post-header-toolbar__block-toolbar">
					<BlockToolbar />
				</div>
			) }
		</NavigableToolbar>
	);
}

export default HeaderToolbar;
