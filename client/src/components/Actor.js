import React, { useState } from 'react'
import { useHiistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useGetActorDetailsQuery } from '../services/TMDB'

const Actor = () => {
  const { id } = useParams()

  const { data, error, isFetching } = useGetActorDetailsQuery(id)
  

  console.log(data)

  return (
    <div>Actors</div>
  )
}

export default Actor