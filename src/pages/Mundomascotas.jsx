import { Box, Heading, Text, Container, background } from "@chakra-ui/react"
import perros from '../assets/imagenes/perros.png'
import React, { useState } from 'react';
import { Input, Select, Button } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useMediaQuery } from "@chakra-ui/react";
import peluqueriamujer from '../assets/imagenes/peluqueriamujer.jpeg'
import maquillandomujer from '../assets/imagenes/maquillandomujer.jpeg'
import spamujer from '../assets/imagenes/spamujer.jpeg'
import { BusquedaMundos } from "../components/BusquedaMundos";


 


const StyledDatePicker = styled(DatePicker)`
background: white;
width: auto;
height: 70px;
border: 1px solid black; /* Agrega el borde sólido negro */
display: flex; /* Asegúrate de que el contenido se alinee correctamente */
align-items: center; /* Centra verticalmente el contenido */
padding: 0 10px; /* Añade un espacio interno para el contenido */
border-radius: 0px 10px 10px 0px;

@media (max-width: 768px) {
  width:555px; 
  height: 50px;
  border-radius:20px
`;

export const Mundomascotas = () => {

  const [isSmallerThan760] = useMediaQuery('(max-width: 768px)');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    // Aquí puedes realizar cualquier acción necesaria con la fecha seleccionada
    setSelectedDate(date);
  }
  
  const [estilistasSeleccionados, setEstilistasSeleccionados] = useState([]);

  // Función para agregar estilista seleccionado por el administrador
  const handleEstilistaSeleccionado = (estilista) => {
    setEstilistasSeleccionados((prevEstilistas) => [...prevEstilistas, estilista]);
  };

  

  
  return(

     <>
       <Box>
          <Box bg={`url(${perros})`}   backgroundPosition='center'  position='relative' height='500px' justifyContent='center' width='100%' backgroundRepeat='no-repeat' backgroundSize='cover'>
          <Box position='absolute' top='0' right='0' bottom='0' left='0' bg='rgba(0, 0, 0, 0.7)'></Box>
            

              <Box display='flex' justifyContent='center' alignItems='center' height='300px'>
                <Box position='relative'>
                  <Heading textAlign='center' color='white' fontSize={isSmallerThan760 ? '50px' : '60px'} ><b>Mundo mascotas</b></Heading>
                  <a href='/'><Text position='relative' textAlign='center' fontSize={isSmallerThan760 ? '40px' : '40px'} color='#caa776' fontFamily='Tangerine, cursive'>inicio</Text></a>
               </Box>
              </Box>

              <Box height='100px' padding={isSmallerThan760 ? '30px' : '0px'} display={isSmallerThan760 ? 'none' : ''} >
                <BusquedaMundos /> {/* Renderiza el componente YourComponent */}
             </Box>
          </Box>
          
          <Box height='100px' padding={isSmallerThan760 ? '30px' : '0px'} display={isSmallerThan760 ? '' : 'none'} >
                <BusquedaMundos /> {/* Renderiza el componente YourComponent */}
             </Box>
          
            <Box width='100wh' display='flex'  flexWrap='wrap' gap='30px' justifyContent='center' marginTop={isSmallerThan760 ? '400px' : '150'} >
              <Box bg={`url(${spamujer})`} backgroundSize='cover'  borderRadius='20px'  backgroundPosition='center'  width={isSmallerThan760 ? '500px' : '500px'} height={isSmallerThan760 ? '300px' : '400px'} ></Box>
              <Box bg={`url(${maquillandomujer})`} backgroundSize='cover' borderRadius='20px'  backgroundPosition='center'  width={isSmallerThan760 ? '500px' : '300px'} height={isSmallerThan760 ? '300px' : '400px'} ></Box>
              <Box bg={`url(${peluqueriamujer})`} backgroundSize='cover' borderRadius='20px'  backgroundPosition='center'  width={isSmallerThan760 ? '500px' : '400px'} height={isSmallerThan760 ? '300px' : '400px'} ></Box>
            </Box>
          
          <Box>
            <Box marginTop={isSmallerThan760 ? '90px' : '100px'}>
              <Heading fontFamily="Tangerine, cursive"  textAlign='center'><b>Our Inspiration, Your Experience Matters</b></Heading>
              <Text fontFamily="Tangerine, cursive"  textAlign='center' margin='0px 30px 30px 'fontSize={isSmallerThan760 ? '30px' : '30px'}>Los clientes son el corazón de cualquier empresa, su apoyo constante impulsa el crecimiento y la prosperidad.
                 Su retroalimentación valiosa guía nuestras decisiones y nos motiva a ofrecer productos y servicios excepcionales. 
                 En la relación cliente-empresa, la satisfacción del cliente es la clave de nuestro éxito compartido.</Text>
            </Box>
          </Box>

          {/*seccion para los especilistas destacados fata añadir el codigo para llamarlos */}
          <Box height='500px'marginTop='100px' >
            <Heading color='#D4AF37' fontSize='19px' fontFamily='wrap' textAlign='center'>Estos son nuestros</Heading>
            <Text fontSize='22px' textAlign='center'><b>Especilistas Destacados</b></Text>
            <Text fontSize='10px' textAlign='center'><b>los especilaistas destacados podras verlos aqui</b></Text>
           {/* Sección de estilistas seleccionados */}
            {estilistasSeleccionados.length > 0 && (
             <Box> 
            <EstilistasSeleccionados estilistas={estilistasSeleccionados} />
            </Box>
             )}
             </Box>
       </Box>
     </>
 
 )

}
