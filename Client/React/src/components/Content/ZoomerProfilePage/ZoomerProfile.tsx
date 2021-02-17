import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import useZoomerProfile from './useZoomerProfile';
import useStyles from './ZoomerProfileStyles';
import { useParams } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import formatDate, { } from 'utils/DatesUtil/DatesUtil';
import ZoomerProfileEvents from './ZoomerProfileEvents/ZoomerProfileEvents';

const ZoomerProfile: React.FC = (): JSX.Element => {

    const { zoomer, getZoomerById } = useZoomerProfile();
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getZoomerById(id);
    }, [])

    return (
        <>
            <div className={classes.zoomerDetailes}>
                <div className={classes.zoomerHead}>
                    <Avatar alt="Remy Sharp" src={zoomer?.photograph} className={classes.zoomerImg} />
                    <div className={classes.zoomerTitle}>
                        <Typography className={classes.zoomerName} >{zoomer?.full_name}</Typography>
                        {zoomer?.approved_date &&
                            <Typography>{`זומר/ית מ-${formatDate(zoomer.approved_date)}`}</Typography>
                        }
                    </div>
                </div>
                <Typography className={classes.zoomerDescription}>{zoomer?.description}</Typography>
            </div>
            <div>
                <ZoomerProfileEvents zoomer={zoomer}></ZoomerProfileEvents>
            </div>
        </>
    );
}

export default ZoomerProfile;
