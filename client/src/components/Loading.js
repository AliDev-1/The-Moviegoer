import React from 'react'
import styled from 'styled-components'
import {RiMovie2Line} from 'react-icons/ri'

const Loading = () => {
  return (
      <LoaderIconPosition>
        <LoaderIcon />
    </LoaderIconPosition>
  )
}

const LoaderIconPosition = styled.div`
    height: 90vh;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const LoaderIcon = styled(RiMovie2Line)`
  color: #fec11b;
  animation: spin 0.6s linear infinite;
  font-size: 9rem;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loading