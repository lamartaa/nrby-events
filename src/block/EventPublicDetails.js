import * as React from 'react';

export class EventPublicDetails extends React.Component {

    state = {
        buyTicketsUrl: '',
        eventDeepLinkUrl: '',
        readMoreDetailsVisible: false
    }

    componentDidMount() {
        var buyTicketsUrl = "https://portal.nrby.io/event/tickets?eventId={id}";//"http://localhost:3001/event/tickets?eventId={id}";
        var eventDeepLinkUrl = "https://nrby.io/deeplink/event/{id}";//"https://dev.nrby.io/deeplink/event/{id}";

        if(buyTicketsUrl == undefined)
            buyTicketsUrl = "";

        if(eventDeepLinkUrl == undefined)
            eventDeepLinkUrl = "";

        this.setState({...this.state, buyTicketsUrl: buyTicketsUrl, eventDeepLinkUrl: eventDeepLinkUrl});
    }

    ToggleReadMore = () => {
        this.setState({...this.state, readMoreDetailsVisible: !this.state.readMoreDetailsVisible});
    }

    FormateDate = (dateString) => {
        var date = new Date(dateString);
        
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    }

    FormatTime = (dateString) => {
        var date = new Date(dateString);
        
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    render() {
        var nameFontSize = (parseFloat(this.props.fontScale) * 26).toString() + "px";
        var fontSize = (parseFloat(this.props.fontScale) * 18).toString() + "px";

        var eventPublicDetailsContainerStyles = {
            fontSize: fontSize,
            marginBottom: this.props.spacing != "" ? this.props.spacing + this.props.spacingUnits :  "0px",
            background: this.props.backgroundColor != "" ? "#" + this.props.backgroundColor : "",
            color: this.props.otherTextColor != "" ? "#" + this.props.otherTextColor : "",
            fontFamily: this.props.fontFamily != "" ? this.props.fontFamily : ""
        };

        var eventMainImageContainerStyles = {
            width: this.props.event.eventImageUrl != null && this.props.event.eventImageUrl != "" ? (this.props.fontScale < 1 ? (parseFloat(this.props.fontScale) * 300).toString() + "px" : "300px") : "0px"
        };

        var eventPublicDetailsNameStyles = {
            color: this.props.eventNameTextColor != "" ? "#" + this.props.eventNameTextColor : "",
            fontSize: nameFontSize,
            wordBreak: "break-word"
        };

        var readMoreLinkStyles =  {
            color:  this.props.readMoreColor != "" ?  "#"  + this.props.readMoreColor : "", 
            background: this.props.readMoreBackgroundColor != "" ? "#" + this.props.readMoreBackgroundColor : ""
        };

        var eventMobileTicketsContainerLinkStyles = {
            color: this.props.ticketsButtonColor != "" ? "#" + this.props.ticketsButtonColor: "",
            background: this.props.ticketsButtonBackgroundColor != "" ? "#" + this.props.ticketsButtonBackgroundColor : ""
        }

        return (
            <div class="eventPublicDetailsContainer" style={eventPublicDetailsContainerStyles}>
                <div class="eventBasicInfoContainer clearfix">
                    <div class="eventMainImageContainer" style={eventMainImageContainerStyles}>
                        <img src={this.props.event.eventImageUrl} class="eventMainImage" style={eventMainImageContainerStyles} />
                    </div>
                    <div class="eventBasicInfo" style={this.props.event.eventImageUrl != null && this.props.event.eventImageUrl != "" ? {} : {paddingLeft: "0%"}}>
                        <div class={this.props.event.canPurchaseTickets ? "eventStatusContainer eventStatusCellHidden" : "eventStatusContainer eventStatusCell"}>
                            {this.props.event.soldOut ? <div class="eventStatus">Sold Out</div> : <div class="eventStatus">Sales Ended</div>}
                        </div>
                        <div class="eventPublicDetailsName" style={eventPublicDetailsNameStyles}>
                            {this.props.event.name}

                            {!this.props.event.canPurchaseTickets && <div>
                                {this.props.event.soldOut ? <span class="eventStatus">(Sold Out)</span> : <span class="eventStatus">(Sales Ended)</span>}
                                </div>
                            }
                        </div>
                        <div style={{paddingBottom: "5px"}}>
                            { this.FormateDate(this.props.event.startDateTimeLocal)} @ {this.FormatTime(this.props.event.startDateTimeLocal) }
                        </div>
                        <div style={{paddingBottom: "5px"}}>
                            { this.props.event.hasFreeAdmissions && <span>Free Admission </span>}
                            { this.props.event.ticketPriceMax != 0 && this.props.event.hasFreeAdmissions == true &&
                                <span> or tickets priced at </span>
                            }
                            { this.props.event.TicketPriceMin != null && <div>
                                { this.props.event.ticketPriceMin == this.props.event.ticketPriceMax ?
                                    <span>${this.props.event.ticketPriceMax.Value.toFixed(2)}</span>
                                    :
                                    <span>
                                        ${this.props.event.ticketPriceMin.Value.toFixed(2)} -
                                        ${this.props.event.ticketPriceMax.Value.toFixed(2)}
                                    </span>
                                }
                                </div>
                            }
                        </div>
                    </div>
                    <div></div>

                </div>
                { this.props.useReadMore &&
                    <div class="read-more-link">
                        <div style={{width: "100%"}}>
                            <a href="#/" 
                            class={ !this.props.editorMode ? "read-more-btn-jscript read-more-btn mdl-button mdl-js-button mdl-button--raised" : "read-more-btn mdl-button mdl-js-button mdl-button--raised"}
                            id={!this.props.editorMode ? "read-more-btn-" + this.props.event.id : ""}
                            onClick={this.props.editorMode ? this.ToggleReadMore : () => {}}
                            style={readMoreLinkStyles}
                            >
                                {!this.state.readMoreDetailsVisible ? <span>Read More...</span> : <span>Read Less...</span>}
                            </a>
                        </div>
                    </div>
                }

                {!this.props.editorMode && <input type="hidden" class="use-read-more-hidden" id={"use-read-more-hidden-" + this.props.event.id} value={this.props.useReadMore.toString()} />}
                <div style={this.props.editorMode && this.props.useReadMore && !this.state.readMoreDetailsVisible ? {display: "none"} :  (this.props.editorMode ? {display: "inline-block"} : {})}  class={!this.props.editorMode ? "read-more-container" : ""} id={!this.props.editorMode ? "read-more-container-" + this.props.event.id : ""} >
                    <div style={{width: "100%"}}
                        ref={(node) => {
                            if (node) {
                              node.style.setProperty("color", "#" + this.props.otherTextColor, "important");
                              node.style.setProperty("fontSize", fontSize, "important");
                            }
                            }}
                        >
                        <table>
                            { !this.props.hideVenueAndAddress && 
                                <tr>
                                    <td class="eventParamName">Venue:</td>
                                    <td class="eventParamValue">{this.props.event.venueName}</td>
                                </tr>
                            }
                            { !this.props.hideVenueAndAddress && 
                                <tr>
                                    <td class="eventParamName">Address: </td>
                                    <td class="eventParamValue">{this.props.event.address}</td>
                                </tr>
                            }
                            { !this.props.hideAgeRestrictions &&
                                <tr>
                                    <td class="eventParamName">Age Limit:</td>
                                    <td class="eventParamValue">{this.props.event.ageRestriction}</td>
                                </tr>
                            }
                        </table>
                        { !this.props.hideDescription &&
                            <div class="eventDescriptionContainer" dangerouslySetInnerHTML={{__html: this.props.event.description}}>
                            </div>
                        }
                    </div>
                </div>
                <div class="eventPurchaseInfo">
                    { this.props.canPurchaseTickets &&
                        <div style={{width: "100%"}}>
                            <div class="eventPurchaseLabel">
                                <i>(An Android or Apple device is required for mobile app purchases)</i>
                            </div>
                        </div>
                    }
                    <div style={{width: "100%"}} class="eventMobileTicketsContainer">
                        <a href={this.state.eventDeepLinkUrl.replace("{id}", this.props.event.id)} class='mdl-button mdl-js-button mdl-button--raised mdl-button--accent btn-view-in-app' target="_blank"
                        rel="noopener"
                            style={eventMobileTicketsContainerLinkStyles}
                        >
                            { this.props.event.canPurchaseTickets ?
                                <span>Mobile App Tickets</span> : <span>View in Nrby App</span>
                            }
                        </a>
                    </div>
                    { this.props.event.canPurchaseTickets &&
                        <div style={{width: "100%"}}>
                            <div class="eventPurchaseLinkContainer">
                                <a href={this.state.buyTicketsUrl.replace("{id}", this.props.event.id)} target="_blank" rel="noopener">
                                    I do not have an Android or Apple mobile device
                                </a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}