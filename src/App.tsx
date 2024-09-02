import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // 'Switch' を 'Routes' に変更
import styled, { createGlobalStyle } from 'styled-components';
import MovieList from './components/MovieList';
import RandomRecommendation from './components/RandomRecommendation';
import { Movie } from './types';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5dc; /* ベージュ */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fffaf0; /* フローラルホワイト */
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 40px; /* 内側の余白を増やす */
`;

const Header = styled.header`
  text-align: left;
  margin-bottom: 20px;
`;

const Logo = styled.h1`
  font-size: 2.5em;
  color: #4b3832; /* ダークブラウン */
  font-family: 'Arial Black', sans-serif;
`;

const Nav = styled.nav`
  margin-bottom: 20px;
`;

const NavLink = styled(Link)`
  margin-right: 20px;
  color: #4b3832; /* ダークブラウン */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 2px;
  background: #e0e0e0;
  margin: 20px 0;
`;

const movies: Movie[] = [
  {
    id: 1, // 追加
    title: 'アラジン',
    description: 'A story about a young man and a genie.',
    url: 'https://example.com/aladdin',
    emoji: '🧞‍♂',
  },
  {
    id: 2, // 追加
    title: 'ライオンキング',
    description: 'A story about a lion cub becoming a king.',
    url: 'https://example.com/lionking',
    emoji: '🦁',
  },
  {
    id: 3, // 追加
    title: '美女と野獣',
    description: 'A story about a young woman and a cursed prince.',
    url: 'https://example.com/beautyandbeast',
    emoji: '🌹',
  },
  {
    id: 4, // 追加
    title: 'くまのプーさん',
    description: 'A story about a bear and his friends.',
    url: 'https://example.com/pooh',
    emoji: '🍯',
  },
  {
    id: 5, // 追加
    title: 'リトル・マーメイド',
    description: 'A story about a mermaid who wants to be human.',
    url: 'https://example.com/littlemermaid',
    emoji: '🧜‍♀',
  },
  {
    id: 6, // 追加
    title: 'アナと雪の女王',
    description: 'A story about two sisters and their icy powers.',
    url: 'https://example.com/frozen',
    emoji: '⛄',
  },
];

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Container>
        <Header>
          <Logo>ランダムD+</Logo>
        </Header>
        <Nav>
          <NavLink to="/">おすすめの映画</NavLink>
          <NavLink to="/movies">映画リスト</NavLink>
        </Nav>
        <Divider />
        <Routes>
          {' '}
          <Route
            path="/"
            element={<RandomRecommendation movies={movies} />}
          />{' '}
          <Route path="/movies" element={<MovieList movies={movies} />} />{' '}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
