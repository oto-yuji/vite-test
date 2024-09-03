import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // 'Switch' を 'Routes' に変更
import styled, { createGlobalStyle } from 'styled-components';
import MovieList from './components/MovieList';
import RandomRecommendation from './components/RandomRecommendation';

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
          <Route path="/" element={<RandomRecommendation />} />
          <Route path="/movies" element={<MovieList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
