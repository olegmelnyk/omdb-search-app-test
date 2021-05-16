/**
 *
 * MoviesSearch
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import serialize from 'form-serialize';

import {
  Grid,
  Paper,
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import { FormControl, ImageContainer } from './style';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMoviesSearch from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import { getYearsList } from './utils';
import messages from './messages';

export function MoviesSearch({
  state,
  onSearch
}) {
  useInjectReducer({ key: 'moviesSearch', reducer });
  useInjectSaga({ key: 'moviesSearch', saga });

  const years = getYearsList();

  return (
    <Box display="flex" justifyContent="center">
      <Box width="75%">
        <Paper>
          <Box p={2}>
            <Paper>
              <form onSubmit={onSearch}>
                <Grid container>
                  <Grid item md={3}>
                    <Box p={2}>
                      <TextField
                        name='title'
                        defaultValue={''}
                        fullWidth
                        placeholder={'Search...'}
                        variant='outlined'
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box p={2}>
                      <FormControl>
                        <InputLabel id="type-select-label">Type</InputLabel>
                        <Select
                          name='type'
                          labelId="type-select-label"
                          id="type-select"
                          defaultValue={'any'}
                          variant='outlined'
                        >
                          <MenuItem value='any'>Any</MenuItem>
                          <MenuItem value='movie'>Movie</MenuItem>
                          <MenuItem value='series'>Series</MenuItem>
                          <MenuItem value='episode'>Episode</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box p={2}>
                      <FormControl>
                        <InputLabel id="year-select-label">Year</InputLabel>
                        <Select
                          name='y'
                          labelId="year-select-label"
                          id="year-select"
                          defaultValue={'any'}
                          variant='outlined'
                        >
                          <MenuItem key={'any'} value={'any'}>Any</MenuItem>
                          {years.map(year => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box display='flex' justifyContent='center' p={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Search
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Box>
          <Box p={2}>
            <Paper>
              <Box p={2}>
                {state.list && state.list.length && state.list.map((item, index) => (
                  <Box key={`index-${index}`} mb={2}>
                    <Paper>
                      <Grid container>
                        <Grid item md={3}>
                          <Box p={2}>
                            <ImageContainer>
                              {item.Poster && item.Poster !=='N/A' &&
                              (
                                <img src={item.Poster} alt={item.Title} />
                              )}
                            </ImageContainer>
                          </Box>
                        </Grid>
                        <Grid item md={9}>
                          <h5>{item.Title}</h5>
                          <p>IMDB ID: {item.imdbID}</p>
                          <p>Year: {item.Year}</p>
                          <p>Type: {item.Type}</p>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

MoviesSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectMoviesSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSearch: e => {
      e.preventDefault();
      const request = serialize(e.target, { hash: true });
      dispatch(actions.search(request));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MoviesSearch);
