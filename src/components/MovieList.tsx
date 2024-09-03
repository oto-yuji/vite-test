import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSprings, animated, config } from '@react-spring/web';
import { Movie } from '../types';
import { getMovieList, createMovie, updateMovie, deleteMovie } from '../api';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center; // カードを中央揃えに
`;

const MovieCard = styled(animated.li)`
  background-color: #faf0e6; /* linen色 */
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
  margin: 15px auto;
  width: 280px; // 幅を指定
  max-width: 90%; // 最大幅を画面の90%に制限
`;

const MovieTitle = styled.a`
  color: #cd853f; /* パーシモン */
  font-size: 1.2em;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #a0522d; /* ホバー時の色（シエナ） */
  }
`;

const MovieDescription = styled.p`
  color: #4b3832; /* ダークブラウン */
`;

const Button = styled.button`
  background-color: #cd853f; /* パーシモン */
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  margin-right: 10px;
  margin-top: 10px; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  &:hover {
    background-color: #a0522d; /* ホバー時の色（シエナ） */
  }
`;

const InputField = styled.input`
  padding:8px;
  margin-top: 10px;
  border: 1px solid #ddd; // 境界線の色
  border-radius: 5px; // 角を丸く
  font-size: 0.9em; // フォントサイズ調整
  background-color: #fce8d5; /* linen色 */
  color: #444444
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #4b3832;
`;

const FormContainer = styled.div`
  position: relative;
  background-color: #faf0e6;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const AddButton = styled(Button)`
  background-color: #4CAF50; // 緑色
  color: white;
  font-weight: bold;
  padding: 8px 16px;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`;

const CreateButton = styled(Button)`
  background-color: #FF4500; // オレンジレッド
  color: white;
  font-weight: bold;
  padding: 8px 16px;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  margin-top: 15px;
  
  &:hover {
    background-color: #FF6347;
    transform: scale(1.05);
    box-shadow: 0 3px 6px rgba(0,0,0,0.2);
  }
`;

const ErrorMessage = styled.p`
  color: #D32F2F;
  font-size: 0.9em;
  margin-top: 2px;
  margin-bottom: 0; // 下マージンを削除
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const MovieList: React.FC = () => {
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [inputMovie, setInputMovie] = useState({
    title: '',
    description: '',
    url: '',
    emoji: '',
  });
  const [editInfo, setEditInfo] = useState<Movie[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [updateOn, setUpdateON] = useState<boolean[]>([]);
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    url: '',
    emoji: '',
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovieList();
        setMoviesList(response.data);
        setEditInfo(response.data);
        setUpdateON(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const validateForm = () => {
    let errors = {
      title: '',
      description: '',
      url: '',
      emoji: '',
    };
    let isValid = true;

    if (!inputMovie.title.trim()) {
      errors.title = 'タイトルを入力してください';
      isValid = false;
    }

    if (!inputMovie.description.trim()) {
      errors.description = '説明を入力してください';
      isValid = false;
    }

    if (!inputMovie.url.trim()) {
      errors.url = 'URLを入力してください';
      isValid = false;
    } else {
      try {
        new URL(inputMovie.url);
      } catch (_) {
        errors.url = '有効なURLを入力してください';
        isValid = false;
      }
    }

    if (!inputMovie.emoji.trim()) {
      errors.emoji = '絵文字を入力してください';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const onCreate = async () => {
    if (validateForm()) {
      const newMovie = { ...inputMovie };

      const newMovieList = [...moviesList, newMovie];

      setMoviesList(newMovieList as Movie[]);

      setInputMovie({ title: '', description: '', url: '', emoji: '' });
      
      try {
        await createMovie(newMovie as Movie);
        setShowCreateForm(false);
      } catch (error) {
        console.error('Error creating movie:', error);
      }
    }
  };

  const onDelete = async (index: number) => {
  
    try {
      await deleteMovie(moviesList[index].id);
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
    setMoviesList(moviesList.filter((_, i) => i !== index));
  };

  const onEdit = (index: number) => {
    const newupdateON = updateOn.slice();
    newupdateON[index] = !updateOn[index];
    setUpdateON(newupdateON);
  };

  const springs = useSprings(
    moviesList.length,
    moviesList.map(() => ({
      from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
      to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
      config: config.wobbly,
    }))
  );

  const onSave = async (index: number) => {
    setMoviesList(editInfo);

    try {
      await updateMovie(editInfo[index].id, editInfo[index]);
    } catch (error) {
      console.error('Error updating movie:', error);
    }

    const newupdateON = updateOn.slice();
    newupdateON[index] = !updateOn[index];
    setUpdateON(newupdateON);
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    if (showCreateForm) {
      setInputMovie({ title: '', description: '', url: '', emoji: '' });
      setFormErrors({ title: '', description: '', url: '', emoji: '' });
    }
  };

  return (
    <>
      {!showCreateForm && (
        <AddButton onClick={toggleCreateForm}>作品を追加する</AddButton>
      )}
      {showCreateForm && (
        <FormContainer>
          <CloseButton onClick={toggleCreateForm}>✕</CloseButton>
          <InputContainer>
            <InputField
              type="text"
              placeholder="タイトル"
              value={inputMovie.title}
              onChange={(e) =>
                setInputMovie({ ...inputMovie, title: e.target.value })
              }
            />
            {formErrors.title && <ErrorMessage>{formErrors.title}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <InputField
              type="text"
              placeholder="説明"
              value={inputMovie.description}
              onChange={(e) =>
                setInputMovie({ ...inputMovie, description: e.target.value })
              }
            />
            {formErrors.description && <ErrorMessage>{formErrors.description}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <InputField
              type="text"
              placeholder="URL"
              value={inputMovie.url}
              onChange={(e) =>
                setInputMovie({ ...inputMovie, url: e.target.value })
              }
            />
            {formErrors.url && <ErrorMessage>{formErrors.url}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <InputField
              type="text"
              placeholder="絵文字"
              value={inputMovie.emoji}
              onChange={(e) =>
                setInputMovie({ ...inputMovie, emoji: e.target.value })
              }
            />
            {formErrors.emoji && <ErrorMessage>{formErrors.emoji}</ErrorMessage>}
          </InputContainer>
          <CreateButton onClick={onCreate}>作品を登録</CreateButton>
        </FormContainer>
      )}
      <List>
        {springs.map((springProps, index) => (
          <MovieCard key={index} style={springProps}>
            <MovieTitle
              href={moviesList[index].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {moviesList[index].title}
            </MovieTitle>
            <MovieDescription>{moviesList[index].description}</MovieDescription>

            <Button onClick={() => onDelete(index)}>Delete</Button>
            <Button onClick={() => onEdit(index)}>Edit</Button>
            {updateOn[index] && (
              <>
                <div>
                  <InputField
                    type="text"
                    placeholder="Title"
                    value={editInfo[index].title}
                    onChange={(e) => {
                      const newInfo = [...editInfo];
                      newInfo[index] = {
                        ...newInfo[index],
                        title: e.target.value,
                      };
                      setEditInfo(newInfo);
                    }}
                  />
                </div>
                <div>
                  <InputField
                    type="text"
                    placeholder="Description"
                    value={editInfo[index].description}
                    onChange={(e) => {
                      const newInfo = [...editInfo];
                      newInfo[index] = {
                        ...newInfo[index],
                        description: e.target.value,
                      };
                      setEditInfo(newInfo);
                    }}
                  />
                </div>
                <div>
                  <InputField
                    type="text"
                    placeholder="URL"
                    value={editInfo[index].url}
                    onChange={(e) => {
                      const newInfo = [...editInfo];
                      newInfo[index] = {
                        ...newInfo[index],
                        url: e.target.value,
                      };
                      setEditInfo(newInfo);
                    }}
                  />
                </div>
                <div>
                  <InputField
                    type="text"
                    placeholder="絵文字"
                    value={editInfo[index].emoji}
                    onChange={(e) => {
                      const newInfo = [...editInfo];
                      newInfo[index] = {
                        ...newInfo[index],
                        emoji: e.target.value,
                      };
                      setEditInfo(newInfo);
                    }}
                  />
                </div>
                <Button onClick={() => onSave(index)}>Save</Button>
              </>
            )}
          </MovieCard>
        ))}
      </List>
    </>
  );
};

export default MovieList;
