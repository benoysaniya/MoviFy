import React, { useState, useEffect, useContext } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';
import toast from 'react-hot-toast';
import { UserContext } from '../../App';
const POSTER_PATH = 'https://image.tmdb.org/t/p/original';
const Favourite = () => {
  const { state, dispatch } = useContext(UserContext);
  const [favourites, setfavourites] = useState(null);

  const removeFavourite = (id) => {
    fetch(`/delete/${id}`, {
      method: 'delete',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then(({ error , result }) => {
          console.log('result',result);
        if (error) toast.error(error);
        else {
          toast.success('Succesfully Removed to favourites');
          setfavourites(result.favourite);
        }
      });
  };
    useEffect(() => {
      fetch('/fetchfavourite', {
        method: 'get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          setfavourites(data.result.favourite);
        });
    },[]);
  return (
    <div style={{ margin: '2rem auto', width: '95%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {favourites && favourites.length > 0 ?
          (favourites?.map(({ poster_path, movieId }) => {
            return (
              <div style={{ margin: '0.3rem', position: 'relative' }}>
                <img
                  src={`${POSTER_PATH}${poster_path}`}
                  alt='poster'
                  style={{ width: '10rem', height: 'auto' }}
                  className='posters'
                />
                <div
                  className='favouritetab'
                  onClick={() => {
                      console.log(movieId)
                    removeFavourite(movieId);
                  }}
                >
                  Remove Favourite{'  '} &nbsp;
                  <FavoriteIcon style={{ color: red[500] }} />
                </div>
              </div>
            );
          }))
        :
        <h3 style={{color:"white",margin:"auto"}}>You have not added any movie to your favourites</h3>        
        }
      </div>
    </div>
  );
};

export default Favourite;
