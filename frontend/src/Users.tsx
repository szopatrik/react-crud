import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import TablePagination from '@mui/material/TablePagination';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import moment from "moment";
import { CircularProgress } from '@mui/material';


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
    container: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        color: '#3f51b5',//ok
    },

}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: grey[200], // https://mui.com/customization/color/
        fontWeight: "bold"
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: grey[50],
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    "&:hover": {
        backgroundColor: "#e8eaf6 !important"
    }
}));

interface usersProps {
    basePath: string,
    searchInput: string
}

export default function UserList(props:usersProps){
    const classes = useStyles();
    const basePath = props.basePath;
    const searchInput = props.searchInput;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [users, setUsers] = useState<any[]>([])
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [chosenFilter, setChosenFilter] = React.useState('Všichni uživatelé')
    const [loading, setLoading] = React.useState(false)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        UsersGet()
    }, [])

    const UsersGet = () => {
        setLoading(true);
        fetch(`${basePath}api/v1/get-users`)
            .then(res => res.json())
            .then(
                (result) => {
                    setUsers(result)
                    setLoading(false)
                }
            )
    }


    const UpdateUser = (id:string) => {
        window.location.href = `${basePath}update/`+id
    }

    const ArchiveUser = (id:number, name: string, surname: string) => {
        const confirmed = window.confirm(`Opravdu chcete smazat uživatele ${name} ${surname}?`);
        if (!confirmed) {
            return;
        }
        var data = {
            'id': id
        }
        fetch(`${basePath}api/v1/archive-user/`+id, {
            method: 'PUT',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(()=>UsersGet())
            // .then(res => res.json())
            // .then(
            //     (result) => {
            //         alert(result['message'])
            //         if (result['status'] === 'ok') {
            //             UsersGet();
            //         }
            //     }
            // )
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | any,
        newPage: number,) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const recordsAfterPaging = (users: any) => {
        //sort descending by time (from last change)
        //TODO: if user  < 2ks tak nesortovat, protoze pak to neni fce
        const sortedUsers = users.sort(function (a:any, b:any) {
             return b.lastChange._seconds - a.lastChange._seconds;
         });
       return sortedUsers.slice(page*rowsPerPage,(page+1)*rowsPerPage)
    }

    const filterUsersByStatus = () => {
        return (
            users.filter(user => {
                if (chosenFilter === 'Všichni uživatelé') {
                    return user;
                } else if (user.status == chosenFilter) {
                    return user;
                }}
            ))
            }

    const filterUsers = () => {
        return (
            users.filter(user => {
                if (searchInput === '') {
                    return user;
                } else if(user.surname != undefined && user.surname.toLowerCase().includes(searchInput.toLowerCase())) {
                    return user;
                } else if(user.name != undefined && user.name.toLowerCase().includes(searchInput.toLowerCase())) {
                    return user;
                } else if(user.email != undefined && user.email.toLowerCase().includes(searchInput.toLowerCase())) {
                    return user;
                } return false;
            })
        )
    }



    const usersToDisplay = () => {
        if (!searchInput) {
            return recordsAfterPaging(filterUsersByStatus())
        }
        else {
            return recordsAfterPaging(filterUsers())
        }
    }


    const TableToolbar = ()=> {
        return(
            <Box display="flex">
                <Box flexGrow={1}>
                    <Typography component="h6" variant="h6" gutterBottom display="inline">
                        Seznam klientů
                    </Typography>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                </Box>
                <Box sx={{ minWidth: 200 }}>
                        <Button
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            startIcon={<ArrowDropDownIcon />}
                            style={{textTransform: 'none', color: '#3f51b5'}}
                        >
                            {chosenFilter}
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem  onClick={()=>{handleClose(); setChosenFilter("Všichni uživatelé")}}>Všichni uživatelé</MenuItem>
                            <MenuItem  onClick={()=>{handleClose(); setChosenFilter("Aktivní")}}>Aktivní</MenuItem>
                            <MenuItem  onClick={()=>{handleClose(); setChosenFilter("Čeká na aktivaci")}}>Čeká na aktivaci</MenuItem>
                            <MenuItem  onClick={()=>{handleClose(); setChosenFilter("Pozastaveno")}}>Pozastaveno</MenuItem>
                        </Menu>
                </Box>
                <Box sx={{ minWidth: 200 }}>
                    <Button startIcon={<AddIcon />} variant="text" href={`${basePath}create`} style={{textTransform: 'none', color: '#3f51b5'}}> Přidat uživatele</Button>
                </Box>
            </Box>
        )

    }

    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="lg">
                <Paper className={classes.paper}>
                    {TableToolbar()}
                    <TableContainer>
                        {loading ? <Box sx={{ display: 'flex' }}>
                                    <CircularProgress color="inherit" style={{marginLeft: '50%'}} />
                                  </Box> :
                        <Table size="small" stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Příjmení</StyledTableCell>
                                    <StyledTableCell align="left">Jméno</StyledTableCell>
                                    <StyledTableCell align="left">Email</StyledTableCell>
                                    <StyledTableCell align="left">Telefon</StyledTableCell>
                                    <StyledTableCell align="left">Variabilní symbol</StyledTableCell>
                                    <StyledTableCell align="left">Status</StyledTableCell>
                                    <StyledTableCell align="left">Jazyk</StyledTableCell>
                                    <StyledTableCell align="left">Poznámka</StyledTableCell>
                                    <StyledTableCell align="left">Upraveno</StyledTableCell>
                                    <StyledTableCell align="center">Akce</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usersToDisplay().map((user:any) => (
                                    <StyledTableRow key={user.id}>
                                        <TableCell align="left">{user.surname}</TableCell>
                                        <TableCell align="left">{user.name}</TableCell>
                                        <TableCell align="left">{user.email}</TableCell>
                                        <TableCell align="left">{user.phone}</TableCell>
                                        <TableCell align="left">{user.varSymbol}</TableCell>
                                        <TableCell align="left">{user.status}</TableCell>
                                        <TableCell align="left">{user.language}</TableCell>
                                        <TableCell align="left">{user.note}</TableCell>
                                        <TableCell align="left">{moment(new Date(user.lastChange._seconds*1000)).format('DD.MM.YYYY HH:mm:ss')}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup aria-label="outlined primary button group">
                                                <Tooltip title="Upravit uživatele">
                                                    <IconButton aria-label="edit" onClick={() => UpdateUser(user.id)} style={{color: '#3f51b5'}} >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Archivovat uživatele">
                                                    <IconButton aria-label="delete" onClick={() => ArchiveUser(user.id, user.name, user.surname)} style={{color: '#3f51b5'}}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </ButtonGroup>
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>}
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={"Řádků na stránce"}
                    />
                </Paper>
            </Container>
        </div>

    );
}

