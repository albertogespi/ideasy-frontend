import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
    marginTop: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const categories = [
  "Blog",
  "Corporativa",
  "e-Commerce",
  "e-Learning",
  "Noticias",
  "Wikis"
];

const complexities = ["Fácil", "Medio", "Difícil"];

export function Filters({filtersState, setFiltersState}){
  const classes = useStyles();

  const handleChange = name => event => {
    console.log(event.target.value);
    setFiltersState({
      ...filtersState,
      [name]: event.target.value,
    });
  };

  return (
    <section className="filters">
        <h2>Filtrar proyectos por</h2>
        <section id="filters-selects">
          <FormControl className={classes.formControl}>
            <InputLabel id="categoría" htmlFor="category-native-helper">Categoría</InputLabel>
            <Select
            labelId="categoría"
              value={filtersState.category}
              onChange={handleChange('category')}
            >
              <MenuItem value={''}>Todas</MenuItem>
              {categories.map((cat, index) =>( <MenuItem key={index} value={cat}>{cat}</MenuItem>))}
            </Select>
            <FormHelperText>Selecciona una categoría</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="complejidad" htmlFor="complexity-native-helper">Complejidad</InputLabel>
            <Select
            labelId="complejidad"
              value={filtersState.complexity}
              onChange={handleChange('complexity')}
            >
              <MenuItem value={''}>Todas</MenuItem>
              {complexities.map((com, index) =>( <MenuItem key={index} value={index+1}>{com}</MenuItem>))}
            </Select>
            <FormHelperText>Selecciona una complejidad</FormHelperText>
          </FormControl>
        </section>
    </section>
  );
}