import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Movie } from '../types';
import { getRandomMovie } from '../utils';
import { useSpring, animated, config } from '@react-spring/web';
import { getMovieList } from '../api';

const RecommendationContainer = styled.div`
  text-align: left;
  margin-bottom: 40px;
`;

const RecommendationTitle = styled.h2`
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

const RecommendationCard = styled(animated.div)`  /* Animated divに変更 */
  background-color: #faf0e6; /* linen色 */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const Title = styled.h3`
  color: #cd853f; /* パーシモン */
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #4b3832; /* ダークブラウン */
  margin-bottom: 20px; /* ボタンとの間に余白を設定 */
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

interface RandomRecommendationProps {
  movies: Movie[];
}

const RandomRecommendation: React.FC<RandomRecommendationProps> = ({ /* movies */ }) => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);

  // useEffect(() => {
  //   setRandomMovie(getRandomMovie(movies));
  // }, []); // 空の配列を渡して、最初の1回だけ実行されるようにする

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('before promise'); // Movie[] 型のデータをコンソールに出力
        const response = await getMovieList(); // Movie[]
        console.log('after promise');
        console.log(response); // Movie[] 型のデータをコンソールに出力
        setRandomMovie(getRandomMovie(response.data));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies(); // 映画リストを取得
  }, []); // 空の依存配列を渡すことで、コンポーネントのマウント時に一度だけ実行される

  useEffect(() => {
    //n秒ごとにランダムに表示するカードを示すindexを変える
    //3秒経ったらn秒の間隔を遅くする
    //さらに4秒経ったらn秒の間隔をもっと遅くする
    //さらに2秒経ったらn秒の何画をっもっと遅くする
    //さらに2秒経ったらおすすめの映画に固定する
  }, []);

  const props = useSpring({
    to: { opacity: 1, transform: 'scale(1)' },
    from: { opacity: 0, transform: 'scale(0.95)' },
    config: config.default,
  });

  if (!randomMovie) return <p>No movies available</p>;

  return (
    <RecommendationContainer>
      <RecommendationTitle>
        おすすめの映画<Emoji>{randomMovie.emoji}</Emoji>
      </RecommendationTitle>
      <RecommendationCard style={props}>
        <Title>{randomMovie.title}</Title>
        <Description>{randomMovie.description}</Description>
        <Button
          href={randomMovie.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Disney+ で見る
        </Button>
      </RecommendationCard>
    </RecommendationContainer>
  );
};

export default RandomRecommendation;
