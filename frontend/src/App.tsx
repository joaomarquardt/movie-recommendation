import MovieRecommendationForm from './components/MovieRecommendationForm';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="main-header">
          <h1 className="app-title">CineRecomenda</h1>
          <p className="app-subtitle">
            Descubra seu próximo filme favorito com recomendações personalizadas!
          </p>
        </header>

        <main>
          <MovieRecommendationForm />
        </main>

        <footer className="app-footer">
          <p>
            Powered by <a href="https://developer.themoviedb.org/docs/getting-started"><strong>TMDB</strong> API</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
