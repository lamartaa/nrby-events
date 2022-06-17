/**
 * BLOCK: nrby-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import { EventPublicDetails } from './EventPublicDetails';
import { getEventPublicDetails } from '../data/WidgetRepository';
import { NrbyBlockContainer } from './NrbyBlockContainer';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */


registerBlockType( 'nrby/block-nrby-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Nrby Events' ), // Block title.
	class: "nrby-block",
	icon: 'tickets-alt', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'nrby-block ' ),
		__( '' ),
	],
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	 attributes: {
		eventIds: {
			type: 'array',
			default: []
		},
		useReadMore:{
			type: "boolean",
			default: false
		},
		hideVenueAndAddress:{
			type: "boolean",
			default: false
		},
		hideAgeRestrictions:{
			type: "boolean",
			default: false
		},
		hideDescription:{
			type: "boolean",
			default: false
		},
		widthUnits:{
			type: "string",
			default: ""
		},
		width:{
			type: "string",
			default: ""
		},
		fontScale:{
			type: "string",
			default: ""
		},
		fontFamily:{
			type: "string",
			default: ""
		},
		backgroundColor:{
			type: "string",
			default: ""
		},
		spacingBackground:{
			type: "string",
			default: ""
		},
		eventNameTextColor:{
			type: "string",
			default: ""
		},
		otherTextColor:{
			type: "string",
			default: ""
		},
		readMoreColor:{
			type: "string",
			default: ""
		},
		readMoreBackgroundColor:{
			type: "string",
			default: ""
		},
		ticketsButtonColor:{
			type: "string",
			default: ""
		},
		ticketsButtonBackgroundColor:{
			type: "string",
			default: ""
		},
		spacingUnits:{
			type: "string",
			default: ""
		},
		spacing:{
			type: "string",
			default: ""
		},
		events: {
			type: 'array',
			default: []
		}
	},
	edit: ( props ) => {

		const importWidgetClick = (
			events,
			eventIds, 
			useReadMore,
			hideVenueAndAddress,
			hideAgeRestrictions,
			hideDescription,
			width,
			widthUnits,
			fontScale,
			fontFamily,
			backgroundColor,
			spacingBackground,
			eventNameTextColor,
			otherTextColor,
			readMoreColor,
			readMoreBackgroundColor,
			ticketsButtonColor,
			ticketsButtonBackgroundColor,
			spacingUnits,
			spacing
		) => {

			props.setAttributes( {
				events: events,
				eventIds: eventIds,
				useReadMore: useReadMore,
				hideVenueAndAddress: hideVenueAndAddress,
				hideAgeRestrictions: hideAgeRestrictions,
				hideDescription: hideDescription,
				width: width,
				widthUnits: widthUnits,
				fontScale: fontScale,
				fontFamily: fontFamily,
				backgroundColor: backgroundColor,
				spacingBackground: spacingBackground,
				eventNameTextColor: eventNameTextColor,
				otherTextColor: otherTextColor,
				readMoreColor: readMoreColor,
				readMoreBackgroundColor: readMoreBackgroundColor,
				ticketsButtonColor: ticketsButtonColor,
				ticketsButtonBackgroundColor: ticketsButtonBackgroundColor,
				spacingUnits: spacingUnits,
				spacing: spacing
			})
		}

		return (
			<NrbyBlockContainer
				importWidget={importWidgetClick}
				events={props.attributes.events}
				eventIds={props.attributes.eventIds}
				useReadMore={props.attributes.useReadMore}
				hideVenueAndAddress={props.attributes.hideVenueAndAddress}
				hideAgeRestrictions={props.attributes.hideAgeRestrictions}
				hideDescription={props.attributes.hideDescription}
				width={props.attributes.width}
				widthUnits={props.attributes.widthUnits}
				fontScale={props.attributes.fontScale}
				fontFamily={props.attributes.fontFamily}
				backgroundColor={props.attributes.backgroundColor}
				spacingBackground={props.attributes.spacingBackground}
				eventNameTextColor={props.attributes.eventNameTextColor}
				otherTextColor={props.attributes.otherTextColor}
				readMoreColor={props.attributes.readMoreColor}
				readMoreBackgroundColor={props.attributes.readMoreBackgroundColor}
				ticketsButtonColor={props.attributes.ticketsButtonColor}
				ticketsButtonBackgroundColor={props.attributes.ticketsButtonBackgroundColor}
				spacingUnits={props.attributes.spacingUnits}
				spacing={props.attributes.spacing}
			/>
		);
	},
	save: ( props ) => {

		var eventPublicDetailsBodyStyles = {
            background: props.attributes.spacingBackground,
			width: props.attributes.width != "" ? props.attributes.width + props.attributes.widthUnits : "100%",
            marginBottom: "20px"
        }

		let events = props.attributes.events != null ? props.attributes.events : [];
		
		return (
			<div style={eventPublicDetailsBodyStyles} className="event-public-details-container">
				{events.map((e, i) => (
                    <EventPublicDetails 
                        event={e}
						editorMode={false}
                        useReadMore={props.attributes.useReadMore}
                        hideVenueAndAddress={props.attributes.hideVenueAndAddress}
                        hideAgeRestrictions={props.attributes.hideAgeRestrictions}
                        hideDescription={props.attributes.hideDescription}
                        fontScale={props.attributes.fontScale}
                        fontFamily={props.attributes.fontFamily}
                        backgroundColor={props.attributes.backgroundColor}
                        spacingBackground={props.attributes.spacingBackground}
                        eventNameTextColor={props.attributes.eventNameTextColor}
                        otherTextColor={props.attributes.otherTextColor}
                        readMoreColor={props.attributes.readMoreColor}
                        readMoreBackgroundColor={props.attributes.readMoreBackgroundColor}
                        ticketsButtonColor={props.attributes.ticketsButtonColor}
                        ticketsButtonBackgroundColor={props.attributes.ticketsButtonBackgroundColor}
                        spacingUnits={props.attributes.spacingUnits}
                        spacing={props.attributes.spacingUnits != '' && props.attributes.spacing && (i != events.length - 1)? props.attributes.spacing : ""}
                    />
					))
                    }
			</div>
		);
	},
} );
