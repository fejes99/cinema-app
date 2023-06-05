import React, { ReactNode } from 'react';

import './TicketCreateNavigation.scss';

import Button from 'common/components/UI/Button/Button';

interface Props {
  title: string;
  backTitle: string;
  backDisabled: boolean;
  nextTitle: string | ReactNode;
  nextDisabled: boolean;
  onBack: () => void;
  onNext: () => void;
}

const TicketCreateNavigation: React.FC<Props> = ({
  title,
  backTitle,
  backDisabled,
  nextTitle,
  nextDisabled,
  onBack,
  onNext,
}) => (
  <div className='ticket-create-navigation'>
    <Button size='large' type='secondary' disabled={backDisabled} onClick={onBack}>
      {backTitle}
    </Button>
    <div className='ticket-create-navigation__title'>{title}</div>
    <Button size='large' type='primary' disabled={nextDisabled} onClick={onNext}>
      {nextTitle}
    </Button>
  </div>
);

export default TicketCreateNavigation;
