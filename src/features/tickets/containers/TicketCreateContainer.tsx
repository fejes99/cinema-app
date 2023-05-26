import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import { createTicket, ticketProjection, ticketSeats } from '../state/ticketActions';
import { Movie } from 'features/movies/types/Movie';
import { Projection } from 'features/projections/types/Projection';
import { Seat } from 'features/theaters/types/Seat';
import { fetchProjection } from 'features/projections/state/projectionActions';
import TicketCreateMovie from '../components/TicketCreate/TicketCreateMovie/TicketCreateMovie';
import TicketCreateNavigation from '../components/TicketCreate/TicketCreateNavigation/TicketCreateNavigation';
import TicketCreateSeats from '../components/TicketCreate/TicketCreateSeats/TicketCreateSeats';
import TicketCreateDetails from '../components/TicketCreate/TicketCreateDetails/TicketCreateDetails';
import { useProjectionRedirect } from 'features/projections/hooks/projectionRedirects';
import { TicketCreateDto } from '../types/TicketCreateDto';
import { User } from 'features/auth/types/User';

interface Props {
  user: User | null;
  movie: Movie | null | undefined;
  pickedProjection: Projection | undefined | null;
  fetchedProjection: Projection | null;
  loading: boolean;
  pickedSeats: Seat[] | undefined | null;
  onFetchProjection: (projectionId: string) => void;
  onTicketProjection: (movie: Movie, projection: Projection) => void;
  onTicketSeats: (movie: Movie, projection: Projection, seats: Seat[]) => void;
  onCreateTicket: (ticketCreateDto: TicketCreateDto) => void;
}

const TicketCreateContainer: React.FC<Props> = ({
  user,
  movie,
  pickedProjection,
  fetchedProjection,
  loading,
  pickedSeats,
  onFetchProjection,
  onTicketProjection,
  onTicketSeats,
  onCreateTicket,
}) => {
  const [step, setStep] = useState(1);
  const [isEmptySeats, setIsEmptySeats] = useState(
    pickedSeats === null || pickedSeats!.length === 0
  );

  const { redirectToProjectionList } = useProjectionRedirect();

  useEffect(() => {
    setIsEmptySeats(pickedSeats === null || pickedSeats!.length === 0);
  }, [pickedSeats]);

  const handleProjectionSelect = (projection: Projection) => {
    pickedProjection && onFetchProjection(pickedProjection.id);
    onTicketProjection(movie!, projection);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleBuyTickets = () => {
    redirectToProjectionList();

    pickedSeats?.map((seat) =>
      onCreateTicket({ userId: user!?.id, seatId: seat!.id, projectionId: pickedProjection!.id })
    );
  };

  return (
    <>
      <TicketCreateNavigation
        title={step === 1 ? 'Projections' : step === 2 ? 'Seats' : 'Details'}
        backTitle={step === 1 ? 'Back' : step === 2 ? 'Projections' : 'Seats'}
        backDisabled={step === 1}
        onBack={handleBack}
        nextTitle={
          step === 1
            ? 'Seats'
            : step === 2
            ? 'Details'
            : pickedSeats?.length === 1
            ? 'Buy Ticket'
            : 'Buy Tickets'
        }
        nextDisabled={
          (step === 1 && !pickedProjection) || (step === 2 && (!fetchedProjection || isEmptySeats))
        }
        onNext={step === 3 ? handleBuyTickets : handleNext}
      />
      {step === 1 && movie && (
        <TicketCreateMovie movie={movie} selectProjection={handleProjectionSelect} />
      )}
      {step === 2 && fetchedProjection && (
        <TicketCreateSeats projection={fetchedProjection} setSeats={onTicketSeats} />
      )}
      {step === 3 && pickedProjection && pickedSeats && (
        <TicketCreateDetails projection={pickedProjection} seats={pickedSeats} />
      )}
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.auth.loggedUser,
  movie: state.tickets.createTicket?.movie,
  pickedProjection: state.tickets.createTicket?.projection,
  fetchedProjection: state.projections.selectedProjection,
  loading: state.projections.loading,
  pickedSeats: state.tickets.createTicket?.seats,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onTicketProjection: (movie: Movie, projection: Projection) =>
    dispatch(ticketProjection(movie, projection)),
  onTicketSeats: (movie: Movie, projection: Projection, seats: Seat[]) =>
    dispatch(ticketSeats(movie, projection, seats)),
  onFetchProjection: (projectionId: string) => dispatch(fetchProjection(projectionId)),
  onCreateTicket: (ticketCreateDto: TicketCreateDto) => dispatch(createTicket(ticketCreateDto)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketCreateContainer);
