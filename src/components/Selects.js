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

export function Selects({isFilters, selectsState, setSelectsState}){
  const classes = useStyles();

  const handleChange = name => event => {
    setSelectsState({
      ...selectsState,
      [name]: event.target.value,
    });
  };

  return (
    <section className={isFilters ? "filters" : ""}>
        {isFilters && <h2>Filtrar proyectos por</h2>}
        <section id="filters-selects">
          <FormControl className={classes.formControl}>
            <InputLabel id="category" htmlFor="category-native-helper">Categoría</InputLabel>
            <Select
            labelId="category"
              value={selectsState.category}
              onChange={handleChange('category')}
            >
              {isFilters && <MenuItem value={''}>Todas</MenuItem>}
              {categories.map((cat, index) =>( <MenuItem key={index} value={cat}>{cat}</MenuItem>))}
            </Select>
            {isFilters && <FormHelperText>Selecciona una categoría</FormHelperText>}
            {selectsState.category === null && <FormHelperText error>La categoría es obligatoria</FormHelperText>}
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="complexity" htmlFor="complexity-native-helper">Complejidad</InputLabel>
            <Select
            labelId="complexity"
              value={selectsState.complexity}
              onChange={handleChange('complexity')}
            >
              {isFilters && <MenuItem value={''}>Todas</MenuItem>}
              {complexities.map((com, index) =>( <MenuItem key={index} value={index+1}>{com}</MenuItem>))}
            </Select>
            {isFilters && <FormHelperText>Selecciona una complejidad</FormHelperText>}
            {selectsState.complexity === null && <FormHelperText error>La complejidad es obligatoria</FormHelperText>}
          </FormControl>
        </section>
    </section>
  );
}