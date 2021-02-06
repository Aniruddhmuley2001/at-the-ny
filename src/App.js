import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import axios from 'axios';
import NavBar from './components/layouts/NavBar'
// import TopStories from "./components/TopStories";
import Articles from "./components/Articles";
import Search from "./components/Search";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [topStories, setTopStories] = useState([])

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      const res = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:("Education")&sort=newest&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`);
      setArticles(res.data.response.docs)

      setLoading(false);
    }
    getArticles();
  }, []);

  const searchArticles = async (text) => {
    setLoading(true);
    const res = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`);
    setArticles(res.data.response.docs);
    setLoading(false);
  }

  const getTopArticles = async (section) => {
    setLoading(true);
    const res = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`);
    setTopStories(res.data.results);
    setLoading(false);
  };

  // Start from here
  return (
    <div>
      <NavBar />
      <Container>
        <Typography color="textPrimary" gutterBottom variant="h2" align="center">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => (
                <div>
                  <Search searchArticles={searchArticles} />
                  <NavLink to='/topstories'>
                    <Link component="button" variant="body2">Go to top stories round the world of Tech, U.S. and the global politics</Link>
                  </NavLink>
                  <Articles loading={loading} articles={articles} />
                </div>
              )} />

              <Route exact path="/topstories" render={() => (
                <div>
                  {/*<TopStories loading={loading} topStories={topStories} getTopArticles={getTopArticles} />*/}
                  {/* <a href="/">Sample</a> */}
                </div>
              )} />

            </Switch>
          </BrowserRouter>
        </Typography>
      </Container>
    </div>
  )
}

export default App;
