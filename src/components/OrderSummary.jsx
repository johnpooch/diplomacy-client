import React from 'react';
import styled from '@emotion/styled';

const StyledP = styled.p`
  .aux,
  .piece,
  .source,
  .target {
    text-transform: capitalize;
    font-weight: bold;
  }

  .action {
    font-style: italic;
  }

  span:not(:last-of-type):after {
    content: ' ';
  }
`;

const OrderSummary = (props) => {
  const { order } = props;
  const { aux, source, target, type, piece_type: pieceType } = order;

  let orderSummary = null;

  if (type === 'build') {
    orderSummary = (
      <StyledP>
        <span className="action">{type}</span>
        <span className="piece">{pieceType}</span>
        in <span className="source">{source.name}</span>
      </StyledP>
    );
  }

  switch (type) {
    case 'hold':
      orderSummary = (
        <StyledP>
          <span className="piece">{source.piece.type}</span>
          in <span className="source">{source.name}</span>
          to <span className="action">{type}</span>
        </StyledP>
      );
      break;

    case 'move':
    case 'retreat':
      orderSummary = (
        <StyledP>
          <span className="piece">{source.piece.type}</span>
          in <span className="source">{source.name}</span>
          to <span className="action">{type}</span>
          to <span className="target">{target.name}</span>
        </StyledP>
      );
      break;

    case 'convoy':
    case 'support':
      orderSummary = (
        <StyledP>
          <span className="piece">{source.piece.type}</span>
          in <span className="source">{source.name}</span>
          to <span className="action">{type}</span>
          <span className="aux">{aux.name}</span>
          to <span className="target">{target.name}</span>
        </StyledP>
      );
      break;
    default:
      break;
  }
  return orderSummary;
};

export default OrderSummary;
