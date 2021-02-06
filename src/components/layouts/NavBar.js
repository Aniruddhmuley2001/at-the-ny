import React from "react";
import { AppBar, Toolbar, List, ListItem, ListItemText, makeStyles, Container } from "@material-ui/core";

const navLinks = [
    {title: 'Home', path: '/'},
    {title: 'Top Stories', path: '/topstories'}
]

const useStyles = makeStyles({
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    },
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `center`
    }
})

const NavBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Container className={classes.navbarDisplayFlex}>
                    <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                        {navLinks.map(({title, path}) => (
                            <a href={path} key={title} className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary={title} />
                                </ListItem>
                            </a>
                        ))}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar