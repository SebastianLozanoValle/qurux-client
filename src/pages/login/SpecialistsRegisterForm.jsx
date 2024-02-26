import { useState, useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { cities } from '../../data/cities';
import logo from '../../assets/imagenes/logo.png'
import { InputFormField } from '../../components/InputFormField';
import { Link } from 'react-router-dom';
import { CREATE_SPECIALIST } from '../../querys/querys';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import InputDropZone from '../../components/InputDropZone';
import { StepOne } from './steps/StepOne';
import { ServiciosHombres, ServiciosMascotas, ServiciosMujeres } from '../../data/services';
import { v4 as uuidv4 } from 'uuid';

export const SpecialistsRegisterForm = () => {
    const inputDropZoneRef = useRef();
    const navigate = useNavigate();
    const [createSpecialist, { data, loading, error }] = useMutation(CREATE_SPECIALIST);
    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm();
    const [step, setStep] = useState(1); // Nuevo estado para el paso actual
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [registerId, setRegisterId] = useState('1');
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const fieldArrayOperations = daysOfWeek.reduce((acc, day) => {
        acc[day] = useFieldArray({
            control,
            name: `weeklySchedule.${day}`
        });
        return acc;
    }, {});

    useEffect(() => {
        if (registerId !== '1') {
            if (inputDropZoneRef.current) {
                if (inputDropZoneRef.current.uploadFiles()) {
                    navigate('/login');
                }
            }
        }
    }, [registerId]);

    const [selectedWorlds, setSelectedWorlds] = useState({
        Hombre: false,
        Mujer: false,
        Mascota: false
    });

    const worlds = ["Hombre", "Mujer", "Mascota"];

    // Función para manejar el cambio de los checkboxes de especialidad
    const handleServiceChange = (event) => {
        const { value, checked } = event.target;

        // Actualiza el estado de las especialidades seleccionadas
        if (checked) {
            setSelectedServices(prevServices => [...prevServices, value]);
        } else {
            setSelectedServices(prevServices => prevServices.filter(service => service !== value));
        }
    };

    // ...

    // Añade el manejador de cambio a los checkboxes de especialidad
    {
        services.map(service => (
            <div key={service + uuidv4()}>
                <input type="checkbox" value={service} {...register("services")} onChange={handleServiceChange} />
                <label htmlFor={service}>{service}</label>
            </div>
        ))
    }

    // Función para manejar el cambio de los checkboxes
    const handleWorldChange = (event) => {
        const { name, checked } = event.target;

        // Actualiza el estado de los checkboxes seleccionados
        setSelectedWorlds(prevState => ({ ...prevState, [name]: checked }));

        // Muestra los servicios correspondientes
        if (checked) {
            switch (name) {
                case "Hombre":
                    setServices(prevServices => [...prevServices, ...ServiciosHombres]);
                    break;
                case "Mujer":
                    setServices(prevServices => [...prevServices, ...ServiciosMujeres]);
                    break;
                case "Mascota":
                    setServices(prevServices => [...prevServices, ...ServiciosMascotas]);
                    break;
                default:
                    break;
            }
        } else {
            switch (name) {
                case "Hombre":
                    setServices(prevServices => prevServices.filter(service => !ServiciosHombres.includes(service)));
                    break;
                case "Mujer":
                    setServices(prevServices => prevServices.filter(service => !ServiciosMujeres.includes(service)));
                    break;
                case "Mascota":
                    setServices(prevServices => prevServices.filter(service => !ServiciosMascotas.includes(service)));
                    break;
                default:
                    break;
            }
        }
    };

    const onSubmit = async (data) => {
        try {
            const { confirmpassword, age, ...formData } = data;

            // Convierte age a un número
            const ageAsNumber = parseInt(age, 10);

            // Convierte el objeto worlds a un array de strings
            const worldsAsArray = Object.keys(selectedWorlds).filter(selectedWorld => selectedWorlds[selectedWorld]);

            delete formData.confirmpassword
            delete formData.services
            delete formData.worlds

            const input = {
                ...formData,
                age: ageAsNumber,
                specialtys: selectedServices,
                world: worldsAsArray,
                // weeklySchedule: fieldArrayOperations,
                active: false,
                highlighted: false
            }

            console.log(input);
            const response = await createSpecialist({ variables: { input: input } });
            console.log(response);
            if (response.data.createSpecialist.id) {
                // navigate('/login');
                console.log(response.data.createSpecialist.id);
                setRegisterId(response.data.createSpecialist.id)
                // Inicia la subida de archivos
                // if (inputDropZoneRef.current) {
                //     inputDropZoneRef.current.uploadFiles();
                // } else {
                //     console.log('No se pudo iniciar la subida de archivos');
                // }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setValue("role", "specialist");
    }, [setValue]);

    // Función para avanzar al siguiente paso
    const nextStep = () => {
        if (step < 5) {
            setStep(prevStep => prevStep + 1);
        }
    };

    // Función para retroceder al paso anterior
    const prevStep = () => {
        if (step > 1) {
            setStep(prevStep => prevStep - 1);
        }
    };

    return (
        <div className="p-10 min-h-[100vh] flex items-center justify-center">
            <div className="bg-white shadow-lg overflow-hidden rounded-xl w-full sm:w-full md:w-[70%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] min-h-[90vh] mx-auto">
                <div className="flex flex-col sm:flex-row sm:gap-4 items-center min-h-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="xl:w-[50%] xs:w-full sm:w-full px-8 py-10 flex flex-col gap-4 min-h-[90vh] justify-between">
                        {/* ... */}

                        <div>
                            <Link to='/' className="text-2xl text-[#caa776]">Qurux</Link>

                            <p className="text-[12px] text-gray-600">
                                Suministre los datos requeridos para registrarse.
                            </p>
                            <p className="text-[12px] text-gray-600">
                                Sus datos seran verificados tras su registro para habilitar su perfil.
                            </p>
                        </div>
                        <div>
                            {step === 1 && (
                                <StepOne cities={cities} errors={errors} register={register} setValue={setValue} />
                            )}
                            {step === 2 && (
                                <div className='flex flex-col gap-4'>
                                    <label htmlFor="serviceType" className="font-light">Tipo de servicio</label>
                                    <select {...register("serviceType")} className="p-2 border rounded">
                                        <option value="Domicilio">Domicilio</option>
                                        <option value="Local">Local</option>
                                        <option value="Mixto">Mixto</option>
                                    </select>
                                    <p className='text-[#ccc] font-extralight text-sm'>
                                        Como especialista de Qurux puedes ofrecer tus servicios en tu local o asistir al domicilio de tus clientes si lo prefieres y ellos tambien.
                                    </p>
                                    <label htmlFor="accountNumber" className="font-light">Cuenta para Pagos y/o Depositos</label>
                                    <InputFormField register={register} label="Numero de Cuenta" id="accountNumber" placeholder="Numero de Cuenta" type='number' errors={errors} />
                                    <p className='text-[#ccc] font-extralight text-sm'>
                                        Tu dinero esta seguro con nosotros, ingresa el numero de cuenta al cual se depositara semanalmente la suma generada en sus servicios.
                                    </p>
                                </div>
                            )}
                            {step === 3 && (
                                <div className='flex flex-col gap-4'>
                                    <label htmlFor="world" className="font-light">Mundo</label>
                                    <div className='flex gap-4'>
                                        {worlds.map(world => (
                                            <label className='flex gap-2' htmlFor={world} key={world}>
                                                <input id={world} type="checkbox" name={world} checked={selectedWorlds[world]} onChange={handleWorldChange} />{world}
                                            </label>
                                        ))}
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <fieldset className='overflow-y-scroll h-[200px] w-full sm:w-1/2'>
                                            <legend className='text-primary font-semibold'>Servicios</legend>
                                            {services.map(service => (
                                                <div key={service + uuidv4()}>
                                                    <label htmlFor={service}>
                                                        <input id={service} type="checkbox" value={service} checked={selectedServices.includes(service)} onChange={handleServiceChange} />{service}
                                                    </label>
                                                </div>
                                            ))}
                                        </fieldset>
                                        <div className='overflow-y-scroll h-[200px] w-full sm:w-1/2'>
                                            <legend className='text-primary font-semibold'>Seleccionados</legend>
                                            {selectedServices.map(service => (
                                                <p key={service + uuidv4()}>{service}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {step === 4 && (
                                <div className='h-full overflow-y-scroll'>
                                    <label htmlFor="weeklySchedule" className="font-light">Horario semanal</label>
                                    {daysOfWeek.map((day, index) => (
                                        <div key={index}>
                                            <h3 className='p-4 font-bold m-auto bg-orange-400 rounded-xl'>{day}</h3>
                                            {fieldArrayOperations[day].fields.map((field, index) => (
                                                <div key={field.id} className='m-4'>
                                                    <input type='time' className='m-2' {...register(`weeklySchedule.${day}.${index}.start`)} placeholder="Start time" />
                                                    <input type='time' className='m-2' {...register(`weeklySchedule.${day}.${index}.end`)} placeholder="End time" />
                                                    <button className='rounded-md bg-red-600 p-1' type="button" onClick={() => fieldArrayOperations[day].remove(index)}>Remove</button>
                                                </div>
                                            ))}
                                            <button className='m-4 p-1 bg-green-600 rounded-md' type="button" onClick={() => fieldArrayOperations[day].append({ start: "", end: "" })}>Add Time Slot</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {step === 5 && (
                                <>
                                    <InputDropZone fileName='ProfilePicture' tipo='profilePic' recomendedSize='400x400' userId={registerId} ref={inputDropZoneRef} />
                                    <div className='flex w-full justify-center'>
                                        <input type="submit" className="p-2 bg-blue-500 text-white rounded cursor-pointer" />
                                    </div>
                                </>
                            )}
                        </div>
                        {/* ... */}
                        <div>
                            <div className="flex justify-center space-x-4 mb-4"> {/* Contenedor para el control del stepper */}
                                <button type="button" onClick={prevStep}>Back</button>
                                {[1, 2, 3, 4, 5].map((stepNumber) => (
                                    <div
                                        key={stepNumber}
                                        className='hidden sm:block'
                                    >
                                        <button type='button' className={`w-8 h-8 rounded-full flex items-center justify-center ${stepNumber === step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`} onClick={() => setStep(stepNumber)}>{stepNumber}</button>
                                    </div>
                                ))}
                                <button type="button" onClick={nextStep}>Next</button>
                            </div>
                            <div className="text-center mb-3">
                                <span className="text-[12px] text-gray-600">
                                    Si desea registrarse como cliente entre{' '}
                                    <Link
                                        to={'/signup'}
                                        className="text-[12px] text-blue-500 hover:text-blue-700 font-bold"
                                    >
                                        aquí
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </form>
                    <div className="flex items-center justify-center h-full w-0 xl:w-1/2">
                        {/* Aquí puedes poner tu imagen */}
                        <img src={logo} className='w-[330px] mx-auto' alt="Descripción de la imagen" />
                    </div>
                </div>
            </div>
        </div>
    );
}