import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { getAllEvents } from '../data/EventRepository';
import { GenericErrorModal } from './GenericErrorModal';//
import { GenericSuccessModal } from './GenericSuccessModal';//
import { GenericDisplayCell } from './GenericDisplayCell';
import { GenericDisplayTrueFalseIconCell } from './GenericDisplayTrueFalseIconCell';//
import CodeIcon from '@material-ui/icons/Code';
import { EmbedEventsHtmlModal } from './EmbedEventsHtmlModal';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import linq from "linq";

const getInitGridState = () => {
    let sortState = {
        field: "StartDateTime",
        dir: "desc"
    };

    let descriptorArray = [
        {
            field: "clusterName",
            operator: "eq",
            value: ""
        },
        {
            field: "name",
            operator: "eq",
            value: ""
        },
        {
            field: "venue",
            operator: "eq",
            value: ""
        },
        {
            field: "address",
            operator: "eq",
            value: ""
        },
        {
            field: "published",
            operator: "eq",
            value: null
        },
        {
            field: "startDateTimeLocal",
            operator: "eq",
            value: null
        }
    ];

    let gridFilterDescriptor = {
        logic: "and",
        filters: descriptorArray
    };

    let gridState = {
        skip: 0,
        take: 10,
        sort: [sortState],
        filter: gridFilterDescriptor
    };

    return gridState;
};

const getInitPageable = () => {

    let pageable = {
        buttonCount: 5,
        info: true,
        type: 'numeric',
        pageSizes: true,
        previousNext: true
    };

    return pageable;
};

export class AllEventsPage extends React.Component {

    state = {
        events: [],
        eventsTotal: 0,
        pageable: getInitPageable(),
        gridState: getInitGridState(),
        headCells: [
            {
              id: 'clusterName',
              numeric: false,
              label: 'Event Group',
            },
            {
              id: 'name',
              numeric: false,
              label: 'Name',
            },
            {
              id: 'venue',
              numeric: false,
              label: 'Venue',
            },
            {
              id: 'address',
              numeric: false,
              disablePadding: false,
              label: 'Address',
            },
            {
                id: 'published',
                label: 'Published'
            },
            {
                id: 'startDateTimeLocal',
                label: 'Start Date/Time'
            }
          ],
        serverError: '',
        activeEventId: '',
        deleteEventSuccess: false,
        cancelEventSuccess: false,
        financialsModalOpen: false,
        totalIncome: 0,
        totalFees: 0,
        totalTicketsPurchased: 0,
        payoutDateTime: undefined,
        payoutAttempts: 0,
        payoutSuccessful: false,
        mobileFiltersVisible: false,
        htmlModalVisible: false,
        allHtmlCheckboxChecked: false,
        // selectedState: { 1: true },
    }

    

    async componentDidMount() {
        this.props.loadingOn();

        await this.LoadAllEvents(this.state.gridState);
        
        this.props.loadingOff();
    }

    LoadAllEvents = async (gridState) => {
        this.setState({ ...this.state, gridState: gridState });
        let events = [];
        let eventsTotal = 0;
        let serverError = '';

        var filters = linq.from(gridState.filter.filters).where(f => (f.value != null && f.value != "") || (f.value == false || f.value == true)).toArray();

        let tempGridState = JSON.parse(JSON.stringify(gridState));

        tempGridState.filter.filters = JSON.parse(JSON.stringify(filters));

        var response = await getAllEvents(tempGridState, false);

        if (response != null && response.status == 401) {
            this.props.redirectToLogin();
        }
        else if (response != null && response.status == 200) {
            if (!response.data.success) {
                serverError = response.data.errorMsg;
            }
            else {
                events = response.data.events;
                eventsTotal = response.data.total;
                events.forEach((e) => {
                    e.checked = false;
                });
            }
        }
        else {
            serverError = "An unknown error occured. Please try again later";
        }

        this.setState({ 
            ...this.state, 
            events: events,
            eventsTotal: eventsTotal,
            gridState: gridState,
            serverError: serverError });
    }

    OnSortChange = async (sort) => {
        this.props.loadingOn();
        let gridState = this.state.gridState;

        if(gridState != null && gridState.sort.length > 0){
            gridState.sort[0].dir = gridState.sort[0].field == sort && gridState.sort[0].dir == "desc" ? "asc" : "desc";
            gridState.sort[0].field = sort;

            await this.LoadAllEvents(gridState);
        }
    
        this.props.loadingOff();
    }

    OnFilterChange = async (filter, value) => {
        let gridState = this.state.gridState;

        let descriptor = linq.from(gridState.filter.filters).select((f, index) => ({f, index})).firstOrDefault((fi) => fi.f.field == filter);

        descriptor.f.value = value;
        
        gridState.filter.filters[descriptor.index] = descriptor.f;

        await this.LoadAllEvents(gridState);
    }

    PageChange = async (event, newPage) => {
        this.props.loadingOn();
        let gridState = this.state.gridState;

        gridState.skip = gridState.take * newPage;

        await this.LoadAllEvents(gridState);
        this.props.loadingOff();
    }

    HandleChangeRowsPerPage = async (event) => {
        this.props.loadingOn();

        let gridState = this.state.gridState;

        gridState.skip = 0;
        gridState.take = parseInt(event.target.value, 10);

        await this.LoadAllEvents(gridState);

        this.props.loadingOff();
    };

    CloseErrorModal = () => {
        this.setState({ ...this.state, serverError: "" });
    };

    CloseSuccessModal = () => {
        this.setState({ ...this.state, deleteEventSuccess: false, cancelEventSuccess: false });
    }

    ToggleFilterVisibility = () => {
        this.setState({ ...this.state, mobileFiltersVisible: !this.state.mobileFiltersVisible });
    }

    OnHeaderSelectionChange = ()=>{
        let allHtmlCheckboxChecked = !this.state.allHtmlCheckboxChecked;
        this.state.events.forEach((e)=> {
             if(e.published)
             {
                e.checked = allHtmlCheckboxChecked
             }
             else 
             {
                e.checked = false;
             }
        });
        
        this.setState({ ...this.state, events: this.state.events, allHtmlCheckboxChecked: allHtmlCheckboxChecked });
    }

    OnHtmlSelectionChange = (dataIndex) => {

        let events = this.state.events;
        let event = events[dataIndex];

        event.checked = !event.checked;

        events[dataIndex] = event;

        var allHtmlCheckboxChecked = linq.from(events).any((p) => p.checked == false) == false;

        this.setState({...this.state, events: events, allHtmlCheckboxChecked: allHtmlCheckboxChecked});
    };

    HasSelectedEvent = ()=>{
        return this.state.events.some((event)=>event.checked);
    }

    ShowHtmlModal = () => {
        this.setState({ ...this.state, htmlModalVisible: true });
    }

    CloseHtmlModal = () => {
        this.setState({ ...this.state, htmlModalVisible: false });
    }

    CreateSortHandler = (property) => (event) => {
        onRequestSort(event, property);
      };

    IsSelected = (id) => {
        return linq.from(this.state.events).any((p) => p.id == id && p.checked == true);
    }
    
      HandleClick = (event, id) => {
        let events = this.state.events;
        let result = linq.from(events).select((e, index) => ({e, index})).firstOrDefault((ev) => ev.e.id == id);

        result.e.checked = !result.e.checked;

        events[result.index] = result.e;

        var allHtmlCheckboxChecked = linq.from(events).any((p) => p.checked == false) == false;

        this.setState({...this.state, events: events, allHtmlCheckboxChecked: allHtmlCheckboxChecked})

        this.setState({ ...this.state, events: this.state.events });
      };

      ImportWidgetClick = (
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
        this.setState({ ...this.state, 
            htmlModalVisible: false
             });

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

    render() {

        var selected = linq.from(this.state.events).where((p) => p.checked == true).toArray();
        var currentSort = linq.from(this.state.gridState.sort).firstOrDefault();

        var currentSortName = currentSort != null ? currentSort.field : "StartDateTimeLocal";
        var currentSortDir = currentSort != null ? currentSort.dir : "desc";

        var modalEventIds = linq.from(this.state.events).where((e) => e.checked).select((e) => e.id).toArray();

        return (
            <div style={{ width: "100%" }}>
                <Card style={{ backgroundColor: "#ededed" }}>
                    <CardHeader title="Events" action={
                        <Button variant="contained" className="btn-secondary" size="small" style={{ marginRight: "5px" }} onClick={this.ShowHtmlModal}>
                            <CodeIcon />&nbsp;Events Widget
                        </Button>
                    } />
                    <CardContent>
                        {/* <TableFilterToggleButton expanded={this.state.mobileFiltersVisible} onClick={this.ToggleFilterVisibility} /> */}
                        <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={'medium'}
                                style={{marginLeft: "0.5%", width: "99%"}}
                            >
                                <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox"
                                    style={{border: "0.5px solid rgba(0, 0, 0, 0.3)", borderRadius: "3px"}}
                                    >
                                        Widget
                                    </TableCell>
                                    {this.state.headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        sortDirection={currentSortName === headCell.id ? currentSortDir : false}
                                        style={{border: "0.5px solid rgba(0, 0, 0, 0.3)", borderRadius: "3px"}}
                                    >
                                        <TableSortLabel
                                        active={currentSortName === headCell.id }
                                        direction={currentSortName === headCell.id  ? currentSortDir : null}
                                        hideSortIcon={currentSortName !== headCell.id}
                                        onClick={() => this.OnSortChange(headCell.id)}
                                        style={{width: "100%"}}
                                        >
                                        {headCell.label}
                                        </TableSortLabel>
                                    </TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell padding="checkbox" style={{border: "0.5px solid rgba(0, 0, 0, 0.3)", borderRadius: "3px"}}>
                                        <Checkbox
                                            color="primary"
                                            // indeterminate={selected.length > 0 && selected.length < this.state.events.length}
                                            checked={this.state.allHtmlCheckboxChecked}
                                            onClick={this.OnHeaderSelectionChange}
                                            inputProps={{
                                            'aria-label': 'Events Widget',
                                            }}
                                        />
                                    </TableCell>
                                    {this.state.gridState.filter.filters.map((headCell) => (
                                    <TableCell style={{border: "0.5px solid rgba(0, 0, 0, 0.3)", borderRadius: "3px"}}>
                                        {headCell.field != "published" && headCell.field != "startDateTimeLocal" &&
                                            <TextField
                                            fullWidth
                                            margin="normal"
                                            onChange={(e) => this.OnFilterChange(headCell.field, e.currentTarget.value)}
                                            value={headCell.value}
                                            variant="outlined"
                                            />
                                            } 
                                        {headCell.field == "published" &&
                                            <Select
                                            value={headCell.value}
                                            label="Published"
                                            onChange={(e) => this.OnFilterChange(headCell.field, e.target.value)}
                                          >
                                            <MenuItem value={null}>Both</MenuItem>
                                            <MenuItem value={false}>False</MenuItem>
                                            <MenuItem value={true}>True</MenuItem>
                                          </Select>
                                        }
                                        {/* {headCell.id == "startDateTimeLocal" &&

                                        } */}
                                    </TableCell>
                                    ))}
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.state.events.map((row, index) => {
                                    const isItemSelected = this.IsSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                        hover
                                        onClick={(event) => row.published ? this.HandleClick(event, row.id) : {}}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                        >
                                        <TableCell padding="checkbox">
                                            <Tooltip title={row.published ? "" : "Event needs to be published in order to import"} placement="top-start" arrow>
                                                <div>
                                                <Checkbox
                                                color="primary"
                                                disabled={!row.published}
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                />
                                                </div>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.clusterName}
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.venue}</TableCell>
                                        <TableCell align="right">{row.address}</TableCell>
                                        <TableCell align="right"> <GenericDisplayTrueFalseIconCell title="Published" isTrue={
                                                row.published
                                            } />
                                        </TableCell>
                                        <TableCell>
                                            <GenericDisplayCell title="Start Date/Time" value={row.startEventDateTimeLocal} />
                                        </TableCell>
                                        </TableRow>
                                    );
                                    })}
                                </TableBody>
                            </Table>
                            </TableContainer>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            component="div"
                            count={this.state.eventsTotal}
                            rowsPerPage={this.state.gridState.take}
                            page={this.state.gridState.skip > 0 ? this.state.gridState.skip / this.state.gridState.take : 0}
                            onPageChange={this.PageChange}
                            onRowsPerPageChange={this.HandleChangeRowsPerPage}
                            />
                        </Paper>
                        {/* <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        /> */}
                        </Box>
                    </CardContent>
                </Card>
                <GenericErrorModal hidden={this.state.serverError == ''}
                    message={this.state.serverError}
                    closeModal={this.CloseErrorModal} />
                <GenericSuccessModal
                    hidden={this.state.deleteEventSuccess == false}
                    message="The event was deleted successfully."
                    closeModal={this.CloseSuccessModal}
                />
                <GenericSuccessModal
                    hidden={this.state.cancelEventSuccess == false}
                    message="The event was cancelled successfully."
                    closeModal={this.CloseSuccessModal}
                />
                {this.state.htmlModalVisible && 
                    <EmbedEventsHtmlModal eventIds={modalEventIds} closeModal={this.CloseHtmlModal}
                    loadingOn={this.props.loadingOn}
                    loadingOff={this.props.loadingOff}
                    redirectToLogin={this.props.redirectToLogin}
                    importWidget={this.ImportWidgetClick}
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
        )
    }
}