import React, { useState } from 'react';
import './TicketCreateSeats.scss';
import { Projection } from 'features/projections/types/Projection';
import Input from 'common/components/UI/Input/Input';
import { formatDate } from 'common/helpers/formatDate';
import { Seat } from 'features/theaters/types/Seat';

interface Props {
  projection: Projection;
  setSeats: (projection: Projection, seats: Seat[]) => void;
}

const TicketCreateSeats: React.FC<Props> = ({ projection, setSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [numTickets, setNumTickets] = useState(1);

  const handleTicketChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setNumTickets(Number(event.target.value));

  const handleTicketClick = (num: number) => {
    setNumTickets(num);
    setSelectedSeats([]);
    setSeats(projection, selectedSeats);
  };

  const handleSeatClick = (seat: Seat) => {
    const seatIndex = projection.theater.seats.findIndex((arraySeat) => arraySeat.id === seat.id);
    if (seatIndex !== -1) {
      const seatsPerRow = 5;
      const rowIndex = Math.floor(seatIndex / seatsPerRow);

      let startIndex = seatIndex;
      let endIndex = seatIndex + numTickets - 1;

      const rowEndIndex = (rowIndex + 1) * seatsPerRow - 1;
      if (endIndex > rowEndIndex) {
        endIndex = rowEndIndex;
      }

      const rowStartIndex = rowIndex * seatsPerRow;
      if (startIndex > rowStartIndex) {
        startIndex = endIndex - numTickets + 1;
      }

      const selectedRange = projection.theater.seats.slice(startIndex, endIndex + 1);
      const pickedSeats = selectedRange.map((seat) => seat);

      setSelectedSeats(pickedSeats);
      setSeats(projection, pickedSeats);
    }
  };

  const renderTickets = () => {
    const tickets = [];
    for (let i = 1; i <= 5; i++) {
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

  const renderSeats = () => {
    const seats = projection.theater.seats;
    const rows: any = [];
    let currentRow: any = [];

    seats.forEach((seat, index) => {
      currentRow.push(
        <img
          key={seat.id}
          src={
            selectedSeats.includes(seat)
              ? require('common/assets/chair-selected.png')
              : require('common/assets/chair.png')
          }
          alt='Seat'
          onClick={() => handleSeatClick(seat)}
          className='ticket-create-seats__seat'
        />
      );

      if (currentRow.length === 5 || index === seats.length - 1) {
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
            max={5}
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
