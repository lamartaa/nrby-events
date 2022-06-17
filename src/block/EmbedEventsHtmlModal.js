import React from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Radio, InputLabel, Select, MenuItem, TextField, Dialog, DialogTitle, Typography, IconButton, DialogContent, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Color, ColorFormat, ColorPicker, createColor } from 'material-ui-color';
import { EventPublicDetails } from './EventPublicDetails';
import { getEventPublicDetails } from '../data/WidgetRepository';

export class EmbedEventsHtmlModal extends React.Component {

    state = {
        events: [],
        platformType: "standard",
        useReadMore: false,
        hideVenueAndAddress: false,
        hideAgeRestrictions: false,
        hideDescription: false,
        customWidth: false,
        width: "100",
        widthUnits: "%",
        customBackgroundColor: false,
        backgroundColor: createColor('black'),
        customEventNameTextColor: false,
        eventNameTextColor: createColor('black'),
        customOtherTextColor: false,
        otherTextColor: createColor('black'),
        customFontFamily: false,
        fontFamily: '',
        customFontScale: false,
        fontScale: "1.0",
        customSpacing: false,
        spacingValue: '',
        spacingUnits: '',
        customSpacingBackground: false,
        spacingBackground: createColor('black'),
        customReadMoreColor: false,
        readMoreColor: createColor('black'),
        customReadMoreBackgroundColor: false,
        readMoreBackgroundColor: createColor('black'),
        customTicketsButtonColor: false,
        ticketsButtonColor: createColor('black'),
        customTicketsButtonBackgroundColor: false,
        ticketsButtonBackgroundColor: createColor('black'),
        serverError: ""
    }

    async componentDidMount() {
        let useReadMore = this.props.useReadMore;
        let hideVenueAndAddress = this.props.hideVenueAndAddress;
        let hideAgeRestrictions = this.props.hideAgeRestrictions;
        let hideDescription = this.props.hideDescription;

        let customWidth = false;
        let width = 100;
        let widthUnits = "%";

        if(this.props.width != null && this.props.width != ""
            && this.props.widthUnits != null && this.props.widthUnits != ""){
                customWidth = true;
                width = this.props.width;
                widthUnits = this.props.widthUnits;
        }

        let customBackgroundColor = false;
        let backgroundColor = createColor('black');

        if(this.props.backgroundColor != null && this.props.backgroundColor != ""){
            customBackgroundColor = true;
            backgroundColor = createColor("#" + this.props.backgroundColor);
        }

        let customEventNameTextColor = false;
        let eventNameTextColor = createColor('black');

        if(this.props.eventNameTextColor != null && this.props.eventNameTextColor != ""){
            customEventNameTextColor = true;
            eventNameTextColor = createColor("#" + this.props.eventNameTextColor);
        }

        let customOtherTextColor = false;
        let otherTextColor = createColor('black');

        if(this.props.otherTextColor != null && this.props.otherTextColor != ""){
            customOtherTextColor = true;
            otherTextColor = createColor("#" + this.props.otherTextColor);
        }

        let customFontFamily = false;
        let fontFamily = '';

        if(this.props.fontFamily != null && this.props.fontFamily != ""){
            customFontFamily = true;
            fontFamily = this.props.fontFamily;
        }

        let customFontScale = false;
        let fontScale = "1.0";

        if(this.props.fontScale != null && this.props.fontScale != ""){
            customFontScale = true;
            fontScale = this.props.fontScale;
        }

        let customSpacing = false;
        let spacingValue = '';
        let spacingUnits = '';

        if(this.props.spacing != null && this.props.spacing != "" &&
            this.props.spacingUnits != null && this.props.spacingUnits != ""
        ){
            customSpacing = true;
            spacingValue = this.props.spacing;
            spacingUnits = this.props.spacingUnits;
        }

        let customSpacingBackground = false;
        let spacingBackground = createColor('black');

        if(this.props.spacingBackground != null && this.props.spacingBackground != ""){
            customSpacingBackground = true;
            spacingBackground = createColor("#" + this.props.spacingBackground);
        }

        let customReadMoreColor = false;
        let readMoreColor = createColor('black');

        if(this.props.readMoreColor != null && this.props.readMoreColor != ""){
            customReadMoreColor = true;
            readMoreColor = createColor("#" + this.props.readMoreColor);
        }

        let customReadMoreBackgroundColor = false;
        let readMoreBackgroundColor = createColor('black');

        if(this.props.readMoreBackgroundColor != null && this.props.readMoreBackgroundColor != ""){
            customReadMoreBackgroundColor = true;
            readMoreBackgroundColor = createColor("#" + this.props.readMoreBackgroundColor);
        }

        let customTicketsButtonColor = false;
        let ticketsButtonColor = createColor('black');

        if(this.props.ticketsButtonColor != null && this.props.ticketsButtonColor != ""){
            customTicketsButtonColor = true;
            ticketsButtonColor = createColor("#" + this.props.ticketsButtonColor);
        }

        let customTicketsButtonBackgroundColor = false;
        let ticketsButtonBackgroundColor = createColor('black');

        if(this.props.ticketsButtonBackgroundColor != null && this.props.ticketsButtonBackgroundColor != ""){
            customTicketsButtonBackgroundColor = true;
            ticketsButtonBackgroundColor = createColor("#" + this.props.ticketsButtonBackgroundColor);
        }

        await this.LoadEvents();

        this.setState({...this.state,
            useReadMore: useReadMore,
            hideVenueAndAddress: hideVenueAndAddress,
            hideAgeRestrictions: hideAgeRestrictions,
            hideDescription: hideDescription,
            customWidth: customWidth,
            width: width,
            widthUnits: widthUnits,
            customBackgroundColor: customBackgroundColor,
            backgroundColor: backgroundColor,
            customEventNameTextColor: customEventNameTextColor,
            eventNameTextColor: eventNameTextColor,
            customOtherTextColor: customOtherTextColor,
            otherTextColor: otherTextColor,
            customFontFamily: customFontFamily,
            fontFamily: fontFamily,
            customFontScale: customFontScale,
            fontScale: fontScale,
            customSpacing: customSpacing,
            spacingValue: spacingValue,
            spacingUnits: spacingUnits,
            customSpacingBackground: customSpacingBackground,
            spacingBackground: spacingBackground,
            customReadMoreColor: customReadMoreColor,
            readMoreColor: readMoreColor, 
            customReadMoreBackgroundColor: customReadMoreBackgroundColor,
            readMoreBackgroundColor: readMoreBackgroundColor,
            customTicketsButtonColor: customTicketsButtonColor,
            ticketsButtonColor: ticketsButtonColor,
            customTicketsButtonBackgroundColor: customTicketsButtonBackgroundColor,
            ticketsButtonBackgroundColor: ticketsButtonBackgroundColor
        });
    }

    LoadEvents = async () => {
        this.props.loadingOn();

        var events = [];

        var serverError = "";

        if(this.props.eventIds.length > 0){
            var response = await getEventPublicDetails(this.props.eventIds);

            if(response != null && response.status == 401){
                this.props.redirectToLogin();
            }
            else if(response != null && response.status == 200)
            {
                if(!response.data.success)
                {
                    serverError = response.data.errorMsg;
                }
                else{
                    events = response.data.events;
                }
            }
            else{
                serverError = "An unknown error occured. Please try again later";
            }
        }

        this.setState({...this.state,
            events: events,
            serverError: serverError
        });
        this.props.loadingOff();
    }

    // ColorToHex = (color)=>{
    //     var colorRegex = /rgba\((\d+),\s(\d+),\s(\d+),\s(\d+)\)/;
    //     var match = color.match(colorRegex);
    //     if (match != null){
    //         var r = parseInt(match[1]);
    //         var g = parseInt(match[2]);
    //         var b = parseInt(match[3]);
    //         return `${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    //     }
    // }

    OnCopyCodeClick = () => {
        var result = this.GenerateHtml(false);
        navigator.clipboard.writeText(result.htmlCode);
    }

    ImportWidgetClick = () => {
        this.props.importWidget(
            this.state.events,
            this.props.eventIds,
            this.state.useReadMore,
            this.state.hideVenueAndAddress,
            this.state.hideAgeRestrictions,
            this.state.hideDescription,
            this.state.customWidth && this.state.width != "" ? this.state.width : "",
            this.state.customWidth && this.state.widthUnits != "" ? this.state.widthUnits : "",
            this.state.customFontScale ? this.state.fontScale: "1.0",
            this.state.customFontFamily && this.state.fontFamily != "" ? this.state.fontFamily : "",
            this.state.customBackgroundColor && this.state.backgroundColor != '' ?  this.state.backgroundColor.hex : "",
            this.state.customSpacingBackground && this.state.spacingBackground != '' ? this.state.spacingBackground.hex : "ededed",
            this.state.customEventNameTextColor && this.state.eventNameTextColor != '' ? this.state.eventNameTextColor.hex : "",
            this.state.customOtherTextColor && this.state.otherTextColor != '' ? this.state.otherTextColor.hex : "",
            this.state.customReadMoreColor && this.state.readMoreColor != '' ? this.state.readMoreColor.hex : "",
            this.state.customReadMoreBackgroundColor && this.state.readMoreBackgroundColor != '' ?  this.state.readMoreBackgroundColor.hex : "",
            this.state.customTicketsButtonColor && this.state.ticketsButtonColor != '' ? this.state.ticketsButtonColor.hex : "",
            this.state.customTicketsButtonBackgroundColor && this.state.ticketsButtonBackgroundColor != '' ? this.state.ticketsButtonBackgroundColor.hex : "",
            this.state.customSpacing && this.state.spacingUnits != '' && this.state.spacingValue ? this.state.spacingUnits : "",
            this.state.customSpacing && this.state.spacingUnits != '' && this.state.spacingValue ? this.state.spacingValue : ""
        );
    }

    OnChangeUseReadMore = () => {
        this.setState({ ...this.state, useReadMore: !this.state.useReadMore });
    }

    OnChangeHideVenueAndAddress = () => {
        this.setState({ ...this.state, hideVenueAndAddress: !this.state.hideVenueAndAddress });
    }

    OnChangeHideAgeRestrictions = () => {
        this.setState({ ...this.state, hideAgeRestrictions: !this.state.hideAgeRestrictions });
    }

    OnChangeHideDescription = () => {
        this.setState({ ...this.state, hideDescription: !this.state.hideDescription });
    }

    HandleChangeCustomBackgroundColor = () => {
        this.setState({ ...this.state, customBackgroundColor: !this.state.customBackgroundColor });
    }

    HandleChangeBackgroundColor = (e) => {
        this.setState({ ...this.state, backgroundColor: e });
    }

    HandleChangeCustomSpacingBackground = () => {
        this.setState({ ...this.state, customSpacingBackground: !this.state.customSpacingBackground });
    }

    HandleChangeSpacingBackground = (e) => {
        this.setState({ ...this.state, spacingBackground: e });
    }
    HandleChangeCustomEventNameTextColor = () => {
        this.setState({ ...this.state, customEventNameTextColor: !this.state.customEventNameTextColor });
    }

    HandleChangeEventNameTextColor = (e) => {
        this.setState({ ...this.state, eventNameTextColor: e });
    }
    
    HandleChangeCustomOtherTextColor = () => {
        this.setState({ ...this.state, customOtherTextColor: !this.state.customOtherTextColor });
    }

    HandleChangeOtherTextColor = (e) => {
        this.setState({ ...this.state, otherTextColor: e });
    }

    HandleChangeCustomSpacing = () => {
        this.setState({ ...this.state, customSpacing: !this.state.customSpacing });
    }

    HandleSpacingValueChange = (e) =>{
        this.setState({ ...this.state, spacingValue: e.target.value });
    }

    HandleChangeSpacingUnits = (e) =>{
        this.setState({ ...this.state, spacingUnits: e.target.value });
    }

    HandleChangeCustomWidth = () => {
        this.setState({ ...this.state, customWidth: !this.state.customWidth });
    }

    HandleWidthChange = (e) =>{
        this.setState({ ...this.state, width: e.target.value });
    }

    HandleChangeWidthUnits = (e) =>{
        this.setState({ ...this.state, widthUnits: e.target.value });
    }

    HandleChangeFontFamily = (e) =>{
        this.setState({ ...this.state, fontFamily: e.target.value });
    }

    HandleChangeCustomFontFamily = () => {
        this.setState({ ...this.state, customFontFamily: !this.state.customFontFamily });
    }

    HandleChangeCustomFontScale = () => {
        this.setState({ ...this.state, customFontScale: !this.state.customFontScale });
    }

    HandleChangeFontScale = (e) =>{
        this.setState({ ...this.state, fontScale: e.target.value });
    }


    HandleChangeReadMoreColor = (e)=>{
        this.setState({ ...this.state, readMoreColor: e });
    }

    HandleChangeCustomReadMoreColor = ()=>{
        this.setState({ ...this.state, customReadMoreColor: !this.state.customReadMoreColor });
    }

    HandleChangeReadMoreBackgroundColor = (e)=>{
        this.setState({ ...this.state, readMoreBackgroundColor: e });
    }

    HandleChangeCustomReadMoreBackgroundColor = ()=>{
        this.setState({ ...this.state, customReadMoreBackgroundColor: !this.state.customReadMoreBackgroundColor });
    }

    HandleChangeTicketsButtonColor = (e)=>{
        this.setState({ ...this.state, ticketsButtonColor: e });
    }

    HandleChangeCustomTicketsButtonColor = () => {
        this.setState({ ...this.state, customTicketsButtonColor: !this.state.customTicketsButtonColor });
    }

    HandleChangeTicketsButtonBackgroundColor = (e)=>{
        this.setState({ ...this.state, ticketsButtonBackgroundColor: e });
    }

    HandleChangeCustomTicketsButtonBackgroundColor = () => {
        this.setState({ ...this.state, customTicketsButtonBackgroundColor: !this.state.customTicketsButtonBackgroundColor });
    }

    OnChangePlatformTypeChange = (event) => {
        this.setState({...this.state, platformType: event.target.value})
    }

    render() {
        const gradientSettings = {
            opacity: false,
          };
        const fontNames = [
              {name: "Arial", value: "Arial"}, 
              {name: "Verdana", value: "Verdana"}, 
              {name: "Helvetica", value: "Helvetica"}, 
              {name: "Tahoma", value: "Tahoma"}, 
              {name: "Trebuchet MS", value: "Trebuchet MS"}, 
              {name: "Times New Roman", value: "Times New Roman"}, 
              {name: "Georgia", value: "Georgia"}, 
              {name: "Garamond", value: "Garamond"}, 
              {name: "Courier New", value: "Courier New"}, 
              {name: "Brush Script MT", value: "Brush Script MT"}, 
        ];
        const fontScales = [
            {name: "0.5x", value: "0.5"}, 
            {name: "0.75x", value: "0.75"}, 
            {name: "1.0x", value: "1.0"}, 
            {name: "1.25x", value: "1.25"}, 
            {name: "1.5x", value: "1.5"}, 
        ];

        const spacingUnits = [
            {name: "px", value: "px"},
            {name: "em", value: "em"},
            {name: "%", value: "%"},
        ];

        var eventPublicDetailsBodyStyles = {
            background: this.state.customSpacingBackground && this.state.spacingBackground != '' ? "#" + this.state.spacingBackground.hex : "#ededed",
            width: this.state.customWidth && this.state.width != "" ? this.state.width + this.state.widthUnits : "100%"
        }

        return (
            <div>
                <Dialog
                    onClose={this.props.closeModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="embedHtmlDialog"
                    fullWidth
                    disableBackdropClick={true}
                    open={true}
                >
                    <DialogTitle disableTypography className='dialog-title-warning'>
                        <Typography variant="h6">Widget</Typography>
                        <IconButton aria-label="close"
                            className='close-button'
                            onClick={this.props.closeModal}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                    {(this.props.eventIds == null || this.props.eventIds.length == 0) ? <div style={{color: "red", paddingBottom: "10px"}}>
                        No events selected. Please select at least one event from the "Events Widget" column.
                    </div>:
                     <Button className="btn-primary" onClick={this.ImportWidgetClick} title="Copy Code">Import Events</Button>
                    }

                    {this.state.serverError != "" && this.state.serverError != null && <div style={{color: "red"}}>
                        {this.state.serverError}
                    </div>}
                    <div style={{paddingTop: "20px"}}>
                        <div style={eventPublicDetailsBodyStyles} className="event-public-details-container" >
                            {this.state.events.map((e, i) => (
                            <EventPublicDetails 
                                event={e}
                                editorMode={true}
                                useReadMore={this.state.useReadMore}
                                hideVenueAndAddress={this.state.hideVenueAndAddress}
                                hideAgeRestrictions={this.state.hideAgeRestrictions}
                                hideDescription={this.state.hideDescription}
                                fontScale={this.state.customFontScale ? this.state.fontScale: "1.0"}
                                fontFamily={this.state.customFontFamily && this.state.fontFamily != "" ? this.state.fontFamily : ""}
                                backgroundColor={this.state.customBackgroundColor && this.state.backgroundColor != '' ?  this.state.backgroundColor.hex : ""}
                                spacingBackground={this.state.customSpacingBackground && this.state.spacingBackground != '' ? this.state.spacingBackground.hex : ""}
                                eventNameTextColor={this.state.customEventNameTextColor && this.state.eventNameTextColor != '' ? this.state.eventNameTextColor.hex : ""}
                                otherTextColor={this.state.customOtherTextColor && this.state.otherTextColor != '' ? this.state.otherTextColor.hex : ""}
                                readMoreColor={this.state.customReadMoreColor && this.state.readMoreColor != '' ? this.state.readMoreColor.hex : ""}
                                readMoreBackgroundColor={this.state.customReadMoreBackgroundColor && this.state.readMoreBackgroundColor != '' ?  this.state.readMoreBackgroundColor.hex : ""}
                                ticketsButtonColor={this.state.customTicketsButtonColor && this.state.ticketsButtonColor != '' ? this.state.ticketsButtonColor.hex : ""}
                                ticketsButtonBackgroundColor={this.state.customTicketsButtonBackgroundColor && this.state.ticketsButtonBackgroundColor != '' ? this.state.ticketsButtonBackgroundColor.hex : ""}
                                spacingUnits={this.state.customSpacing && this.state.spacingUnits != '' && this.state.spacingValue ? this.state.spacingUnits : ""}
                                spacing={this.state.customSpacing && this.state.spacingUnits != '' && this.state.spacingValue && (i != this.state.events.length - 1)? this.state.spacingValue : ""}
                            />))
                            }
                        </div>
                    </div>
                    <Grid container spacing={0}>
                        <Grid item sm={4}>
                            <div>
                                <Checkbox checked={this.state.useReadMore} 
                                    onChange={this.OnChangeUseReadMore} />
                                
                                <FormLabel>&nbsp;Use Read More Button</FormLabel>
                            </div>
                        </Grid>
                        <Grid item sm={4}>
                            <div>
                            <Checkbox checked={this.state.hideVenueAndAddress}
                                    onChange={this.OnChangeHideVenueAndAddress} />
                                
                                <FormLabel>&nbsp;Hide Venue and Address</FormLabel>
                            </div>
                        </Grid>
                        <Grid item sm={4}>
                            <div>
                                <Checkbox checked={this.state.hideAgeRestrictions}
                                    onChange={this.OnChangeHideAgeRestrictions} />
                                
                                <FormLabel>&nbsp;Hide Age Restrictions</FormLabel>
                            </div>
                        </Grid>
                        <Grid item sm={4}>
                            <div>
                            <Checkbox checked={this.state.hideDescription}
                                    onChange={() => this.OnChangeHideDescription()} />
                                
                                <FormLabel>&nbsp;Hide Description</FormLabel>
                            </div>
                        </Grid>
                    </Grid>
                    <FormLabel style={{display: "block"}}>Custom Styles</FormLabel>
                    <Grid container spacing={0}>
                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customBackgroundColor}
                                        onChange={this.HandleChangeCustomBackgroundColor} />
                                    {this.state.customBackgroundColor &&
                                        <span className='color-picker-container'>
                                            <ColorPicker 
                                                onChange={this.HandleChangeBackgroundColor}
                                                value={this.state.backgroundColor}
                                                hideTextfield
                                                disableAlpha={true}
                                            />
                                        </span>
                                    }
                                    {!this.state.customBackgroundColor &&
                                        <span className='color-picker-disabled-button'></span>
                                    }
                                    <FormLabel>&nbsp;Background color</FormLabel>
                                </div>
                            </Grid>

                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customOtherTextColor}
                                        onChange={this.HandleChangeCustomOtherTextColor} />
                                    {this.state.customOtherTextColor &&
                                        <span className='color-picker-container'>
                                            <ColorPicker onChange={this.HandleChangeOtherTextColor}
                                                value={this.state.otherTextColor}
                                                hideTextfield
                                                disableAlpha={true}
                                            />
                                        </span>
                                    }
                                    {!this.state.customOtherTextColor &&
                                        <span className='color-picker-disabled-button'></span>
                                    }
                                    <FormLabel>&nbsp;Default text color</FormLabel>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customEventNameTextColor}
                                        onChange={this.HandleChangeCustomEventNameTextColor} />
                                    {this.state.customEventNameTextColor &&
                                        <span className='color-picker-container'>
                                            <ColorPicker onChange={this.HandleChangeEventNameTextColor}
                                                value={this.state.eventNameTextColor}
                                                hideTextfield
                                                disableAlpha={true}
                                            />
                                        </span>
                                    }
                                    {!this.state.customEventNameTextColor &&
                                        <span className='color-picker-disabled-button'></span>
                                    }
                                    <FormLabel>&nbsp;Event name text color</FormLabel>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customSpacing}
                                        onChange={this.HandleChangeCustomSpacing} />
                                    <TextField
                                        disabled={!this.state.customSpacing}
                                        value={this.state.spacingValue}
                                        onChange={this.HandleSpacingValueChange}
                                        style={{ width: "58px" }}
                                    />
                                    <Select
                                        value={this.state.spacingUnits}
                                        disabled={!this.state.customSpacing}
                                        onChange={(e) => this.HandleChangeSpacingUnits(e)}>
                                        {
                                            spacingUnits.map((data) => (
                                                <MenuItem value={data.value}>{data.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormLabel>&nbsp;Spacing units</FormLabel>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customSpacingBackground}
                                        onChange={this.HandleChangeCustomSpacingBackground} />
                                    {this.state.customSpacingBackground &&
                                        <span className='color-picker-container'>
                                            <ColorPicker onChange={this.HandleChangeSpacingBackground}
                                                value={this.state.spacingBackground}
                                                hideTextfield
                                                disableAlpha={true}
                                            />
                                        </span>
                                    }
                                    {!this.state.customSpacingBackground &&
                                        <span className='color-picker-disabled-button'></span>
                                    }
                                    <FormLabel>&nbsp;Spacing background color</FormLabel>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customFontFamily}
                                        onChange={this.HandleChangeCustomFontFamily} />

                                    <Select
                                        value={this.state.fontFamily}
                                        disabled={!this.state.customFontFamily}
                                        onChange={(e) => this.HandleChangeFontFamily(e)}
                                    >
                                        {
                                            fontNames.map((data) => (
                                                <MenuItem value={data.value}>{data.name}</MenuItem>
                                            ))
                                        }
                                    </Select>

                                    <FormLabel>&nbsp;Font family</FormLabel>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customFontScale}
                                        onChange={this.HandleChangeCustomFontScale} />
                                    <Select
                                        value={this.state.fontScale}
                                        disabled={!this.state.customFontScale}
                                        onChange={(e) => this.HandleChangeFontScale(e)}>
                                        {
                                            fontScales.map((data) => (
                                                <MenuItem value={data.value}>{data.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormLabel>&nbsp;Font scale</FormLabel>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customReadMoreColor}
                                        onChange={this.HandleChangeCustomReadMoreColor} />
                                    {this.state.customReadMoreColor &&
                                        <span className='color-picker-container'>
                                            <ColorPicker onChange={this.HandleChangeReadMoreColor}
                                                value={this.state.readMoreColor}
                                                hideTextfield
                                                disableAlpha={true}
                                            />
                                        </span>
                                    }
                                    {!this.state.customReadMoreColor &&
                                        <span className='color-picker-disabled-button'></span>
                                    }
                                    <FormLabel>&nbsp;Read More Button text color</FormLabel>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customReadMoreBackgroundColor}
                                        onChange={this.HandleChangeCustomReadMoreBackgroundColor} />
                                    {this.state.customReadMoreBackgroundColor &&
                                        <span className='color-picker-container'>
                                            <ColorPicker onChange={this.HandleChangeReadMoreBackgroundColor}
                                                value={this.state.readMoreBackgroundColor}
                                                hideTextfield
                                                disableAlpha={true}
                                            />
                                        </span>
                                    }
                                    {!this.state.customReadMoreBackgroundColor &&
                                        <span className='color-picker-disabled-button'></span>
                                    }
                                    <FormLabel>&nbsp;Read More Button Background color</FormLabel>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customTicketsButtonColor}
                                        onChange={this.HandleChangeCustomTicketsButtonColor} />
                                    {this.state.customTicketsButtonColor &&
                                        <span className='color-picker-container'>
                                            <ColorPicker onChange={this.HandleChangeTicketsButtonColor}
                                                value={this.state.ticketsButtonColor}
                                                hideTextfield
                                                disableAlpha={true}
                                            />
                                        </span>
                                    }
                                    {!this.state.customTicketsButtonColor &&
                                        <span className='color-picker-disabled-button'></span>
                                    }
                                    <FormLabel>&nbsp;"View In NRBY App" Button Text Color</FormLabel>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customTicketsButtonBackgroundColor}
                                        onChange={this.HandleChangeCustomTicketsButtonBackgroundColor} />
                                    {this.state.customTicketsButtonBackgroundColor &&
                                        <span className='color-picker-container'>
                                            <ColorPicker onChange={this.HandleChangeTicketsButtonBackgroundColor}
                                                value={this.state.ticketsButtonBackgroundColor}
                                                hideTextfield
                                                disableAlpha={true}
                                            />
                                        </span>
                                    }
                                    {!this.state.customTicketsButtonBackgroundColor &&
                                        <span className='color-picker-disabled-button'></span>
                                    }
                                    <FormLabel>&nbsp;"View In NRBY App" Button Background color</FormLabel>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div>
                                    <Checkbox checked={this.state.customWidth}
                                        onChange={this.HandleChangeCustomWidth} />
                                    <TextField
                                        disabled={!this.state.customWidth}
                                        value={this.state.width}
                                        onChange={this.HandleWidthChange}
                                        style={{ width: "58px" }}
                                    />
                                    <Select
                                        value={this.state.widthUnits}
                                        disabled={!this.state.customWidth}
                                        onChange={(e) => this.HandleChangeWidthUnits(e)}>
                                        {
                                            spacingUnits.map((data) => (
                                                <MenuItem value={data.value}>{data.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormLabel>&nbsp;Width units</FormLabel>
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContent>                 
                    
                    <DialogActions disableSpacing={true} >
                        <Button onClick={this.props.closeModal} className="btn-default">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}