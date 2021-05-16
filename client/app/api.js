import axios from 'axios';

const serverUri = 'http://localhost:8081';

const getOptions = () => {
  const options = {
    baseURL: `${serverUri}`,
  };
  
  const key = localStorage.getItem('key');
  if(key) {
    options.headers = {
      'authorization': `${key}`
    };
  }

  return options;
}

const client = axios.create(getOptions());

export default client;