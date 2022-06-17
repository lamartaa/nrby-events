<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function nrby_block_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'nrby_block-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	wp_register_script(
		'nrby_block-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	wp_register_style(
		'nrby_block-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	register_block_type(
		'nrby/block-nrby-block', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'nrby_block-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'nrby_block-cgb-block-js?v=3',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'nrby_block-cgb-block-editor-css'
		)
	);

	wp_enqueue_script(
        'nrby-readmore-clicker',
        plugins_url('nrby-readmore-clicker.js', __FILE__),
        array('jquery'),
        filemtime( plugin_dir_path( __FILE__ ) . 'nrby-readmore-clicker.js' ),
        true
    );
}

// Hook: Block assets.
add_action( 'init', 'nrby_block_cgb_block_assets' );


