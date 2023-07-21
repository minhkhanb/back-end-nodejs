import React from 'react';
import Layout from '@src/components/Layout';
import Pokedex, { Pagination, PokeCat } from '@src/services/pokemon.service';
import { Pagination as PaginationMui, PaginationItem } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import SortableList, { SortableItem } from '@src/components/Sortable/Sortable';
import { arrayMoveImmutable } from '@src/components/Sortable/utils';

const Pokemon: React.FunctionComponent = () => {
  const [categories, setCategories] = React.useState<PokeCat[]>([]);
  const [pokemonsWithPagination, setPokemonsWithPagination] = React.useState<
    Pagination<PokeCat>
  >({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const pokedex = new Pokedex();

  React.useEffect(() => {
    async function getPokemon() {
      const response = await pokedex.getPokemons();

      if (response.data) {
        const paginationPokeCategories = response.data;

        setPokemonsWithPagination(paginationPokeCategories);
      }
    }

    async function getCat() {
      const response = await axios.get('http://localhost:3000/v1/pokemon');

      if (response.data) {
        setCategories(response.data);
      }
    }

    getPokemon();
    getCat();
  }, []);

  const onPageChanged = async (_: React.ChangeEvent<unknown>, page: number) => {
    console.log('e: ', page);
    const currentOffset = page <= 1 ? 0 : (page - 1) * 25;
    const response = await pokedex.getPokemons(currentOffset);

    if (response.data) {
      const paginationPokeCategories = response.data;

      setPokemonsWithPagination(paginationPokeCategories);
    }
  };

  const getPokemonThumbnail = (pokemon: PokeCat) => {
    const pokeId = pokemon.url.match(/(\d+)\/+$/);

    if (pokeId && pokeId.length > 0) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId[1]}.svg`;
    }

    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setCategories((array) => arrayMoveImmutable(array, oldIndex, newIndex));
  };

  return (
    <Layout>
      <SortableList
        onSortEnd={onSortEnd}
        style={{ display: 'flex', flexWrap: 'wrap', userSelect: 'none' }}
        draggedItemClassName="dragged"
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {categories.map((category) => (
            <SortableItem key={category.name}>
              <Grid item key={category.name} xs={12} sm={4} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      // pt: '56.25%',
                      height: 200,
                      objectFit: 'contain',
                      pointerEvents: 'none',
                    }}
                    image={category.image}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h6"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {category.name}
                    </Typography>
                    <Typography>This is a pokemon card</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View more</Button>
                  </CardActions>
                </Card>
              </Grid>
            </SortableItem>
          ))}
        </Grid>
      </SortableList>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={3}>
        {pokemonsWithPagination.results.map((pokemon) => (
          <Grid item key={pokemon.name} xs={12} sm={4} md={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  // pt: '56.25%',
                  height: 200,
                  objectFit: 'contain',
                }}
                image={getPokemonThumbnail(pokemon)}
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h6"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {pokemon.name}
                </Typography>
                <Typography>This is a pokemon card</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View more</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack sx={{ mt: 4 }} spacing={2}>
        <PaginationMui
          sx={{ justifyContent: 'center', display: 'flex' }}
          count={10}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBack, next: ArrowForward }}
              {...item}
            />
          )}
          onChange={onPageChanged}
        />
      </Stack>
    </Layout>
  );
};

export default Pokemon;
