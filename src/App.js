import './App.css';
import MainForm from './components/MainForm/MainForm';
import { BrowserRouter, Route } from 'react-router-dom';
import RecipeDetailContainer from './components/RecipeDetailContainer/RecipeDetailContainer';
import { Recipes } from './components/Recipes/Recipes';
import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <MainForm />
      </Route>
      <Route exact path="/recipes">
        <Recipes />
      </Route>
      <Route exact path="/recipes/:id">
        <RecipeDetailContainer />
      </Route>
    </BrowserRouter>
  );
}

export default App;