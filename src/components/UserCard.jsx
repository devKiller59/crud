import { AiOutlineMail } from "react-icons/ai";
import { FaBirthdayCake, FaPencilAlt, FaRegTrashAlt, FaUserAlt } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";
import { RxUpdate } from 'react-icons/rx';


const UserCard = ({ userObj, onDelete, onEdit }) => {

  return (
    <div className="usr-card">
      <div>
        <h2><FaUserAlt /> {userObj.first_name} {userObj.last_name}</h2>
        <p><AiOutlineMail /> {userObj.email}</p>
        <p><FaBirthdayCake /> {userObj.birthday ? userObj.birthday.split('T')[0] : 'No asignada'}</p>
        <p><BsFillClockFill /> {formatearFecha(userObj._id)}</p>

        {/* REGISTRO DE ACTUALIZACIÓN: Solo se dibuja si el usuario ha sido editado alguna vez */}
        {userObj.updatedAt && (
          <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '4px' }}>
            <RxUpdate /> {formatearFechaActualizacion(userObj.updatedAt)}
          </p>
        )}
      </div>
      <div className="usr-btn">
        <div className="tooltip-container">
          <button onClick={() => onEdit(userObj)}><FaPencilAlt /></button>
          <span className="tooltip-text">Editar</span>
        </div>
        <div className="tooltip-container">
          <button onClick={() => onDelete(userObj._id)} ><FaRegTrashAlt /></button>
          <span className="tooltip-text">Eliminar</span>
        </div>
      </div>
    </div>
  )
};

const formatearFecha = (mongoId) => {
  if (!mongoId) return 'Fecha no disponible';

  try {
    // Extraer los primeros 8 caracteres del ObjectId para obtener el timestamp
    const timestampHex = mongoId.substring(0, 8);

    // Convertir el timestamp de hexadecimal a decimal y luego a milisegundos
    const timestampMs = parseInt(timestampHex, 16) * 1000;

    // Crear un objeto Date a partir del timestamp y formatearlo
    const fecha = new Date(timestampMs);

    // Formatear la fecha en el formato deseado (dd/mm/yyyy hh:mm)
    return fecha.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  catch (error) {
    return 'Fecha no disponible';
  }
};

const formatearFechaActualizacion = (isoString) => {
  if (!isoString) return 'Fecha no disponible';

    // Convertir la fecha en formato ISO a un objeto Date
  const fecha = new Date(isoString);

    // Formatear la fecha en el formato deseado (dd/mm/yyyy hh:mm)
  return fecha.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default UserCard;