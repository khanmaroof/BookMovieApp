import React, { useEffect } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import GridListBanner from "../../common/GridListBanner";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import moviesData from "../../common/moviesData";
import genre from "../../common/genre";
import artists from "../../common/artists";


class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = { movies: [], searchTerm: '' };
    }

    componentDidMount() {
        this.setState({ movies: moviesData })
    }

    setSearch(search) {
        this.setState({ searchTerm: search })
    }


    handleSubmit(artistName, genres) {
        // console.log(artistName, genres);

        this.setState({
            movies: moviesData.filter(m => {
                console.log("check", m.artists.find((a) => artistName.includes(a.first_name)));

                return (m.artists.find((a) => artistName.includes(a.first_name)) !== undefined || m.title.toLowerCase().includes(this.state.searchTerm))
            })
        })
        console.log("checking", this.movies);
    }

    render() {

        // console.log(this.state)

        return (
            <div>
                <Header />
                <div className="a">
                    <span>Upcoming Movies</span>
                </div>
                <GridListBanner />
                <div className="flex-container">
                    <div className="left">
                        <Movielistdisplay movies={this.state.movies} />
                    </div>
                    <div className="right">
                        <MovieFilter setSearch={this.setSearch.bind(this)} handleSubmit={this.handleSubmit.bind(this)} movies={this.state.movies} />
                    </div>
                </div>


            </div>
        );
    }
}








// -------------------------------movies list-----------------------------------------------------------
//------------------------------------------------------------------------------------------------------
// -------------------------------movies list-----------------------------------------------------------


const styleForMovies = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 1000,
    },

}));


export function Movielistdisplay({ movies }) {
    const classess = styleForMovies();

    return (
        <div className={classess.root}>
            <GridList cellHeight={350} className={classess.gridList} cols={4}>
                <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>

                </GridListTile>

                {movies.map((tile) => (
                    <GridListTile key={tile.poster_url}>
                        <Link to={`/details/${tile.id}`}><img src={tile.poster_url} alt={tile.title} style={{ cursor: 'pointer' }} /></Link>
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<span>{tile.release_date}</span>}

                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}







// ----------------------filter list apply -----------------------------------------------------------------
// ----------------------filter list apply -----------------------------------------------------------------






const useStyles = makeStyles((theme) => ({
    root: {

        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240,

    },

    title: {
        color: theme.palette.primary.light,
        margin: theme.spacing.unit,

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,

    },

}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export function MovieFilter({ setSearch, handleSubmit, setArtist }) {
    const classes = useStyles();
    const [artistName, setArtistName] = React.useState([]);
    const [genres, setGenres] = React.useState([]);

    const handleChange = (event) => {
        setArtistName(event.target.value);
    };
    // console.log(artistName);

    // search the movies ---------------------------------------------------------------------------------




    return (

        <Card className={classes.root}>
            <label className={classes.title}>FIND MOVIES BY:</label>
            <FormControl className={classes.root}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Movie Name" onChange={(e) => setSearch(e.target.value)} />
                </form>

                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">Genres</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            value={genres}
                            onChange={(e) => setGenres(e.target.value)}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {genre.map((name) => (
                                <MenuItem key={name.name} value={name.name}>
                                    <Checkbox checked={genres.indexOf(name.name) > -1} />
                                    <ListItemText primary={name.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">Artists</InputLabel>
                        <Select
                            // onChange={(e) => e.target.value)}
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            value={artistName}
                            onChange={handleChange}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {artists.map((name) => (
                                <MenuItem key={name.first_name} value={name.first_name}>
                                    <Checkbox checked={artistName.indexOf(name.first_name) > -1} />
                                    <ListItemText primary={name.first_name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="date"
                            label="Release Date Start"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </div>

                <div>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="date"
                            label="Release Date End"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </div>
                <div className={classes.root}>
                    <Button className={classes.formControl} variant="contained" color="primary" onClick={() => handleSubmit(artistName, genres)} >Apply</Button>
                </div>


            </FormControl>


        </Card>

    );
}










export default Home;
