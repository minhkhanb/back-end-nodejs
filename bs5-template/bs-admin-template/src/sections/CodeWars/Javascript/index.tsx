import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Link } from 'gatsby';

const Javascript: React.FunctionComponent = () => {
  return (
    <Grid container spacing={3}>
      {[
        {
          title: 'Sum of Digits / Digital Root',
          imgUrl:
            'https://blog.webico.vn/wp-content/uploads/2019/12/javascript-3.png',
          route: 'sum-of-digits',
        },
      ].map((element, index) => (
        <Grid key={index} item xs={12} sm={4} md={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {element.title.charAt(0)}
                </Avatar>
              }
              title={
                <MuiLink component={Link} to={element.route}>
                  {element.title}
                </MuiLink>
              }
            />
            <CardMedia
              component="img"
              sx={{ objectFit: 'contain' }}
              image={element.imgUrl}
              alt={element.title}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <MuiLink href="https://en.wikipedia.org/wiki/Digital_root">
                  Digital root
                </MuiLink>{' '}
                is the recursive sum of all the digits in a number.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Javascript;
