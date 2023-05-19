import React from 'react';
import TicketCreateMovie from '../components/TicketCreate/TicketCreateMovie/TicketCreateMovie';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import { ticketInit, ticketProjection, ticketSeats } from '../state/ticketActions';
import { Movie } from 'features/movies/types/Movie';
import { Projection } from 'features/projections/types/Projection';
import { Seat } from 'features/theaters/types/Seat';

interface Props {
  movie: Movie | null | undefined;
  projections: Projection[] | undefined;
  pickedProjection: Projection | undefined | null;
  seats: Seat[] | undefined;
  pickedSeats: Seat[] | undefined | null;
  onTicketInit: (movie: Movie) => void;
  onTicketProjection: (movie: Movie, projection: Projection) => void;
  onTicketSeats: (movie: Movie, projection: Projection, seats: Seat[]) => void;
}

const TicketCreateContainer: React.FC<Props> = ({
  movie,
  projections,
  pickedProjection,
  seats,
  pickedSeats,
  onTicketInit,
  onTicketProjection,
  onTicketSeats,
}) => {
  return <>{movie && <TicketCreateMovie movie={movie} />}</>;
};

const mapStateToProps = (state: StoreState) => ({
  movie: state.tickets.createTicket?.movie,
  projections: state.tickets.createTicket?.movie?.projections,
  pickedProjection: state.tickets.createTicket?.projection,
  seats: state.tickets.createTicket?.projection?.theater.seats,
  pickedSeats: state.tickets.createTicket?.seats,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onTicketInit: (movie: Movie) => dispatch(ticketInit(movie)),
  onTicketProjection: (movie: Movie, projection: Projection) =>
    dispatch(ticketProjection(movie, projection)),
  onTicketSeats: (movie: Movie, projection: Projection, seats: Seat[]) =>
    dispatch(ticketSeats(movie, projection, seats)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketCreateContainer);
