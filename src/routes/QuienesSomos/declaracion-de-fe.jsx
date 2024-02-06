/* eslint-disable react/jsx-key */

import { useState } from 'react'
import '/public/css/declafe.css'
import { useEffect } from 'react'



import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function DeclaracionDFe() {
    const [data, setData] = useState(null)
    useEffect(() => {
        //:TODO: cARGAMOS EL jSON
        fetch('/json/declaracionDeFe.json')
            .then(response => response.json())
            .then(jsonData => setData(jsonData))
    }, [])


    return (
        <article className="father-decla">
            <div className="container">
                <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>

                    <div className="container">
                        <div>
                            <p className='decla-p animate animate__backInDown' >{data?.idec}</p>
                        </div>
                        <Divider variant="inset" component="li" />
                        <div>
                            <p className='decla-p animate animate__backInUp' >{data?.criterio}</p>
                        </div>
                    </div>
                </List>
            </div>

            <div className="container">
                {data &&
                    data.items.map(item => (
                        <List sx={{ width: '100%', maxWidth: 660, bgcolor: 'background.paper' }} className='animate animate__fadeInUp'>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    {item.id}
                                </ListItemAvatar>
                                <ListItemText
                                    primary={data.title}
                                    secondary={
                                        <React.Fragment>
                                            {item.pasaje && item.pasaje.map((pasaje, index) => (
                                                <Typography
                                                    key={index}
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {pasaje}
                                                </Typography>
                                            ))}
                                            -- {item.content}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />

                        </List>

                    ))}
            </div>


        </article>

    )
}

export default DeclaracionDFe