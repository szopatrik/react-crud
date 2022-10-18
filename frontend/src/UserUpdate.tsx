import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
    }
}));

export default function UserUpdate({basePath}:{basePath: string}) {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [bornDate, setBornDate] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [varSymbol, setVarSymbol] = useState('');
    const [note, setNote] = useState('');
    const [status, setStatus] = React.useState('');
    const [language, setLanguage] = React.useState('');

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const handleLanguageChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string);
    };

    const { id } = useParams();


    useEffect(() => {
        getUserData()
    }, [id]);


    const getUserData = () => {
        fetch(`${basePath}api/v1/get-user/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setName(result[0].name)
                    setSurname(result[0].surname)
                    setBornDate(result[0].bornDate)
                    setStreet(result[0].street)
                    setCity(result[0].city)
                    setPostCode(result[0].postCode)
                    setEmail(result[0].email)
                    setVarSymbol(result[0].varSymbol)
                    setStatus(result[0].status)
                    setPhone(result[0].phone)
                    setNote(result[0].note)
                    setLanguage(result[0].language)
                }
            )
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // if (status=='Aktivní' && varSymbol.length < 1 || language.length < 1 || email.length < 1){
        //     alert('Nejsou vyplněny potřebná pole pro odeslání faktury. Zkontrolujte, zda je vyplněn email, jazyk a variabilní symbol!')
        //     return
        // }
        const data = {
            'name': name,
            'surname': surname,
            'bornDate': bornDate,
            'street': street,
            'city': city,
            'postCode': postCode,
            'email': email,
            'phone': phone,
            'varSymbol': varSymbol,
            'language': language,
            'note': note,
            'status': status
        }
        fetch(`${basePath}api/v1/update-user/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(()=>window.location.href = `${basePath}`)
            // .then(res => res.json())
            // .then(
            //     (result) => {
            //         alert(result['message'])
            //         if (result['status'] === 'ok') {
            //             window.location.href = '/';
            //         }
            //     }
            // )
    }

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" style={{color: '#3f51b5'}}>
                    Uživatel
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="name"
                                name="Jméno"
                                variant="outlined"
                                fullWidth
                                id="firstName"
                                label="Jméno"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="surname"
                                label="Příjmení"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="bornDate"
                                label="Datum narození"
                                value={bornDate}
                                onChange={(e) => setBornDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="street"
                                label="Ulice a č.p."
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="city"
                                label="Město"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="postCode"
                                label="PSČ"
                                value={postCode}
                                onChange={(e) => setPostCode(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="phone"
                                label="Telefon"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="varSymbol"
                                label="Variabilní symbol"
                                value={varSymbol}
                                onChange={(e) => setVarSymbol(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Jazyk</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={language}
                                    label="Language"
                                    onChange={handleLanguageChange}
                                    className={classes.root}
                                >
                                    <MenuItem value={'cz'}>cz</MenuItem>
                                    <MenuItem value={'en'}>en</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                onChange={handleStatusChange}
                                className={classes.root}
                            >
                                <MenuItem value={'Aktivní'}>Aktivní</MenuItem>
                                <MenuItem value={'Čeká na aktivaci'}>Čeká na aktivaci</MenuItem>
                                <MenuItem value={'Pozastaveno'}>Pozastaveno</MenuItem>
                                <MenuItem value={'Zrušeno'}>Zrušeno</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="note"
                                label="Poznámka"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Aktualizovat
                    </Button>
                </form>
            </div>
        </Container>
    );
}
