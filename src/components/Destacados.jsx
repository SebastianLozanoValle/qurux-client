import { useQuery } from "@apollo/client";
import { TarjetaSpecialista } from "./TarjetaSpecialista";
import { useState, useEffect, useRef, createRef, useMemo } from 'react';
import { RiArrowLeftCircleLine, RiArrowRightCircleLine } from "react-icons/ri";
import es from "dayjs/locale/es";
import { FIND_SPECIALISTS } from "../querys/querys";

export const Destacados = ({ paramsToSearch, destacados = true }) => {
    const { loading, error, data } = useQuery(FIND_SPECIALISTS);

    const [especialistasSinServciosActivos, setEspecialistasSinServciosActivos] = useState(0);

    console.log('parametros en destacados', paramsToSearch, 'destacados', destacados);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const getDayOfWeek = (date) => {
        const dayNumber = new Date(date).getDay();
        return daysOfWeek[dayNumber];
    }

    const especialistas = useMemo(() => {
        let filtrado = [];
        if (paramsToSearch != {}) {
            if (destacados !== true) {
                filtrado = data?.findSpecialists || [];
                if (paramsToSearch.mundo ? paramsToSearch.mundo != '' : false) {
                    filtrado = filtrado.filter(especialista => especialista.world.includes(paramsToSearch.mundo)) || [];
                }
                if (paramsToSearch.distrito != '') {
                    filtrado = filtrado.filter(especialista => especialista.city === paramsToSearch.distrito) || [];
                }
                if (paramsToSearch.servicios?.length > 0) {
                    filtrado = filtrado.filter(especialista => especialista.specialtys.some(specialty => paramsToSearch.servicios.includes(specialty.name))) || [];
                }
                if (paramsToSearch.tipoServicio != '') {
                    filtrado = filtrado.filter(especialista => (especialista.serviceType === paramsToSearch.tipoServicio) || paramsToSearch == "Mixto" || especialista.serviceType == "Mixto") || [];
                }
                if (paramsToSearch.fecha != '') {
                    const dayOfWeek = getDayOfWeek(paramsToSearch.fecha);
                    console.log('dayOfWeek', dayOfWeek);
                    filtrado = filtrado.filter(especialista => {
                        console.log(especialista.weeklySchedule[dayOfWeek].length ? 'Disponible' : 'No disponible');
                        return especialista.weeklySchedule[dayOfWeek].length
                    }) || [];
                }
            } else if (destacados === true) {
                filtrado = data?.findSpecialists.filter(especialista => especialista.highlighted) || [];
                if (paramsToSearch && paramsToSearch.mundo != '') {
                    filtrado = filtrado.filter(especialista => especialista.world.includes(paramsToSearch.mundo)) || [];
                }
            }
            filtrado = filtrado.filter(especialista => especialista.active === true) || [];
        }

        return filtrado;


    }, [data, destacados, paramsToSearch]);
    const [activeSpecialist, setActiveSpecialist] = useState(especialistas[0]);
    const specialistsBox = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [specialistsRefs, setSpecialistsRefs] = useState({});

    useEffect(() => {
        if (especialistas.length > 0) {
            const refs = especialistas.reduce((acc, value, index) => {
                acc[index] = createRef();
                return acc;
            }, {});
            setSpecialistsRefs(refs);
        }
    }, [especialistas]);

    const handleIcons = (scrollVal) => {
        let maxScrollableWidth = specialistsBox.current.scrollWidth - specialistsBox.current.clientWidth;
        // Aquí puedes manejar la visibilidad de tus iconos de flecha
    }

    const dragging = (e) => {
        if (!isDragging) return;
        specialistsBox.current.scrollLeft -= e.movementX;
        handleIcons(specialistsBox.current.scrollLeft)
    }

    const dragStop = () => {
        setIsDragging(false);
    }

    const scrollSpecialists = (direction) => {
        const currentIndex = especialistas.indexOf(activeSpecialist);
        if (direction === 'left' && currentIndex > 0) {
            setActiveSpecialist(especialistas[currentIndex - 1]);
        } else if (direction === 'right' && currentIndex < especialistas.length - (1 + especialistasSinServciosActivos)) {
            setActiveSpecialist(especialistas[currentIndex + 1]);
        }
    }

    useEffect(() => {
        const box = specialistsBox.current;
        if (box) {
            box.addEventListener("mousedown", () => setIsDragging(true));
            box.addEventListener("mousemove", dragging);
            document.addEventListener("mouseup", dragStop);

            return () => {
                box.removeEventListener("mousedown", () => setIsDragging(true));
                box.removeEventListener("mousemove", dragging);
                document.removeEventListener("mouseup", dragStop);
            }
        }
    }, [isDragging]);

    useEffect(() => {
        const index = especialistas.indexOf(activeSpecialist);
        if (index !== -1 && specialistsRefs[index]) {
            specialistsRefs[index].current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [activeSpecialist, specialistsRefs]);

    useEffect(() => {
        // console.log(especialistasSinServciosActivos)
        if (especialistasSinServciosActivos == 0) {
            const especialistasSinServicios = especialistas.length > 0 ?
                especialistas.filter(especialista =>
                    especialista.specialtys.every(specialty => specialty.state === false)
                ).length : 0;
            // console.log(especialistasSinServicios)
            setEspecialistasSinServciosActivos(especialistasSinServciosActivos + especialistasSinServicios);
        }

        console.log(destacados, especialistas)
        // else {
        //     console.log('nunca ejecuta')
        // }
    }, [especialistas]);

    // useEffect(() => {
    //     console.log(especialistasSinServciosActivos)
    // }, [especialistasSinServciosActivos]);

    return especialistas.length > 0 ? (
        <div className="flex rounded-xl bg-transparent my-8">
            <button className='p-2 text-xl text-slate-700 bg-transparent' onClick={() => scrollSpecialists('left')}><RiArrowLeftCircleLine /></button>
            <div className="flex overflow-x-auto" ref={specialistsBox}>
                {especialistas.map((especialista, index) => {
                    return especialista.specialtys.filter(specialty => specialty.state === true).length > 0 && (
                        <div
                            key={especialista.id}
                            ref={specialistsRefs[index]}
                            className={`p-4 w-auto transition-all duration-500 ${activeSpecialist === especialista ? 'bg-[#d3983f] text-[#d3983f] rounded-3xl scale-100' : 'bg-white text-black border rounded-3xl scale-75'}`}
                            onClick={() => setActiveSpecialist(especialista)}
                        >
                            <TarjetaSpecialista especialista={especialista} paramsToSearch={paramsToSearch ? paramsToSearch.servicios: 'hu%fdas'} />
                        </div>
                    )
                })}
            </div>
            <button className='p-2 text-xl text-slate-700 bg-transparent' onClick={() => scrollSpecialists('right')}><RiArrowRightCircleLine /></button>
        </div>
    ) : !destacados ? (
        <div className="flex justify-center items-center h-96">
            <p className="text-3xl font-bold text-gray-700">Selecciona los filtros de busqueda de tu preferencia</p>
        </div>
    ) : (
        <div className="flex justify-center items-center h-96">
            <p className="text-3xl font-bold text-gray-700">No se encontraron especialistas</p>
        </div>
    )
}