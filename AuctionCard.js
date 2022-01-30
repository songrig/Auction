import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard({about,src,name,owner}) {
  return (
    <Card  sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="345"
        image={src}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name:{name}
        </Typography>
        <Typography>
        Item owner:{owner}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {<h2>Abot lot</h2>}
        {about}
        </Typography>
      </CardContent>
    </Card>
  );
}