import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { getProductBySlug } from '../../actions'

export default function ProductListPage(props) {

  const dispatch = useDispatch()
  
  useEffect(() => {
    const {match} = props
   dispatch(getProductBySlug(match.params.slug))
  },[])

  return (
    <div>ProductListPage</div>
  )
}
