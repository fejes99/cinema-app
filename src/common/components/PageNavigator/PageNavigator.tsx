import React from 'react';
import { useNavigate } from 'react-router';
import './PageNavigator.scss';
import Button from '../UI/Button/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Props {
  title: string;
}

const PageNavigator: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  return (
    <div className='page-navigator'>
      <div className='page-header'>{title}</div>
      <Button size={'large'} type={'secondary'} onClick={handleBackClick}>
        Back
        <div className='icon'>
          <ArrowBackIosNewIcon />
        </div>
      </Button>
    </div>
  );
};

export default PageNavigator;
