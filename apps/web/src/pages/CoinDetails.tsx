import { useNavigate, useParams } from 'react-router';

export const CoinDetails = () => {
  const navigate = useNavigate();
  const { coinId } = useParams();

  return (
    <>
      <div>Details for {coinId}</div>
      <button onClick={() => navigate(-1)}>go back</button>
    </>
  );
};
