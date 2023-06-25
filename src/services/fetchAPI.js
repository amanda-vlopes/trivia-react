export const fetchQuestions = async () => {
  const token = localStorage.getItem('token');
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
