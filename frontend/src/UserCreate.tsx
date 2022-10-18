import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import {User} from "./common";

const useStyles = makeStyles((theme) => ({
    palette: {
        primary: "green"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    select: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "red",
            color: "red"
        }
    },
}));


export default function UserCreate({basePath}:{basePath: string}) {
    const classes = useStyles();

    const [name, setname] = useState('');
    const [surname, setsurname] = useState('');
    const [bornDate, setBornDate] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [varSymbol, setvarSymbol] = useState('');
    const [note, setNote] = useState('');
    const [status, setStatus] = React.useState('');
    const [language, setLanguage] = React.useState('');

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const handleLanguageChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // if (status==='Aktivní' && varSymbol.length < 1 || language.length < 1 || email.length < 1){
        //     alert('Nejsou vyplněny potřebná pole pro odeslání faktury. Zkontrolujte, zda je vyplněn email, jazyk a variabilní symbol!')
        //     return
        // }
        const data:User = {
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
            fetch(`${basePath}api/v1/add-user`, {
            method: 'POST',
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
            //         console.log('-----------------')
            //         alert(result['message'])
            //         if (result['status'] === 'ok') {
            //             window.location.href = '/';
            //         }
            //     }
            // )
    }

    // function requiredField() :"required" | undefined{
    //     if (status==='Aktivní'){
    //         return "required";
    //     }
    // };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" style={{color: '#3f51b5'}}>
                    Přidání nového uživatele
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="name"
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                id="firstName"
                                label="Jméno"
                                onChange={(e) => setname(e.target.value)}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label="Příjmení"
                                onChange={(e) => setsurname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="bornDate"
                                label="Datum narození"
                                onChange={(e) => setBornDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="street"
                                label="Ulice a č.p."
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="city"
                                label="Město"
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="postCode"
                                label="PSČ"
                                onChange={(e) => setPostCode(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="phone"
                                label="Telefon"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="varSymbol"
                                label="Variabilní symbol"
                                onChange={(e) => setvarSymbol(e.target.value)}
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
                                    className={classes.select}
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
                                    className={classes.select}
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
                        Uložit
                    </Button>
                </form>
            </div>
        </Container>
    );
}