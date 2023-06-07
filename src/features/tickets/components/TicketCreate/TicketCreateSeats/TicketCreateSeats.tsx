import React, { useState } from 'react';

import './TicketCreateSeats.scss';

import { Seat } from 'features/theaters/types/Seat';
import { Projection } from 'features/projections/types/Projection';

import { formatDate } from 'common/helpers/formatDate';

import Input from 'common/components/UI/Input/Input';

interface Props {
  projection: Projection;
  setSeats: (projection: Projection, seats: Seat[]) => void;
}

const TicketCreateSeats: React.FC<Props> = ({ projection, setSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [numTickets, setNumTickets] = useState<number>(1);

  const rowLength: number = Math.min(5, projection.theater.seats.length);
  const usedSeats: Seat[] | undefined = projection.tickets?.map((ticket) => ticket.seat);

  const handleTicketChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setNumTickets(Number(event.target.value));

  const handleTicketClick = (num: number): void => {
    setNumTickets(num);
    setSelectedSeats([]);
    setSeats(projection, selectedSeats);
  };

  const handleSeatClick = (seat: Seat): void => {
    const seatIndex: number = projection.theater.seats.findIndex(
      (arraySeat) => arraySeat.id === seat.id
    );
    if (seatIndex !== -1) {
      const rowIndex: number = Math.floor(seatIndex / rowLength);

      let startIndex: number = seatIndex;
      let endIndex: number = seatIndex + numTickets - 1;

      const rowEndIndex: number = (rowIndex + 1) * rowLength - 1;
      if (endIndex > rowEndIndex) {
        endIndex = rowEndIndex;
      }

      const rowStartIndex: number = rowIndex * rowLength;
      if (startIndex > rowStartIndex) {
        startIndex = endIndex - numTickets + 1;
      }

      const selectedRange: Seat[] = projection.theater.seats.slice(startIndex, endIndex + 1);
      const pickedSeats: Seat[] = selectedRange.map((seat) => seat);

      const isAnySeatUsed: boolean = pickedSeats.some((pickedSeat) =>
        usedSeats?.some(
          (usedSeat) => usedSeat.id === pickedSeat.id && usedSeat.number === pickedSeat.number
        )
      );

      if (!isAnySeatUsed) {
        setSelectedSeats(pickedSeats);
        setSeats(projection, pickedSeats);
      }
    }
  };

  const renderTickets = (): any[] => {
    const tickets: any[] = [];
    for (let i = 1; i <= rowLength; i++) {
      const ticketImage =
        i <= numTickets
          ? require('common/assets/chair-selected.png')
          : require('common/assets/chair.png');
      tickets.push(
        <img
          key={i}
          src={ticketImage}
          alt='Ticket'
          onClick={() => handleTicketClick(i)}
          className='ticket-create-seats__ticket'
        />
      );
    }
    return tickets;
  };

  const renderSeats = (): any[] => {
    const seats: Seat[] = projection.theater.seats.sort(
      (a: Seat, b: Seat) => Number(a.number) - Number(b.number)
    );
    const rows: any[] = [];
    let currentRow: any[] = [];

    seats.forEach((seat, index) => {
      const isUsed = usedSeats?.find(
        (usedSeat) => usedSeat.id === seat.id && usedSeat.number === seat.number
      );

      const isSelected: boolean = selectedSeats.includes(seat);

      const seatClassName: string = isUsed
        ? 'ticket-create-seats__seat disabled'
        : 'ticket-create-seats__seat';
      const onClickHandler = isUsed ? undefined : () => handleSeatClick(seat);

      currentRow.push(
        <img
          key={seat.id}
          src={
            isUsed
              ? require('common/assets/chair-taken.png')
              : isSelected
              ? require('common/assets/chair-selected.png')
              : require('common/assets/chair.png')
          }
          alt={`Seat ${seat.number}`}
          onClick={onClickHandler}
          className={seatClassName}
        />
      );

      if (currentRow.length === rowLength) {
        rows.push(
          <div key={index} className='ticket-create-seats__row'>
            {currentRow}
          </div>
        );
        currentRow = [];
      }
    });

    return rows;
  };

  return (
    <div className='ticket-create-seats'>
      <div className='ticket-create-seats__row'>
        <div className='ticket-create-seats__details'>
          <div className='ticket-create-seats__subtitle'>Projection</div>
          <div className='ticket-create-seats__content '>
            <span className='bold'>Movie:</span> {projection.movie?.name}
          </div>
          <div className='ticket-create-seats__content'>
            <span className='bold'>Time:</span> {formatDate(projection.time)}
          </div>
        </div>
        <div className='ticket-create-seats__picker'>
          <Input
            label='Total tickets'
            type='number'
            name={''}
            value={numTickets}
            min={1}
            max={rowLength}
            onChange={handleTicketChange}
          />
          <div className='ticket-create-seats__tickets'>{renderTickets()}</div>
        </div>
      </div>
      <div className='ticket-create-seats__theater'>
        <div className='ticket-create-seats__theater-details'>
          <div className='ticket-create-seats__theater-content'>{projection.theater.name}</div>
          <div className='ticket-create-seats__theater-content'>{formatDate(projection.time)}</div>
        </div>
        <div className='ticket-create-seats__theater-details'>
          <div className='ticket-create-seats__theater-content'>
            <img
              src={require('common/assets/chair.png')}
              alt='Available Seat'
              className='ticket-create-seats__theater-image'
            />
            <div className='ticket-create-seats__theater-content-text'>Available Seat</div>
          </div>
          <div className='ticket-create-seats__theater-content'>
            <img
              src={require('common/assets/chair-selected.png')}
              alt='Available Seat'
              className='ticket-create-seats__theater-image'
            />
            <div className='ticket-create-seats__theater-content-text'>Selected Seat</div>
          </div>
          <div className='ticket-create-seats__theater-content'>
            <img
              src={require('common/assets/chair-taken.png')}
              alt='Available Seat'
              className='ticket-create-seats__theater-image'
            />
            <div className='ticket-create-seats__theater-content-text'>Taken Seat</div>
          </div>
        </div>

        <div className='ticket-create-seats__theater-layout'>
          <div className='ticket-create-seats__screen-title'>Screen</div>
          <div className='ticket-create-seats__screen' />
          {renderSeats()}
        </div>
      </div>
    </div>
  );
};

export default TicketCreateSeats;
