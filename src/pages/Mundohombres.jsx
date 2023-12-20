import { Box, Heading, Text, Container, background } from "@chakra-ui/react"
import barbero1 from '../assets/imagenes/barbero1.jpg'
import React, { useState } from 'react';
import { Input, Select, Button } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useMediaQuery } from "@chakra-ui/react";
import afeitar from '../assets/imagenes/afeitar.jpeg'
import mascarillahombre from '../assets/imagenes/mascarillahombre.jpeg'
import peluqueriahombre from '../assets/imagenes/peluqueriahombre.jpeg'


const StyledDatePicker = styled(DatePicker)`
  background: white;
  width: auto;
  height: 40px
  
`;

export const Mundohombres = () => {

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

  const mockPeluqueros = [
    { id: 1, nombre: 'Peluquero 1', servicio: 'servicio1', mundo: 'mundo1', distrito: 'distrito1' },
    { id: 2, nombre: 'Peluquero 2', servicio: 'servicio2', mundo: 'mundo2', distrito: 'distrito2' },
    { id: 3, nombre: 'Peluquero 3', servicio: 'servicio1', mundo: 'mundo3', distrito: 'distrito3' },
    // Agrega más datos según sea necesario
  ];
  
  const YourComponent = () => {
    const [searchParams, setSearchParams] = useState({
      servicio: '',
      mundo: '',
      distrito: '',
    });
  
    const [peluquerosResult, setPeluquerosResult] = useState([]);
  
    const handleInputChange = (field, value) => {
      setSearchParams((prevParams) => ({
        ...prevParams,
        [field]: value,
      }));
    };
  
    const handleSearchClick = () => {
      // Simulación de búsqueda de peluqueros
      const results = mockPeluqueros.filter((peluquero) => {
        return (
          (!searchParams.servicio || peluquero.servicio === searchParams.servicio) &&
          (!searchParams.Tipodeservicio || peluquero.Tipodeservicio === searchParams.Tipodeservicio) &&
          (!searchParams.fecha || peluquero.fecha=== searchParams.fecha)
        );
      });
  
      // Actualiza el estado con los resultados de la búsqueda
      setPeluquerosResult(results);
    };
    return (
      <Box  display='flex' justifyContent='center' marginTop='60px'>
        
        <Box width='800px'   justifyContent='center' gap='20px' padding='10px'>
          
          
          <Select
            background='white' width='auto'
            height={isSmallerThan760 ? '18px' : '70px'}
            placeholder='Selecciona Servicio'
            border='1px solid black'
            marginBottom={isSmallerThan760 ? '10px' : '30px'} 
            value={searchParams.servicio}
            onChange={(e) => handleInputChange('servicio', e.target.value)}
          >
            {/* Opciones para Servicio 1 */}
            {/* Puedes agregar opciones dinámicamente según tus necesidades */}
            <option value='servicio1'>peluqueria</option>
            <option value='servicio2'>barberia</option>
            <option value='servicio3'>manicure</option>
          </Select>
  
          <Select background='white' width='auto'
           border='1px solid black'
           height={isSmallerThan760 ? '18px' : '70px'}
           marginBottom={isSmallerThan760 ? '10px' : '30px'}
            placeholder='Tipodeservicio'
            value={searchParams.mundo}
            onChange={(e) => handleInputChange('mundo', e.target.value)}

          ><option value='Tipodeservicio'>dimicilio</option>
          <option value='Tipodeservicio'>tienda</option>
  
          </Select>
  
          

           
          <StyledDatePicker
         selected={selectedDate}
         onChange={handleDateChange}
         placeholderText="Selecciona una fecha"
         />

           

           <a href='ListaE'><Button
           display='flex'
           justifyContent='center'
           bg={isSmallerThan760 ? '#fc3c3c' : 'white'} 
           width={isSmallerThan760 ? '30%' : '300px'}
           marginLeft={isSmallerThan760 ? '30px' : '0px'}
           marginTop={isSmallerThan760 ? '10px' : '30px'}
           border='1px solid black'
           
           /*mirar onClick={handleSearchClick}*/
           >
           Buscar 
           </Button></a>
         </Box>
  
        
        
  
        {/* Resultados de la búsqueda */}
        {peluquerosResult.length > 0 && (
          <Box marginTop='20px'>
            <Heading fontSize='20px'>Resultados de la búsqueda</Heading>
            {/* Muestra los datos de los peluqueros encontrados */}
            {peluquerosResult.map((peluquero) => (
              <Box key={peluquero.id} marginTop='10px'>
                <p>{peluquero.nombre}</p>
                {/* Puedes mostrar más información del peluquero según tus necesidades */}
              </Box>
            ))}
          </Box>
        )}

      </Box>
      

    );
  };

  
  return(

     <>
       <Box>
          <Box bg={`url(${barbero1})`}   backgroundPosition='center'  position='relative' height='400px' justifyContent='center' width='100%' backgroundRepeat='no-repeat' backgroundSize='cover'>
          <Box position='absolute' top='0' right='0' bottom='0' left='0' bg='rgba(0, 0, 0, 0.7)'></Box>
            <Box  position='relative' display='flex' paddingTop='40px' gap={isSmallerThan760 ? '3px' : '30px'}  paddingLeft={isSmallerThan760 ? '2px' : '0px'}  justifyContent='center' >
              <Box width='150px'><a href='Mundohombres'><Heading fontSize={isSmallerThan760 ? '18px' : 'xl'} color='white' fontFamily='wraper' textAlign='center'  >Mundo hombres</Heading></a></Box>
              <Box width='140px'><a href='Mundomujeres'><Heading fontSize={isSmallerThan760 ? '18px' : 'xl'} color='white' fontFamily='wraper' textAlign='center'  >Mundo mujeres</Heading></a></Box>
              <Box width='150px'><a href='Mundomascotas'><Heading fontSize={isSmallerThan760 ? '18px' : 'xl'} color='white' fontFamily='wraper' textAlign='center' >Mundo mascotas</Heading></a></Box>
              </Box>
              <Box position='relative' borderBottom={isSmallerThan760 ? '0px' : '0.1px solid white'} marginTop={isSmallerThan760 ? '0px' : '25px'}  width='100%'></Box>

              <Box display='flex' justifyContent='center' alignItems='center' height='300px'>
                <Box position='relative'>
                  <Heading textAlign='center' color='white'><b>Mundo hombres</b></Heading>
                  <a href='/'><Text position='relative' textAlign='center' fontSize={isSmallerThan760 ? '40px' : '40px'} color='#fc3c3c' fontFamily='Tangerine, cursive'>inicio</Text></a>
               </Box>
              </Box>

          </Box>
          <Box height='200px' padding={isSmallerThan760 ? '30px' : '0px'}>
          <YourComponent /> {/* Renderiza el componente YourComponent */}
          </Box>

          
            <Box width='100wh' display='flex'  flexWrap='wrap' gap='30px' justifyContent='center' marginTop={isSmallerThan760 ? '400px' : '200px'} >
              <Box bg={`url(${afeitar})`} backgroundSize='cover'  borderRadius='20px'  backgroundPosition='center'  width={isSmallerThan760 ? '500px' : '500px'} height={isSmallerThan760 ? '300px' : '400px'} ></Box>
              <Box bg={`url(${mascarillahombre})`} backgroundSize='cover' borderRadius='20px'  backgroundPosition='center'  width={isSmallerThan760 ? '500px' : '300px'} height={isSmallerThan760 ? '300px' : '400px'} ></Box>
              <Box bg={`url(${peluqueriahombre})`} backgroundSize='cover' borderRadius='20px'  backgroundPosition='center'  width={isSmallerThan760 ? '500px' : '400px'} height={isSmallerThan760 ? '300px' : '400px'} ></Box>
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
