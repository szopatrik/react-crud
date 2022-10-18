import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    navlink:{
        color: 'white',
        textDecoration: 'none'
    },
}));


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        float: 'right',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));

interface usersProps {
    basePath: string,
    setSearchInput: any
}

const Navbar = (props:usersProps) => {
    const classes = useStyles();

        return (
            <div className={classes.root}>
                <AppBar position="static" >
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Link className={classes.navlink} to={props.basePath}>
                            <Typography variant="h6" className={classes.title}>
                                Company s.r.o.
                            </Typography>
                        </Link>
                        <Search style={{marginLeft: 30}}>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Vyhledat uživatele…"
                                inputProps ={{'aria-label': 'search'}}
                                autoFocus={true}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setSearchInput(event.target.value as string)}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </div>
        );
}

export default Navbar;