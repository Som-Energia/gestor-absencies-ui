import React, { useState } from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

import AbsAnualCalendar from '../../components/AbsAnualCalendar'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)
  },
  yearContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  resum: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resumItem: {
    textAlign: 'center',
    flexGrow: 1
  },
  super: {
    fontSize: '30px'
  },
  superDesc: {
    fontSize: '14px',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  }
}))

const Absences = () => {
  const classes = useStyles()
  const [yearRef, setYearRef] = useState('2020')

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card className={classes.paper} elevation={0}>
            <CardContent className={classes.yearContainer}><h1>{yearRef}</h1></CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className={classes.paper} elevation={0}>
            <CardContent>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                donec massa sapien faucibus et molestie ac.
              </Typography>
              <Typography paragraph>
                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={7}>

          <Card className={classes.paper} elevation={0}>
            <CardContent>
              <div className={classes.resum}>
                <div className={classes.resumItem}>
                  <div className={classes.super}>25</div>
                  <div className={classes.superDesc}>DIES TOTALS</div>
                </div>
                <div className={classes.resumItem}>
                  <div className={classes.super}>88.5</div>
                  <div className={classes.superDesc}>DIES DISPONIBLES</div>
                </div>
                <div className={classes.resumItem}>
                  <div className={classes.super}>9.5</div>
                  <div className={classes.superDesc}>DIES UTILITZATS</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={classes.paper} elevation={0}>
            <CardContent>
              <AbsAnualCalendar />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Absences
