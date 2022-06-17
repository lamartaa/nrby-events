import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoginPage } from './LoginPage';
import { AllEventsPage } from './AllEventsPage';
import { EventPublicDetails } from './EventPublicDetails';
import { getEventPublicDetails } from '../data/WidgetRepository';
import { Button } from '@material-ui/core';

export class NrbyBlockContainer extends React.Component {

    state = {
        showAllEvents: false,
        loading: false
    }

    SetLoggedIn = () => {
        this.setState({...this.state});
    }

    LoadingOn = () => {
        this.setState({...this.state, loading: true});
    }

    LoadingOff = () => {
        this.setState({...this.state, loading: false});
    }

    RedirectToLogin = () => {
        localStorage.removeItem("nrby-access-token");
    }

    ImportWidgetClick = async (
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
        this.props.importWidget(
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
        );
    }

    ToggleShowAllEvents = () => {
        this.setState({...this.state, showAllEvents: !this.state.showAllEvents})
    }

    render() {

        var eventPublicDetailsBodyStyles = {
            background: this.props.spacingBackground != '' ? "#" + this.props.spacingBackground : "#ededed",
            width: this.props.width != "" ? this.props.width + this.props.widthUnits : "100%",
            marginBottom: "20px"
        }

        var token = localStorage.getItem("nrby-access-token");

        var loggedIn = false;

        if(token != null && token != ""){
            loggedIn = true;
        }
        return (
            <div style={{width: "100%"}}>
                <Backdrop style={{color: '#fff', zIndex: 10000}} open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                {this.props.events != null && this.props.events.length > 0 ? 
                <div>
                    <div>
						If you change any event details in the portal be sure to export your event again to make sure it updates (this text is only visible in the editor).
					</div>
                    <div className="nrby-center-first-child">
                        <div style={eventPublicDetailsBodyStyles} className="event-public-details-container" >
                            {this.props.events.map((e, i) => (
                            <EventPublicDetails 
                                event={e}
                                editorMode={true}
                                useReadMore={this.props.useReadMore}
                                hideVenueAndAddress={this.props.hideVenueAndAddress}
                                hideAgeRestrictions={this.props.hideAgeRestrictions}
                                hideDescription={this.props.hideDescription}
                                fontScale={this.props.fontScale}
                                fontFamily={this.props.fontFamily}
                                backgroundColor={this.props.backgroundColor}
                                spacingBackground={this.props.spacingBackground}
                                eventNameTextColor={this.props.eventNameTextColor}
                                otherTextColor={this.props.otherTextColor}
                                readMoreColor={this.props.readMoreColor}
                                readMoreBackgroundColor={this.props.readMoreBackgroundColor}
                                ticketsButtonColor={this.props.ticketsButtonColor}
                                ticketsButtonBackgroundColor={this.props.ticketsButtonBackgroundColor}
                                spacingUnits={this.props.spacingUnits}
                                spacing={this.props.spacingUnits != '' && this.props.spacing && (i != this.state.events.length - 1)? this.props.spacing : ""}
                            />))
                            }
                        </div>
                    </div>
                </div>
                :
				<p >
					<div>
						Please import embedded event from table below. Note that this text and the table below will not get published as part of your website.
					</div>
				</p>}
				
				{!loggedIn && <LoginPage loadingOn={this.LoadingOn} loadingOff={this.LoadingOff} setLoggedIn={this.SetLoggedIn} />}
                {loggedIn && <Button variant="contained" onClick={this.ToggleShowAllEvents} style={{marginBottom: "20px"}}>
                            {this.state.showAllEvents ? "Hide Events Table"  : "Show Events Table"}
                        </Button>}
				{loggedIn && this.state.showAllEvents && <AllEventsPage 
					loadingOn={this.LoadingOn} 
					loadingOff={this.LoadingOff} 
					redirectToLogin={this.RedirectToLogin}
                    importWidget={this.ImportWidgetClick}
                    selectedEventIds={this.props.eventIds}
                    useReadMore={this.props.useReadMore}
                    hideVenueAndAddress={this.props.hideVenueAndAddress}
                    hideAgeRestrictions={this.props.hideAgeRestrictions}
                    hideDescription={this.props.hideDescription}
                    width={this.props.width}
                    widthUnits={this.props.widthUnits}
                    fontScale={this.props.fontScale}
                    fontFamily={this.props.fontFamily}
                    backgroundColor={this.props.backgroundColor}
                    spacingBackground={this.props.spacingBackground}
                    eventNameTextColor={this.props.eventNameTextColor}
                    otherTextColor={this.props.otherTextColor}
                    readMoreColor={this.props.readMoreColor}
                    readMoreBackgroundColor={this.props.readMoreBackgroundColor}
                    ticketsButtonColor={this.props.ticketsButtonColor}
                    ticketsButtonBackgroundColor={this.props.ticketsButtonBackgroundColor}
                    spacingUnits={this.props.spacingUnits}
                    spacing={this.props.spacing}
                    />}
            </div>
        );
    }
}