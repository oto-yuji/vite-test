import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Movie } from '../types';
import { getRandomMovie } from '../utils';
import { useSpring, animated, config } from '@react-spring/web';
import { getMovieList } from '../api';

const RecommendationContainer = styled.div`
  text-align: left;
  margin-bottom: 80px; // この値を増やして余白を追加
  position: relative;
`;

const RecommendationTitle = styled.h2<{ isShuffling: boolean }>`
  color: #4b3832; /* ダークブラウン */
  font-size: 1.8em;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Emoji = styled.span`
  font-size: 1.5em;
  margin-left: 10px;
`;

const RecommendationCard = styled(animated.div)`
  background-color: #faf0e6; /* linen色 */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 280px; // 300pxから280pxに変更
  max-width: 90%; // 100%から90%に変更
`;

const Title = styled.h3`
  color: #cd853f; /* パーシモン */
  margin-bottom: 10px;
  font-size: 1.2em;
  word-wrap: break-word;
`;

const Description = styled.p`
  color: #4b3832; /* ダークブラウン */
  margin-bottom: 20px;
  font-size: 0.9em;
  word-wrap: break-word;
`;

const Button = styled.a`
  display: inline-block;
  background-color: #cd853f; /* パーシモン */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1em;
  cursor: pointer;
  text-align: center; /* ボタン内のテキストを中央に寄せる */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #a0522d; /* ホバー時の色（シエナ） */
  }
`;

const ReloadButton = styled.button`
  background-color: #ff4136; // 赤色に変更
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 0.9em;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: none;
  position: absolute;
  right: 0;
  bottom: -70px;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s;
  }

  &:hover {
    background-color: #e60000; // ホバー時の色をより濃い赤に
    &:before {
      left: 100%;
    }
  }
`;

const ShuffleIcon = styled.svg`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  transition: transform 0.3s ease;

  ${ReloadButton}:hover & {
    transform: rotate(180deg);
  }
`;

interface RandomRecommendationProps {
  movies: Movie[];
}

const RandomRecommendation: React.FC<RandomRecommendationProps> = ({ /* movies */ }) => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await getMovieList();
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  const shuffleMovie = async () => {
    setIsShuffling(true);
    const movies = await fetchMovies();
    let count = 0;
    const shuffleInterval = setInterval(() => {
      setRandomMovie(getRandomMovie(movies));
      count++;
      if (count > 10) {
        clearInterval(shuffleInterval);
        setIsShuffling(false);
      }
    }, 200);
  };

  useEffect(() => {
    shuffleMovie();
  }, []);

  const handleReload = () => {
    shuffleMovie();
  };

  const props = useSpring({
    to: { opacity: 1, transform: 'scale(1)' },
    from: { opacity: 0, transform: 'scale(0.95)' },
    reset: isShuffling,
    config: config.default,
  });

  if (!randomMovie) return <p>映画が見つかりません</p>;

  return (
    <RecommendationContainer>
      <RecommendationTitle isShuffling={isShuffling}>
        {isShuffling ? (
          <>シャッフル中<Emoji>🎲</Emoji></>
        ) : (
          <>おすすめの映画<Emoji>{randomMovie?.emoji}</Emoji></>
        )}
      </RecommendationTitle>
      <RecommendationCard style={props}>
        <Title>{randomMovie?.title}</Title>
        <Description>{randomMovie?.description}</Description>
        <Button
          href={randomMovie?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Disney+ で見る
        </Button>
      </RecommendationCard>
      <ReloadButton onClick={handleReload} disabled={isShuffling}>
        <ShuffleIcon viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
        </ShuffleIcon>
        {isShuffling ? 'シャッフル中...' : 'シャッフル'}
      </ReloadButton>
    </RecommendationContainer>
  );
};

export default RandomRecommendation;
