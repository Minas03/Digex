import React, {useEffect, useState } from 'react'
import { Image, Grid, GridItem, Container, useDisclosure, Button } from '@chakra-ui/react'
import Categories from './Categories'


const App = () => {
  const [data, setData] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [category, setCategory] = useState()
  
  const fetchImages = async () => await fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1',
).then(res => res.json().then(data => setData(data)))



const categorySelect = async () => await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=${category}`).then(res => res.json()).then(data => setData(data))

  const handleClick = (category) => {
    setCategory(category?.id)
    onClose()
    }
  

   useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    categorySelect()
  }, [category])

  return (
 
    <Container maxW="7xl" mt="10">
      <Categories 
      handleClick={handleClick} 
      isOpen={isOpen} 
      onOpen={onOpen} 
      onClose={onClose}
      category={category}
      setCategory={setCategory}
     />
      <Grid templateColumns={{sm:'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={6}>
     {data?.map((item) => (
      <GridItem  key={item.id} m="2">
        <Image  w="full" height="300px" src ={item.url}/>
       </GridItem>
    ))}
    </Grid>
    </Container>
   
  )
}

export default App